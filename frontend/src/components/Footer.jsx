import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Phone, MapPin } from "lucide-react";
import { SITE } from "@/constants/site";

const navItems = [
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "gallery", key: "gallery" },
  { id: "reviews", key: "reviews" },
  { id: "location", key: "location" },
];

export const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer data-testid="site-footer" className="border-t border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="font-display text-3xl sm:text-4xl leading-tight">
              Moon<span className="text-primary">.</span> Beauty Space
            </p>
            <p className="mt-4 text-muted-foreground max-w-sm">{t.footer.tagline}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] tracking-luxury uppercase text-muted-foreground">
              {t.footer.quick}
            </p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    data-testid={`footer-link-${item.id}`}
                    onClick={() => scrollTo(item.id)}
                    className="text-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    {t.nav[item.key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] tracking-luxury uppercase text-muted-foreground">
              {t.footer.contact}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-3.5 w-3.5 mt-1 text-primary" strokeWidth={1.5} />
                <a
                  href={`tel:${SITE.phoneTel}`}
                  data-testid="footer-phone"
                  className="hover:text-primary transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-1 text-primary" strokeWidth={1.5} />
                <span className="text-foreground/80">{SITE.address}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] tracking-luxury uppercase text-muted-foreground">
              {t.footer.social}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-instagram"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE.booksyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-booksy"
                  className="hover:text-primary transition-colors"
                >
                  Booksy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} {SITE.brand}. {t.footer.rights}
          </p>
          <p className="text-[11px] tracking-luxury uppercase text-muted-foreground">
            Kraków · Polska
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
