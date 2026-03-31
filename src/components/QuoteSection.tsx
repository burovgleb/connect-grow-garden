import { memo } from "react";

const QuoteSection = () => {
  return (
    <section className="py-20 md:py-28 bg-warm">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <blockquote className="font-display text-2xl md:text-4xl italic font-normal text-foreground leading-snug">
          «Сад, который со временем ухаживает за&nbsp;нами»
        </blockquote>
        <p className="mt-6 text-muted-foreground font-body text-sm tracking-[0.15em] uppercase">
          Принцип RECOVERY* x VSADU
        </p>
      </div>
    </section>
  );
};

export default memo(QuoteSection);
