import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Sparkles, Heart, UserCheck, Gem, Users, MapPin, ChevronsRight } from "lucide-react";

const ICONS = [Sparkles, Heart, UserCheck, Gem, Users, MapPin];

// Asymmetric 12-col widths → staggered editorial composition
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

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
                  className="snap-center shrink-0 w-[270px] group card-premium rounded-3xl border border-border p-8 flex flex-col items-start gap-5"
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/15 flex items-center justify-center">
                    <Icon className="h-6 w-6" strokeWidth={1.3} />
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

        {/* Tablet/Desktop: staggered asymmetric composition */}
        <div className="hidden sm:grid mt-10 sm:mt-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            // Alternating widths + vertical offset = editorial rhythm
            const span = SPANS[i % SPANS.length];
            const offset = i % 2 === 1 ? "lg:translate-y-7" : "";
            return (
              <Reveal key={i} delay={(i % 3) * 0.08} className={`${span} ${offset}`}>
                <div
                  data-testid={`why-item-${i}`}
                  className="group card-premium hover-lift border-warm-hover rounded-3xl border border-border p-7 sm:p-8 hover:shadow-soft-lg flex items-start gap-5 h-full"
                >
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/15 flex items-center justify-center ease-premium transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary/15">
                    <Icon className="h-5 w-5" strokeWidth={1.3} />
                  </div>
                  <div>
                    <p className="font-display text-2xl leading-tight tracking-tight">{item.title}</p>
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
