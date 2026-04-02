import { motion } from "framer-motion";
import invitationImage from "@/assets/april-invitation-section.jpg";
import { Button } from "@/components/ui/button";

const InvitationSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="brand-kicker mb-4">
            Организаторы дня
          </p>
          <h2 className="brand-title text-3xl leading-[1.15] text-foreground md:text-5xl">
            Кто проведёт этот день
          </h2>
          <p className="mt-5 text-base font-light leading-[1.85] text-foreground/78 md:text-lg">
            В саду вас встретят Даша Бурова и Павел Дерикошма —
            сооснователи RECOVERY* x VSADU и люди, которые проживают
            практику сада RECOVERY* изнутри.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start"
        >
          <figure className="brand-panel overflow-hidden p-4 md:p-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-black/5">
              <div className="aspect-[5/6] overflow-hidden">
                <img
                  src={invitationImage}
                  alt="Даша Бурова и Павел Дерикошма в саду RECOVERY* ранней весной"
                  className="h-full w-full object-cover object-[center_18%]"
                  loading="lazy"
                  width={720}
                  height={1280}
                />
              </div>
            </div>
            <figcaption className="px-1 pt-4 text-sm font-light leading-[1.75] text-foreground/64">
              Даша Бурова и Павел Дерикошма в саду RECOVERY* ранней весной.
            </figcaption>
          </figure>

          <div className="grid gap-6 xl:grid-cols-2">
            <article className="brand-panel h-full p-6 md:p-7">
              <p className="brand-kicker mb-4">
                сад RECOVERY*
              </p>
              <h3 className="text-[1.45rem] font-normal uppercase tracking-[0.12em] leading-[1.15] text-foreground">
                Даша Бурова
              </h3>
              <p className="mt-4 text-base font-light leading-[1.85] text-foreground/82">
                Хозяйка сада RECOVERY* и автор книги-медитации
                RECOVERY*, которая родилась в саду в 2020 году.
                Сооснователь проекта RECOVERY* x VSADU, создающего
                устойчивые экосистемы.
              </p>
            </article>

            <article className="brand-panel h-full p-6 md:p-7">
              <p className="brand-kicker mb-4">
                RECOVERY* x VSADU
              </p>
              <h3 className="text-[1.45rem] font-normal uppercase tracking-[0.12em] leading-[1.15] text-foreground">
                Павел Дерикошма
              </h3>
              <p className="mt-4 text-base font-light leading-[1.85] text-foreground/82">
                Эксперт по созданию устойчивых экосистем, учитель йоги
                и экстатик DJ. Курирует программу восстановительного
                землепользования в саду RECOVERY*. Сооснователь проекта
                RECOVERY* x VSADU, создающего устойчивые экосистемы.
              </p>
            </article>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="brand-panel mt-6 flex flex-col gap-5 px-6 py-6 md:px-8 md:py-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="brand-kicker mb-3 text-foreground/46">
              Ждём вас 11 апреля
            </p>
            <p className="brand-title text-2xl leading-[1.2] text-foreground md:text-3xl">
              Приходите провести день в саду RECOVERY*
            </p>
            <p className="mt-3 text-base font-light leading-[1.8] text-foreground/82">
              Познакомимся с садом в начале сезона и проведём день рядом
              с людьми, которые проживают эту практику изнутри.
            </p>
          </div>
          <div className="shrink-0">
            <Button variant="hero" size="lg" asChild>
              <a href="#register">Оставить заявку</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationSection;
