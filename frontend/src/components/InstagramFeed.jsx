import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Instagram, ArrowUpRight, ChevronsRight } from "lucide-react";
import { INSTAGRAM_IMAGES, SITE } from "@/constants/site";

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

        {/* Mobile/Tablet: horizontal snap carousel */}
        <div className="md:hidden mt-12 sm:mt-16">
          <div className="flex gap-4 -mx-5 sm:-mx-8 px-5 sm:px-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1">
            {INSTAGRAM_IMAGES.map((src, i) => (
              <a
                key={i}
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`instagram-item-${i}`}
                className="snap-center shrink-0 w-[82%] sm:w-[70%] aspect-[3/4] group relative block overflow-hidden rounded-3xl bg-card"
              >
                <img
                  src={src}
                  alt={`Moon Beauty Space Instagram ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500">
                  <Instagram
                    className="h-7 w-7 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    strokeWidth={1.5}
                  />
                </div>
              </a>
            ))}
          </div>
          <ScrollHint label={t.instagram.scrollHint || t.gallery.scrollHint || "Przesuń"} />
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid mt-12 sm:mt-16 grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {INSTAGRAM_IMAGES.map((src, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`instagram-item-${i}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-card"
              >
                <img
                  src={src}
                  alt={`Moon Beauty Space Instagram ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500">
                  <Instagram
                    className="h-7 w-7 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    strokeWidth={1.5}
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="instagram-cta"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 hover:bg-foreground hover:text-background px-9 py-4 text-xs tracking-luxury uppercase transition-colors"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
              {t.instagram.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default InstagramFeed;
