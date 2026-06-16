import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/Reveal";
import { Sparkles, HeartHandshake, Gem, Award, ChevronsRight } from "lucide-react";

const ICONS = [HeartHandshake, Sparkles, Gem, Award];

const ScrollHint = ({ label }) => (
  <div className="flex items-center justify-center gap-2 mt-5 text-muted-foreground">
    <span className="text-xs uppercase tracking-luxury font-semibold">
      {label}
    </span>
    <motion.span
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronsRight className="w-4 h-4" strokeWidth={2} />
    </motion.span>
  </div>
);
const ABOUT_IMAGE = "/about-us.png";

export const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" data-testid="about-section" className="py-16 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <span className="text-xs tracking-luxury uppercase text-primary">{t.about.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-foreground/80 text-base sm:text-lg leading-relaxed max-w-xl">
              {t.about.p1}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-foreground/80 text-base sm:text-lg leading-relaxed max-w-xl">
              {t.about.p2}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-foreground/80 text-base sm:text-lg leading-relaxed max-w-xl">
              {t.about.p3}
            </p>
          </Reveal>

          {/* Desktop: values grid below text */}
          <div className="hidden sm:grid mt-12 grid-cols-1 sm:grid-cols-2 gap-5">
            {t.about.values.map((v, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <div
                    data-testid={`about-value-${i}`}
                    className="group glass-subtle hover-lift border-warm-hover rounded-3xl p-6 hover:shadow-soft h-full"
                  >
                    <div className="h-9 w-9 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center ring-1 ring-inset ring-primary/15 group-hover:scale-105 ease-premium transition-transform duration-300">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                    </div>
                    <p className="font-display text-2xl leading-tight mt-5 tracking-tight">{v.title}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right: image and quote block - clean vertical stack */}
        <div className="lg:col-span-5 w-full sm:max-w-md sm:mx-auto lg:max-w-none lg:mx-0">
          <Reveal delay={0.1}>
            <div className="group relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden glow-warm ring-1 ring-inset ring-foreground/10">
              <img
                src={ABOUT_IMAGE}
                alt="Dream Barbershop — barber at work"
                className="absolute inset-0 h-full w-full object-cover img-rich ease-premium transition-transform [transition-duration:1200ms] group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background/55 via-background/10 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <figure className="mt-7 pl-5 border-l-2 border-primary/40">
              <blockquote className="font-display text-2xl sm:text-[1.7rem] leading-snug text-foreground/95 italic">
                &ldquo;{t.about.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[11px] tracking-luxury uppercase text-muted-foreground">
                Dream Barbershop
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Mobile: values carousel - full width on mobile only */}
        <div className="sm:hidden lg:col-span-12 order-3 -mx-5">
          <div className="flex gap-4 px-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1">
            {t.about.values.map((v, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={i}
                  data-testid={`about-value-${i}`}
                  className="snap-center shrink-0 w-[260px] group flex flex-col items-start glass-subtle rounded-3xl p-6"
                >
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center ring-1 ring-inset ring-primary/15">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-2xl leading-tight mt-5">{v.title}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
          <ScrollHint label={t.about.scrollHint} />
        </div>
      </div>
    </section>
  );
};

export default About;
