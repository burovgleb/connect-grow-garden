import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Нужен ли опыт работы в саду?",
    a: "Нет. Мы всё покажем и расскажем. Задачи будут разные — от простых до более вовлечённых. Каждый найдёт своё.",
  },
  {
    q: "Что взять с собой?",
    a: "Удобную одежду, которую не жалко испачкать. Закрытую обувь. Головной убор и воду. Перчатки и инструменты мы предоставим.",
  },
  {
    q: "Это бесплатно?",
    a: "Да, участие бесплатное. Мы обеспечиваем инструменты, перчатки и обед. Вы приносите свою готовность быть здесь.",
  },
  {
    q: "Сколько человек будет?",
    a: "Группа до 15 человек. Нам важно, чтобы каждый мог получить внимание и спокойно провести день.",
  },
  {
    q: "Как добраться?",
    a: "После регистрации мы пришлём подробную инструкцию с адресом и схемой проезда.",
  },
  {
    q: "Можно ли приехать с ребёнком?",
    a: "Если ребёнку от 10 лет и он готов участвовать — да. Для совсем маленьких детей, к сожалению, пока нет условий.",
  },
  {
    q: "Что будем делать?",
    a: "Работа с почвой, посадки, мульчирование, обустройство — конкретные задачи зависят от сезона и текущих потребностей сада. Мы расскажем в начале дня.",
  },
  {
    q: "Будет ли это повторяться?",
    a: "Да, мы планируем проводить волонтёрские дни регулярно. Это начало сообщества, а не разовая акция.",
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
