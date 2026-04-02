import { memo } from "react";

const QuoteSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <blockquote className="brand-title text-2xl md:text-4xl text-foreground leading-[1.3]">
          «Сад, который со временем ухаживает за&nbsp;нами»
        </blockquote>
        <p className="mt-6 max-w-2xl mx-auto text-base font-light leading-[1.8] text-foreground/78">
          Волонтёрский день устроен вокруг этого принципа: заботясь о
          живой системе сада, мы одновременно возвращаем больше опоры,
          ясности и присутствия себе.
        </p>
        <p className="brand-kicker mt-6">
          Принцип RECOVERY* x VSADU
        </p>
      </div>
    </section>
  );
};

export default memo(QuoteSection);
