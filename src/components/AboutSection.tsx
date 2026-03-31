import { motion } from "framer-motion";
import handsSoil from "@/assets/hands-soil.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-4 font-body">
              Про что это
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground leading-tight mb-8">
              Это не про
              <br />
              <em className="italic">«помочь руками»</em>
            </h2>
            <div className="space-y-5 text-foreground/80 font-body text-base leading-relaxed">
              <p>
                Работа в саду — это про&nbsp;себя. Про возможность замедлиться, 
                почувствовать тело, увидеть результат своих действий здесь и&nbsp;сейчас.
              </p>
              <p>
                Выдохнуть и&nbsp;вернуться к&nbsp;себе настоящему. 
                После такого дня голова яснее, тело свободнее, 
                а&nbsp;настроение&nbsp;— совсем другое.
              </p>
              <p>
                Сад RECOVERY*&nbsp;— это живая экосистема, пространство наблюдения 
                и&nbsp;практики. Здесь природа и&nbsp;человек не&nbsp;конкурируют, 
                а&nbsp;поддерживают друг друга.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={handsSoil}
                alt="Руки в земле — контакт с живой средой"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-sage/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
