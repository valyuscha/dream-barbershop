import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/Reveal";
import { Sparkles, HeartHandshake, Gem, Award } from "lucide-react";
import { ABOUT_IMAGE } from "@/constants/site";

const ICONS = [HeartHandshake, Sparkles, Gem, Award];

export const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" data-testid="about-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: copy */}
        <div className="lg:col-span-7 order-2 lg:order-1">
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

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.about.values.map((v, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <div
                    data-testid={`about-value-${i}`}
                    className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card hover:bg-secondary/50 transition-colors p-5"
                  >
                    <div className="h-10 w-10 shrink-0 rounded-full bg-secondary text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" strokeWidth={1.4} />
                    </div>
                    <div>
                      <p className="font-display text-xl leading-tight">{v.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right: image collage */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden">
              <img
                src={ABOUT_IMAGE}
                alt="Salon details"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute -bottom-px left-0 right-0 bg-gradient-to-t from-background/40 to-transparent h-1/3" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 rounded-2xl border border-border/70 bg-card p-6">
              <p className="text-[11px] tracking-luxury uppercase text-muted-foreground">Moon Beauty Space</p>
              <p className="font-display text-2xl mt-2 leading-snug">
                &ldquo;Twoja chwila, nasza dbałość o każdy detal.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
