import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Star, Quote } from "lucide-react";

export const Reviews = () => {
  const { t } = useLanguage();
  const items = t.reviews.items;
  // Duplicate for seamless marquee
  const loop = [...items, ...items];

  return (
    <section id="reviews" data-testid="reviews-section" className="py-16 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader eyebrow={t.reviews.eyebrow} title={t.reviews.title} testId="reviews-header" />

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center justify-center gap-3" data-testid="reviews-rating">
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" strokeWidth={0} />
              ))}
            </div>
            <span className="font-display text-2xl text-foreground">5.0</span>
            <span className="text-sm text-muted-foreground">{t.reviews.rating}</span>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-5 sm:gap-6 animate-marquee w-max">
          {loop.map((r, i) => (
            <div
              key={i}
              data-testid={`review-card-${i}`}
              className="w-[300px] sm:w-[380px] shrink-0 rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
            >
              <Quote className="h-6 w-6 text-primary" strokeWidth={1.4} />
              <p className="mt-4 font-display text-xl sm:text-2xl leading-snug text-foreground">
                „{r.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-foreground/80">{r.name}</span>
                <div className="flex items-center gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
