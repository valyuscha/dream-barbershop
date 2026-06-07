import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ArrowRight, Star } from "lucide-react";
import { HERO_IMAGE } from "@/constants/site";

export const Hero = () => {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative overflow-hidden bg-background"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image — master at work */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 order-first"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-3xl overflow-hidden">
              <img
                src={HERO_IMAGE}
                alt="Stylistka Moon Beauty Space podczas pracy"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
              <div
                data-testid="hero-rating-chip"
                className="absolute bottom-4 left-4 right-4 sm:right-auto inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-background/70 backdrop-blur-md px-4 py-3"
              >
                <div className="flex items-center gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <span className="font-display text-lg leading-none">{t.hero.rating}</span>
                <span className="text-xs text-muted-foreground">{t.hero.reviews}</span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-4 py-1.5 text-[11px] tracking-luxury uppercase text-foreground/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-foreground"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                data-testid="hero-cta-book"
                onClick={() => scrollTo("booking")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-primary px-8 py-4 text-xs tracking-luxury uppercase transition-colors"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </button>
              <button
                data-testid="hero-cta-services"
                onClick={() => scrollTo("services")}
                className="inline-flex items-center justify-center rounded-full border border-foreground/30 hover:border-foreground/70 px-8 py-4 text-xs tracking-luxury uppercase text-foreground transition-colors"
              >
                {t.hero.ctaSecondary}
              </button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
            >
              {t.hero.bullets.map((b, i) => (
                <li
                  key={i}
                  data-testid={`hero-bullet-${i}`}
                  className="flex items-center gap-2 text-sm text-foreground/80"
                >
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" strokeWidth={2} />
                  <span>{b}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
