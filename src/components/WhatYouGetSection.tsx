import { motion } from "framer-motion";
import { Leaf, Wind, Users, Eye } from "lucide-react";

const items = [
  {
    icon: Eye,
    title: "Точный рабочий фокус",
    text: "Камерный формат предполагает более индивидуальный образовательный опыт: вас ждёт глубокое погружение в нюансы с объяснениями на профессиональном языке.",
  },
  {
    icon: Leaf,
    title: "Практика живой среды",
    text: "Лучший способ усвоить новое — пропустить это через себя на всех уровнях: исследовать живой сад глазами, руками, всем телом и органами чувств. Так компост, огород, почва становятся понятными не в теории, а через наблюдение за тем, как сад откликается на действие.",
  },
  {
    icon: Wind,
    title: "Тело и нервная система",
    text: "Свежий воздух, ритм движений и работа с землёй возвращают ясность, здоровую приятную усталость и ощущение опоры. Меньше действий, больше наблюдения.",
  },
  {
    icon: Users,
    title: "Контакт с людьми и местом",
    text: "В мини-группе легче услышать друг друга и задать экспертам вопрос. Это возможность прожить сад не как фон или объект, а как живую систему, частью которой ты становишься на день.",
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
            Этот день отличается от волонтёрского дня для широкой аудитории:
            это не вводный формат, а более глубокая практика для садовников,
            которые хотят работать в согласии с природой, видеть и понимать
            природные процессы и сезонную логику сада.
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
