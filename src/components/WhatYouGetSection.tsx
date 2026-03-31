import { motion } from "framer-motion";
import { Leaf, Wind, Users, Eye } from "lucide-react";

const items = [
  {
    icon: Eye,
    title: "Видимый результат",
    text: "В саду действие не размывается: вы видите, как меняется среда, и ощущаете реальный вес своих усилий уже в конце дня.",
  },
  {
    icon: Leaf,
    title: "Практика живой среды",
    text: "Мульча, компост, почва, сезонные работы и естественная динамика сада становятся понятными не в теории, а через руки и наблюдение.",
  },
  {
    icon: Wind,
    title: "Тело и нервная система",
    text: "Свежий воздух, ритм движений и работа с землёй возвращают ясность, здоровое утомление и ощущение опоры.",
  },
  {
    icon: Users,
    title: "Контакт с людьми и местом",
    text: "Совместная работа, разговоры с садовниками и внимание к месту дают редкое чувство: ты часть живой системы, а не отдельный наблюдатель.",
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
            Что даёт день в саду
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Это не только волонтёрский опыт. Это возможность почувствовать
            тело, увидеть результат своих действий здесь и сейчас и
            вернуться домой с другим качеством внимания.
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
