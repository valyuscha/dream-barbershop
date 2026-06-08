import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Sparkles, Heart, UserCheck, Gem, Users, MapPin, ChevronsRight } from "lucide-react";

const ICONS = [Sparkles, Heart, UserCheck, Gem, Users, MapPin];

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

export const WhyUs = () => {
  const { t } = useLanguage();
  return (
    <section id="why" data-testid="why-section" className="py-16 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader eyebrow={t.why.eyebrow} title={t.why.title} testId="why-header" />
        
        {/* Mobile: horizontal snap carousel */}
        <div className="sm:hidden mt-10">
          <div className="flex gap-4 -mx-5 px-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1">
            {t.why.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={i}
                  data-testid={`why-item-${i}`}
                  className="snap-center shrink-0 max-w-[280px] group rounded-3xl border border-border/70 bg-card hover:bg-secondary/40 p-8 transition-colors flex flex-col items-start gap-5"
                >
                  <div className="h-14 w-14 rounded-2xl bg-secondary text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" strokeWidth={1.2} />
                  </div>
                  <div>
                    <p className="font-display text-2xl leading-tight">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <ScrollHint label={t.gallery.scrollHint || "Przesuń"} />
        </div>

        {/* Tablet/Desktop: grid */}
        <div className="hidden sm:grid mt-14 sm:mt-20 grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div
                  data-testid={`why-item-${i}`}
                  className="group h-full rounded-3xl border border-border/70 bg-card hover:bg-secondary/40 p-8 transition-colors flex flex-col items-start gap-5"
                >
                  <div className="h-14 w-14 rounded-2xl bg-secondary text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" strokeWidth={1.2} />
                  </div>
                  <div>
                    <p className="font-display text-2xl leading-tight">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
