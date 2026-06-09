#!/bin/bash
set -e

# Start the FastAPI backend
echo "Starting server..."
exec uvicorn backend.server:app --host 0.0.0.0 --port "${PORT:-8000}"
