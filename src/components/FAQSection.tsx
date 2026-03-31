import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

const faqs: Array<{ q: string; a: ReactNode }> = [
  {
    q: "Какие задачи будут у волонтёров?",
    a: (
      <div className="space-y-3">
        <p>
          Мы распределяем участников по зонам и несколько раз меняемся,
          чтобы все получили разнообразный опыт и не утомились одной и
          той же работой.
        </p>
        <p>
          В течение дня это могут быть срезка сухих злаков,
          мульчирование, работа с компостом, уборка листвы, чистка
          хвойных и другие сезонные задачи сада.
        </p>
      </div>
    ),
  },
  {
    q: "Что взять с собой?",
    a: (
      <div className="space-y-3">
        <p>
          Индивидуальную бутылку для воды, удобную одежду по погоде,
          лучше слоями, и обувь, в которой комфортно и заниматься йогой,
          и работать в саду.
        </p>
        <p>
          Если хотите, берите с собой любимые снеки к чаю. Инструменты,
          перчатки, обед и чай мы обеспечим.
        </p>
      </div>
    ),
  },
  {
    q: "Нужен ли опыт работы в саду?",
    a: "Нет. Задачи простые и посильные, а всё необходимое мы объясним и покажем на месте. Можно прийти совсем без опыта.",
  },
  {
    q: "Это бесплатно?",
    a: "Да, участие бесплатное. Мы берём на себя инструменты, перчатки, обед и чай. От вас — готовность включиться в день и быть в контакте с местом.",
  },
  {
    q: "Как добраться?",
    a: "После регистрации мы создадим общий чат участников. В нём можно будет договориться о совместной поездке, объединиться по машинам и получить детали маршрута.",
  },
  {
    q: "Сколько человек будет?",
    a: "Мы собираем небольшую группу — до 15 человек. Так у каждого будет достаточно внимания, а ритм дня останется спокойным и человеческим.",
  },
  {
    q: "Можно ли приехать не на весь день?",
    a: "Лучше планировать участие на весь день. Формат выстроен как цельный опыт: настройка, практика, работа, наблюдение и общий круг в конце.",
  },
  {
    q: "Будет ли это повторяться?",
    a: "Да. Мы хотим, чтобы волонтёрские дни стали регулярной практикой и точкой входа в сообщество людей, которым важны живая среда и бережное взаимодействие с ней.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-4">
            Частые вопросы
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Собрали главное про задачи, формат дня и участие.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background border border-border rounded-lg px-6 data-[state=open]:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
