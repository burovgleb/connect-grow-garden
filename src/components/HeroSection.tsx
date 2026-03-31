import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-garden.jpg";

const highlights = [
  "Без опыта",
  "До 15 участников",
  "Йога и обед включены",
  "Практика в живом саду",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Утренний свет в экосаду RECOVERY*"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-sm font-body text-primary-foreground/90 backdrop-blur-sm"
        >
          11 апреля 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-primary-foreground leading-[0.95] mb-8"
        >
          Волонтёрский
          <br />
          <em className="italic font-normal">день в живом саду</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-primary-foreground/85 font-body text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-8"
        >
          День живой практики, наблюдения и заботы о земле: познакомимся
          с принципами восстановительного землепользования, поработаем в
          саду RECOVERY*, начнём утро с йоги и завершим день общим обедом
          и кругом вопросов.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground/85 backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#register">Оставить заявку</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary-foreground/50 bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary font-display tracking-wide shadow-lg"
            asChild
          >
            <a href="#schedule">Как пройдёт день</a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 text-primary-foreground/65 font-body text-sm leading-relaxed max-w-xl mx-auto"
        >
          Участие бесплатное. После заявки мы пришлём адрес сада, список
          вещей и детали общего чата.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-16 bg-primary-foreground/30 mx-auto mb-2" />
        <p className="text-primary-foreground/50 text-xs tracking-[0.2em] uppercase font-body">
          Дальше
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
