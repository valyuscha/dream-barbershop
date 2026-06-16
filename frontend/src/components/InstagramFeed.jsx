import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Instagram, ArrowUpRight, Facebook } from "lucide-react";
import { SITE } from "@/constants/site";

export const InstagramFeed = () => {
  const { t } = useLanguage();
  return (
    <section
      id="instagram"
      data-testid="instagram-section"
      className="py-16 sm:py-32 bg-secondary/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.instagram.eyebrow}
          title={t.instagram.title}
          subtitle={t.instagram.subtitle}
          testId="instagram-header"
        />

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="instagram-cta"
              className="group inline-flex h-[54px] items-center gap-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-9 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
              {t.instagram.cta}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="facebook-cta"
              className="group inline-flex h-[54px] items-center gap-2 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 px-9 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 hover:-translate-y-0.5"
            >
              <Facebook className="h-4 w-4" strokeWidth={1.5} />
              {t.instagram.ctaFacebook}
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

export default InstagramFeed;
