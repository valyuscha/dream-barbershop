import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/constants/site";

export const Services = () => {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-16 sm:py-32 bg-secondary/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
          testId="services-header"
        />

        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.categories.map((cat, ci) => (
            <Reveal key={ci} delay={ci * 0.08}>
              <a
                href={SITE.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`service-category-${ci}`}
                className="group block h-full rounded-3xl bg-card border border-border/70 p-6 sm:p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-xs tracking-luxury uppercase text-primary">
                    {`0${ci + 1}`}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.4}
                  />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl leading-tight mb-6">
                  {cat.label}
                </h3>
                <ul className="space-y-4">
                  {cat.items.map((item, ii) => (
                    <li
                      key={ii}
                      data-testid={`service-item-${ci}-${ii}`}
                      className="pb-4 border-b border-border/50 last:border-0 last:pb-0"
                    >
                      <p className="font-display text-lg sm:text-xl leading-tight mb-1">
                        {item.name}
                      </p>
                      {item.desc && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 sm:mt-16 flex justify-center">
            <a
              href={SITE.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="services-full-offer"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-primary px-9 py-4 text-xs tracking-luxury uppercase transition-colors"
            >
              {t.services.cta}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
