import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import LinkedInWatermark from "@/components/LinkedInWatermark";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
      <LinkedInWatermark />
    </div>
  );
}

export default App;
