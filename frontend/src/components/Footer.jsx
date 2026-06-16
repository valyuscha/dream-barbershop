import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Phone, MapPin, Facebook } from "lucide-react";
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
    <footer data-testid="site-footer" className="relative border-t border-border bg-background">
      {/* Warm hairline accent at the very top of the footer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="font-display text-4xl sm:text-5xl leading-tight tracking-tight">
              Dream<span className="text-primary">.</span> Barbershop
            </p>
            <p className="mt-5 text-muted-foreground max-w-sm leading-relaxed">{t.footer.tagline}</p>

            {/* Premium social buttons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram"
                aria-label="Instagram"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/80 ease-premium transition-all duration-300 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-soft"
              >
                <Instagram className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </a>
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-facebook"
                aria-label="Facebook"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/80 ease-premium transition-all duration-300 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-soft"
              >
                <Facebook className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </a>
              <a
                href={SITE.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-booksy"
                className="inline-flex h-11 items-center rounded-full border border-border px-5 text-xs tracking-luxury uppercase text-foreground/80 ease-premium transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground hover:-translate-y-0.5"
              >
                Booksy
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] tracking-luxury uppercase text-muted-foreground">
              {t.footer.quick}
            </p>
            <ul className="mt-6 space-y-3.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    data-testid={`footer-link-${item.id}`}
                    onClick={() => scrollTo(item.id)}
                    className="group inline-flex items-center gap-2 text-foreground/75 hover:text-primary ease-premium transition-all duration-300 text-sm"
                  >
                    <span className="h-px w-0 bg-primary ease-premium transition-all duration-300 group-hover:w-5" />
                    {t.nav[item.key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-luxury uppercase text-muted-foreground">
              {t.footer.contact}
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" strokeWidth={1.5} />
                <a
                  href={`tel:${SITE.phoneTel}`}
                  data-testid="footer-phone"
                  className="text-foreground/85 hover:text-primary transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" strokeWidth={1.5} />
                <span className="text-foreground/85 leading-relaxed">{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
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
