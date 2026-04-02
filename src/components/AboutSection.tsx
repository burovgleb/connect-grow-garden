import { motion } from "framer-motion";
import handsSoil from "@/assets/hands-soil.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="brand-kicker mb-5">
              Что это за день
            </p>
            <h2 className="brand-title text-3xl md:text-5xl text-foreground leading-[1.2] mb-8">
              Практика в живом саду
              <br />
              <span className="text-muted-foreground">а не выезд на благоустройство</span>
            </h2>
            <div className="space-y-6 text-base font-light leading-[1.85] text-foreground/84">
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
            <div className="overflow-hidden rounded-[2rem] border border-black/5 shadow-[0_30px_80px_-48px_rgba(31,31,31,0.28)]">
              <div className="aspect-[4/5] overflow-hidden">
              <img
                src={handsSoil}
                alt="Руки в земле — контакт с живой средой"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/18 blur-xl -z-10" />
            <div className="brand-panel absolute bottom-6 left-6 max-w-xs p-5">
              <p className="brand-kicker mb-2">
                сад RECOVERY*
              </p>
              <p className="text-sm font-light leading-[1.75] text-foreground/82">
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
