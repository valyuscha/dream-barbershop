import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "gallery", key: "gallery" },
  { id: "reviews", key: "reviews" },
  { id: "booking", key: "booking" },
  { id: "location", key: "location" },
];

export const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <button
          onClick={() => handleNav("hero")}
          data-testid="brand-logo"
          className="flex items-center gap-2 group"
          aria-label="Dream Barbershop"
        >
          <span className="font-display text-xl sm:text-2xl tracking-tight text-foreground group-hover:text-primary transition-colors">
            Dream<span className="text-primary">.</span> Barbershop
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              data-testid={`nav-link-${item.id}`}
              onClick={() => handleNav(item.id)}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              {t.nav[item.key]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            data-testid="nav-cta-book"
            onClick={() => handleNav("booking")}
            className="hidden sm:inline-flex items-center rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-6 py-3 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5"
          >
            {t.nav.book}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-full bg-secondary/50 hover:bg-secondary border border-border/70 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                data-testid={`mobile-nav-link-${item.id}`}
                onClick={() => handleNav(item.id)}
                className="text-left text-base text-foreground/90 hover:text-primary py-2 border-b border-border/40"
              >
                {t.nav[item.key]}
              </button>
            ))}
            <button
              onClick={() => handleNav("booking")}
              data-testid="mobile-nav-cta-book"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-xs tracking-luxury uppercase"
            >
              {t.nav.book}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
