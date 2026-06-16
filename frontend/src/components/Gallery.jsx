import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, ChevronsRight } from "lucide-react";
import { GALLERY, GALLERY_TABS } from "@/constants/site";
import { SITE } from "@/constants/site";

// Image with premium loading state (warm shimmer until loaded)
const GalleryImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <div className="absolute inset-0 img-shimmer" aria-hidden />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover img-rich ease-premium transition-all [transition-duration:1200ms] group-hover:scale-[1.07] ${
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
        }`}
      />
    </>
  );
};

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
  const [active, setActive] = useState("fade");
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
              className={`rounded-full px-5 py-2.5 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 border ${
                active === tab.id
                  ? "bg-foreground text-background border-foreground shadow-soft"
                  : "border-border text-foreground/65 hover:text-foreground hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              {t.gallery.tabs?.[tab.id] || tab.label}
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
                  className="group snap-center shrink-0 w-[82%] sm:w-[70%] aspect-[3/4] relative overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-inset ring-foreground/[0.06]"
                >
                  <GalleryImage src={src} alt={`Dream Barbershop — ${active} ${i + 1}`} />
                </figure>
              ))}
            </div>
            <ScrollHint label={t.gallery.scrollHint || "Przesuń"} />
          </motion.div>
        </AnimatePresence>

        {/* Desktop: masonry-rhythm grid (staggered columns, aligned rows) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
            }}
            className="hidden md:grid mt-10 sm:mt-14 grid-cols-3 gap-5 sm:gap-6 items-start"
          >
            {images.map((src, i) => (
              <motion.figure
                key={src}
                data-testid={`gallery-item-${active}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={`group relative overflow-hidden rounded-[1.75rem] bg-card aspect-[3/4] shadow-soft ring-1 ring-inset ring-foreground/[0.06] ${
                  i % 3 === 1 ? "lg:mt-10" : ""
                }`}
              >
                <GalleryImage src={src} alt={`Dream Barbershop — ${active} ${i + 1}`} />
                {/* Cinematic bottom falloff, deepens on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-100 ease-premium transition-opacity duration-500" />
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Portfolio Button */}
        <Reveal delay={0.2}>
          <div className="mt-12 sm:mt-16 flex justify-center">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="gallery-view-all"
              className="group inline-flex h-[54px] items-center gap-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-9 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5"
            >
              {t.gallery.viewAll || "Zobacz więcej"}
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
