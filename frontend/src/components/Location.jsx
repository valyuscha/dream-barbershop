import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/Reveal";
import { MapPin, Clock, Phone, Navigation, Wifi, Car, CreditCard, Heart } from "lucide-react";
import { SITE } from "@/constants/site";

const AMENITY_ICONS = [Wifi, Car, CreditCard, Heart];

const InfoItem = ({ icon: Icon, label, children, delay, testId }) => (
  <Reveal delay={delay} className="flex-1 min-w-[150px]">
    <div
      data-testid={testId}
      className="group flex flex-col items-center text-center gap-4 px-2"
    >
      <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/15 flex items-center justify-center ease-premium transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
        <Icon className="h-7 w-7" strokeWidth={1.3} />
      </div>
      <div>
        <p className="text-[10px] tracking-luxury uppercase text-muted-foreground">
          {label}
        </p>
        <div className="font-display text-lg sm:text-xl mt-1.5 text-foreground/95 leading-snug">{children}</div>
      </div>
    </div>
  </Reveal>
);

export const Location = () => {
  const { t } = useLanguage();
  return (
    <section id="location" data-testid="location-section" className="py-16 sm:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-[2.5rem] border border-border card-premium overflow-hidden shadow-soft-lg">
          <div className="relative px-6 py-12 sm:px-14 sm:py-16 text-center">
            <Reveal>
              <span className="inline-block text-xs tracking-luxury uppercase text-primary">
                {t.location.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.05] max-w-2xl mx-auto">
                {t.location.title}
              </h2>
            </Reveal>

            {/* Info trio */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-8 max-w-3xl mx-auto">
              <InfoItem icon={MapPin} label={t.location.addressLabel} delay={0.15} testId="location-address">
                {SITE.address}
              </InfoItem>
              <InfoItem icon={Clock} label={t.location.hoursLabel} delay={0.2} testId="location-hours">
                {t.location.hours}
              </InfoItem>
              <InfoItem icon={Phone} label={t.location.phoneLabel} delay={0.25} testId="location-phone-wrap">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  data-testid="location-phone"
                  className="hover:text-primary transition-colors"
                >
                  {SITE.phone}
                </a>
              </InfoItem>
            </div>

            {/* Amenities */}
            <Reveal delay={0.3}>
              <div
                className="mt-12 flex flex-wrap justify-center gap-2.5"
                data-testid="location-amenities"
              >
                {t.location.amenities.map((a, i) => {
                  const Icon = AMENITY_ICONS[i % AMENITY_ICONS.length];
                  return (
                    <span
                      key={i}
                      data-testid={`location-amenity-${i}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-4 py-2.5 text-sm text-foreground/85 ease-premium transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground hover:-translate-y-0.5"
                    >
                      <Icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      {a}
                    </span>
                  );
                })}
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.35}>
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="location-navigate-btn"
                  className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-8 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Navigation className="h-4 w-4" strokeWidth={1.5} />
                  {t.location.navigate}
                </a>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  data-testid="location-call-btn"
                  className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 px-8 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 whitespace-nowrap"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  {t.location.call}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
