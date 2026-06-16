import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, LANGUAGES } from "@/i18n/translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "dream-barbershop-lang";

const readInitialLang = () => {
  if (typeof window === "undefined") return "pl";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch (e) {
    // localStorage unavailable
    return "pl";
  }
  return "pl";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(readInitialLang);

  const setLang = (code) => {
    if (!translations[code]) return;
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      // ignore storage errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang] || translations.pl,
      languages: LANGUAGES,
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
