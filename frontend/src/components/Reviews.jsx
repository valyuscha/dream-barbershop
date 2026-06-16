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

        {/* Average score — prominent trust badge */}
        <Reveal delay={0.1}>
          <div
            className="mt-10 mx-auto w-fit flex items-center gap-5 rounded-2xl glass-subtle px-7 py-5 shadow-soft"
            data-testid="reviews-rating"
          >
            <span className="font-display text-5xl sm:text-6xl leading-none text-foreground">5.0</span>
            <div className="h-12 w-px bg-border" />
            <div className="text-left">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-[18px] w-[18px] fill-current" strokeWidth={0} />
                ))}
              </div>
              <span className="mt-1.5 block text-sm text-muted-foreground">{t.reviews.rating}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 relative overflow-hidden py-2">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-5 sm:gap-6 animate-marquee w-max">
          {loop.map((r, i) => (
            <div
              key={i}
              data-testid={`review-card-${i}`}
              className="group w-[330px] sm:w-[440px] shrink-0 rounded-3xl border border-border card-premium p-7 sm:p-9 opacity-80 hover:opacity-100 hover-lift border-warm-hover hover:shadow-soft-lg flex flex-col"
            >
              <Quote className="h-8 w-8 text-primary/70" strokeWidth={1.2} />
              <p className="mt-5 font-display text-2xl sm:text-[1.7rem] leading-[1.3] text-foreground/95 flex-1">
                „{r.text}&rdquo;
              </p>
              <div className="mt-7 flex items-center justify-between pt-5 border-t border-border">
                <span className="text-sm font-medium text-foreground/90">{r.name}</span>
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" strokeWidth={0} />
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
