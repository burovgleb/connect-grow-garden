import { motion } from "framer-motion";
import { Leaf, Wind, Users, Eye } from "lucide-react";

const items = [
  {
    icon: Wind,
    title: "Ясная голова",
    text: "Физическая работа на свежем воздухе перезагружает мышление лучше любой медитации.",
  },
  {
    icon: Leaf,
    title: "Контакт с живой средой",
    text: "Почва, растения, запахи, текстуры — прямой опыт взаимодействия с экосистемой.",
  },
  {
    icon: Eye,
    title: "Видимый результат",
    text: "Вы увидите, что сделали, уже в конце дня. Не абстрактный KPI, а реальное изменение среды.",
  },
  {
    icon: Users,
    title: "Со-бытие",
    text: "Люди, которым небезразлично. Общение без суеты, совместная практика, начало сообщества.",
  },
];

const WhatYouGetSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-4">
            Что вы получите
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Не просто день на участке — опыт, который меняет состояние
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background rounded-lg p-8 border border-border"
            >
              <item.icon className="w-8 h-8 text-primary mb-5 stroke-[1.5]" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
