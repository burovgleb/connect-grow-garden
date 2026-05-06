import { motion } from "framer-motion";
import { Leaf, Wind, Users, Eye } from "lucide-react";

const items = [
  {
    icon: Eye,
    title: "Точный рабочий фокус",
    text: "Камерный формат позволяет работать внимательнее: не скользить по поверхности задач, а глубже войти в сезонный слой сада и увидеть последствия своих решений.",
  },
  {
    icon: Leaf,
    title: "Практика живой среды",
    text: "Компост, огород, почва и сезонные переходы становятся понятными не в теории, а через руки, ритм работы и наблюдение за тем, как сад откликается на действие.",
  },
  {
    icon: Wind,
    title: "Тело и нервная система",
    text: "Свежий воздух, ритм движений и работа с землёй возвращают ясность, здоровое утомление и ощущение опоры.",
  },
  {
    icon: Users,
    title: "Контакт с людьми и местом",
    text: "В группе из восьми человек легче услышать друг друга, задать точный вопрос и прожить сад не как фон, а как живую систему, частью которой ты становишься на день.",
  },
];

const WhatYouGetSection = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="brand-title text-3xl md:text-5xl text-foreground mb-5">
            Что даёт день в саду
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light leading-[1.8] text-foreground/74">
            Это уже не вводный формат, а более точная практика для тех,
            кто хочет работать глубже, камернее и внимательнее к
            сезонной логике сада.
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
              className="brand-panel p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-background/85">
                <item.icon className="h-6 w-6 text-accent stroke-[1.5]" />
              </div>
              <h3 className="mb-3 font-display text-base font-medium uppercase tracking-[0.14em] text-foreground">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-[1.75] text-foreground/76">
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
