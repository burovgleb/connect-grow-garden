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
              Что это за день
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground leading-tight mb-8">
              Практика в живом саду,
              <br />
              <em className="italic">а не выезд на благоустройство</em>
            </h2>
            <div className="space-y-5 text-foreground/80 font-body text-base leading-relaxed">
              <p>
                Мы приглашаем провести день в саду RECOVERY* — авторской
                живой территории, где идеи RECOVERY* x VSADU проживаются
                на практике, а не остаются красивой декларацией.
              </p>
              <p>
                Здесь человек работает не против природы, а вместе с ней:
                наблюдает, как устроено место, поддерживает природные
                процессы и через конкретные действия учится видеть сад как
                живую систему.
              </p>
              <p>
                В программе — садовая йога, экскурсия, рабочие сессии,
                практика наблюдения, общий обед и возможность задать
                вопросы опытным садовникам и увидеть методы
                восстановительного землепользования в реальном времени.
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
            <div className="absolute bottom-6 left-6 max-w-xs rounded-2xl bg-background/90 p-5 backdrop-blur-sm shadow-lg border border-border/70">
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-2">
                сад RECOVERY*
              </p>
              <p className="font-body text-sm leading-relaxed text-foreground/80">
                Не шоурум и не просто участок, а живая доказательная
                территория проекта: место наблюдения, эксперимента и
                со-творчества с природой.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
