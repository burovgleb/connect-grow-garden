import { motion } from "framer-motion";
import recoveryGardenImage from "@/assets/recovery-garden-section.jpg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={recoveryGardenImage}
                  alt="Сад RECOVERY* с водой, деревянными настилами и домом на закате"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  width={1280}
                  height={960}
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/18 blur-xl -z-10" />
            <Dialog>
              <div className="brand-panel absolute bottom-6 left-6 max-w-[19rem] p-5">
                <p className="brand-kicker mb-2">
                  сад RECOVERY*
                </p>
                <p className="text-sm font-light leading-[1.75] text-foreground/82">
                  Один из первых экосадов в России: живая территория, где
                  работа с почвой, биоразнообразием и естественным циклом
                  становится видимой во времени.
                </p>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-4 h-auto px-5 py-3 text-[0.68rem] tracking-[0.28em]"
                  >
                    Узнать больше
                  </Button>
                </DialogTrigger>
              </div>
              <DialogContent className="brand-panel max-h-[90vh] max-w-3xl gap-0 overflow-hidden border-black/5 bg-card/95 p-0 shadow-[0_36px_96px_-44px_rgba(31,31,31,0.42)]">
                <div className="aspect-[16/9] overflow-hidden border-b border-black/5">
                  <img
                    src={recoveryGardenImage}
                    alt="Сад RECOVERY* с водой, деревянными настилами и домом на закате"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    width={1280}
                    height={960}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <DialogHeader className="text-left">
                    <p className="brand-kicker mb-3">
                      сад RECOVERY*
                    </p>
                    <DialogTitle className="brand-title text-2xl leading-[1.1] text-foreground md:text-[2rem]">
                      Живой сад, который можно увидеть глубже
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-6 space-y-5 text-base font-light leading-[1.85] text-foreground/84">
                    <p>
                      Сад RECOVERY* — один из первых экосадов в России.
                      Здесь последовательно работают с почвой,
                      биоразнообразием и органическим циклом, чтобы сделать
                      территорию более устойчивой, а уход за ней — более
                      естественным и менее затратным.
                    </p>
                    <p>
                      Это пространство интересно одновременно как живая
                      экосистема и как сад, созданный в соответствии с
                      образом жизни и интересами владельцев. RECOVERY*
                      отмечен многочисленными наградами в сфере
                      ландшафтного дизайна в России и за рубежом, а также
                      становился героем телевизионных и YouTube-проектов.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
