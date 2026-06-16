import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ArrowRight } from "lucide-react";
import { SITE } from "@/constants/site";

// Hero background image - barber working, warm interior
const HERO_BG_IMAGE = "/hero-image.png";

export const Hero = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Subtle parallax — image drifts up slower than the page
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay + subtle parallax & slow ambient movement */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imgY, scale: imgScale }}
      >
        <img
          src={HERO_BG_IMAGE}
          alt="Dream Barbershop Interior"
          className={`absolute inset-0 h-full w-full object-cover img-rich ${reduce ? "" : "animate-slow-zoom"}`}
          loading="eager"
        />
      </motion.div>

      {/* Cinematic overlays: dark→transparent from left + top/bottom falloff */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/30" />

      {/* Floating warm ambient light */}
      {!reduce && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/4 h-[42rem] w-[42rem] rounded-full animate-ambient"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--primary) / 0.16) 0%, transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-10 right-[12%] h-3 w-3 rounded-full bg-primary/70 blur-[2px] animate-float-soft"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/3 right-[28%] h-2 w-2 rounded-full bg-primary/50 blur-[1px] animate-float-soft"
            style={{ animationDelay: "2.5s" }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-32 sm:py-40 w-full"
      >
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
              className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-8 text-xs tracking-luxury uppercase whitespace-nowrap ease-premium transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5"
            >
              {t.hero.ctaPrimary}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>
            <a
              href={SITE.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta-booksy"
              className="inline-flex h-[54px] items-center justify-center rounded-full border border-foreground/25 bg-foreground/5 backdrop-blur-md hover:bg-foreground/10 hover:border-foreground/50 px-8 text-xs tracking-luxury uppercase text-foreground ease-premium transition-all duration-300 whitespace-nowrap"
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
      </motion.div>
    </section>
  );
};

export default Hero;
