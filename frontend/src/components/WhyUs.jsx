import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Sparkles, Heart, UserCheck, Gem, Users, MapPin } from "lucide-react";

const ICONS = [Sparkles, Heart, UserCheck, Gem, Users, MapPin];

export const WhyUs = () => {
  const { t } = useLanguage();
  return (
    <section id="why" data-testid="why-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader eyebrow={t.why.eyebrow} title={t.why.title} testId="why-header" />
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
