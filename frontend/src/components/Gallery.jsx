import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import { GALLERY, GALLERY_TABS } from "@/constants/site";

export const Gallery = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(GALLERY_TABS[0].id);
  const images = GALLERY[active] || [];

  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="py-24 sm:py-32 bg-secondary/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
          testId="gallery-header"
        />

        {/* Tabs */}
        <div
          data-testid="gallery-tabs"
          className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {GALLERY_TABS.map((tab) => (
            <button
              key={tab.id}
              data-testid={`gallery-tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-5 py-2.5 text-xs tracking-luxury uppercase transition-colors border ${
                active === tab.id
                  ? "bg-foreground text-background border-foreground"
                  : "border-border/70 text-foreground/70 hover:text-foreground hover:border-foreground/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
          >
            {images.map((src, i) => (
              <figure
                key={src}
                data-testid={`gallery-item-${active}-${i}`}
                className={`group relative overflow-hidden rounded-3xl bg-card ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={src}
                  alt={`Moon Beauty Space — ${active} ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/15 transition-colors duration-500" />
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
