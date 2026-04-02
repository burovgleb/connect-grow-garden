import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-crocus-spring.jpg";

const highlights = [
  "Без опыта",
  "До 15 участников",
  "Йога и обед включены",
  "Практика в живом саду",
];

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-10">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Крокусы в саду RECOVERY* ранней весной"
          className="h-full w-full scale-[1.02] object-cover object-center"
          width={1620}
          height={1080}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,244,239,0.74),rgba(238,234,227,0.86))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="brand-panel hero-panel px-6 py-10 md:px-10 md:py-12 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex rounded-full border border-foreground/10 bg-background/72 px-5 py-2 text-[0.72rem] font-body font-light uppercase tracking-[0.34em] text-foreground/72"
          >
            11 апреля 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-title font-display text-[clamp(2.1rem,7vw,5.2rem)] font-light uppercase tracking-[0.12em] text-foreground leading-[1.08] md:tracking-[0.16em] mb-6"
          >
            Волонтёрский
            <br />
            день в живом саду
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-copy mx-auto mb-8 max-w-2xl text-base font-light leading-[1.85] text-foreground/78 md:text-lg"
          >
            День живой практики, наблюдения и заботы о земле:
            познакомимся с принципами восстановительного землепользования
            во время трудотерапии в саду RECOVERY*, дополним этот процесс
            йогой, вкусным обедом и общением.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="hero-highlights mb-10 flex flex-wrap justify-center gap-3"
          >
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-foreground/10 bg-background/68 px-4 py-2 text-[0.7rem] font-light uppercase tracking-[0.24em] text-foreground/74"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hero-actions flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#register">Оставить заявку</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-background/90 shadow-[0_18px_50px_-32px_rgba(31,31,31,0.25)]"
              asChild
            >
              <a href="#schedule">Как пройдёт день</a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="hero-note mx-auto mt-6 max-w-xl text-sm font-light leading-[1.85] text-foreground/62"
          >
            Участие бесплатное. После заявки мы пришлём адрес сада, список
            вещей и детали общего чата.
          </motion.p>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 1, delay: 1.2 },
              y: { duration: 1.8, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="hero-cue mt-2 inline-flex flex-col items-center text-center"
          >
            <div className="mx-auto mb-2 h-8 w-px bg-foreground/16" />
            <p className="text-foreground/44 text-xs tracking-[0.28em] uppercase font-body font-light">
              Дальше
            </p>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
