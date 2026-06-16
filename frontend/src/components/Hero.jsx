import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ArrowRight } from "lucide-react";
import { SITE } from "@/constants/site";

// Hero background image - barber working, warm interior
const HERO_BG_IMAGE = "/hero-image.png";

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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG_IMAGE}
          alt="Dream Barbershop Interior"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay - darker on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-32 sm:py-40 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-foreground/10 backdrop-blur-md px-4 py-1.5 text-[11px] tracking-luxury uppercase text-foreground/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t.hero.eyebrow}
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.08] text-foreground"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-foreground/85 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <button
              data-testid="hero-cta-book"
              onClick={() => scrollTo("booking")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-primary px-8 py-4 text-xs tracking-luxury uppercase transition-colors whitespace-nowrap"
            >
              {t.hero.ctaPrimary}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </button>
            <a
              href={SITE.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta-booksy"
              className="inline-flex items-center justify-center rounded-full border border-foreground/70 bg-foreground/20 backdrop-blur-sm hover:bg-foreground/30 hover:border-foreground px-8 py-4 text-xs tracking-luxury uppercase text-foreground transition-colors whitespace-nowrap"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Feature Bullets */}
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
    </section>
  );
};

export default Hero;
