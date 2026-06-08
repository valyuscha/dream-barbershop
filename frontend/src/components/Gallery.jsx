import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, ChevronsRight } from "lucide-react";
import { GALLERY, GALLERY_TABS } from "@/constants/site";
import { SITE } from "@/constants/site";

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

export const Gallery = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState("minimal");
  const images = GALLERY[active] || [];

  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="py-16 sm:py-32 bg-secondary/40"
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

        {/* Mobile/Tablet: horizontal snap carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-10"
          >
            <div className="flex gap-4 -mx-5 sm:-mx-8 px-5 sm:px-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1">
              {images.map((src, i) => (
                <figure
                  key={src}
                  data-testid={`gallery-item-${active}-${i}`}
                  className="snap-center shrink-0 w-[82%] sm:w-[70%] aspect-[3/4] relative overflow-hidden rounded-3xl bg-card"
                >
                  <img
                    src={src}
                    alt={`Moon Beauty Space — ${active} ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
              ))}
            </div>
            <ScrollHint label={t.gallery.scrollHint || "Przesuń"} />
          </motion.div>
        </AnimatePresence>

        {/* Desktop: grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:grid mt-10 sm:mt-14 grid-cols-3 gap-4 sm:gap-5"
          >
            {images.map((src, i) => (
              <figure
                key={src}
                data-testid={`gallery-item-${active}-${i}`}
                className="group relative overflow-hidden rounded-3xl bg-card aspect-[3/4]"
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

        {/* View All Portfolio Button */}
        <Reveal delay={0.2}>
          <div className="mt-12 sm:mt-16 flex justify-center">
            <a
              href={SITE.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="gallery-view-all"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-primary px-9 py-4 text-xs tracking-luxury uppercase transition-colors"
            >
              {t.gallery.viewAll || "Zobacz całe portfolio"}
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

export default Gallery;
