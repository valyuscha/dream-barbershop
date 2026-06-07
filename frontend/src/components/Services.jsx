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
      className="py-24 sm:py-32 bg-secondary/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
          testId="services-header"
        />

        <div className="mt-14 sm:mt-20 border-t border-border/70">
          {t.services.categories.map((cat, ci) => (
            <Reveal key={ci} delay={ci * 0.05}>
              <div
                data-testid={`service-category-${ci}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12 border-b border-border/70"
              >
                <div className="lg:col-span-4">
                  <span className="text-xs tracking-luxury uppercase text-primary">
                    {`0${ci + 1}`}
                  </span>
                  <h3 className="mt-2 font-display text-3xl sm:text-4xl leading-tight">
                    {cat.label}
                  </h3>
                </div>
                <ul className="lg:col-span-8">
                  {cat.items.map((item, ii) => (
                    <li
                      key={ii}
                      data-testid={`service-item-${ci}-${ii}`}
                      className="group flex items-center justify-between gap-4 py-4 border-b border-border/50 last:border-0"
                    >
                      <div>
                        <p className="font-display text-xl sm:text-2xl leading-tight">
                          {item.name}
                        </p>
                        {item.desc && (
                          <p className="text-sm text-muted-foreground mt-1 max-w-md">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.4}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
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
