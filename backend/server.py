from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', '')
db_name = os.environ.get('DB_NAME', '')
if not mongo_url or not db_name:
    logger.warning("MONGO_URL or DB_NAME not set — database features will be unavailable")
client = AsyncIOMotorClient(mongo_url) if mongo_url else None
db = client[db_name] if client else None

# Create the main app without a prefix
app = FastAPI(title="Moon Beauty Space API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class BookingCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    phone: str = Field(..., min_length=4, max_length=40)
    service: str = Field(..., min_length=1, max_length=120)
    preferred_date: Optional[str] = Field(default=None, max_length=60)
    message: Optional[str] = Field(default=None, max_length=2000)
    language: Optional[str] = Field(default="pl", max_length=5)


class Booking(BookingCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Moon Beauty Space API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    booking = Booking(**payload.model_dump())
    doc = booking.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.bookings.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to insert booking: %s", e)
        raise HTTPException(status_code=500, detail="Could not save booking")
    return booking


@api_router.get("/bookings", response_model=List[Booking])
async def list_bookings():
    items = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend static files
FRONTEND_BUILD = Path(__file__).parent.parent / "frontend" / "build"
logger.info("Looking for frontend build at: %s (exists: %s)", FRONTEND_BUILD, FRONTEND_BUILD.exists())

if FRONTEND_BUILD.exists():
    # Serve static assets (JS, CSS, images)
    static_dir = FRONTEND_BUILD / "static"
    if static_dir.exists():
        app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        """Serve the React SPA for any non-API route."""
        # Try to serve the exact file first
        file_path = FRONTEND_BUILD / full_path
        if full_path and file_path.exists() and file_path.is_file():
            return FileResponse(str(file_path))
        # Otherwise serve index.html for client-side routing
        return FileResponse(str(FRONTEND_BUILD / "index.html"))
else:
    @app.get("/")
    async def root_fallback():
        return {"error": "Frontend build not found", "path": str(FRONTEND_BUILD)}


@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
