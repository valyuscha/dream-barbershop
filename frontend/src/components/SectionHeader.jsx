import React from "react";
import Reveal from "@/components/Reveal";

export const SectionHeader = ({ eyebrow, title, subtitle, align = "center", testId }) => {
  const alignCls = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <div className={`flex flex-col gap-4 ${alignCls} max-w-3xl mx-auto`} data-testid={testId}>
      {eyebrow && (
        <Reveal>
          <span className="text-[11px] tracking-luxury uppercase text-primary/80 font-semibold">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeader;
