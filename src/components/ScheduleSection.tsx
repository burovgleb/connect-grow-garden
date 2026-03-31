import { motion } from "framer-motion";

const schedule = [
  { time: "09:30", title: "Сбор и знакомство", desc: "Чай, кофе. Рассказ о саде RECOVERY* — как живая экосистема, а не декоративный объект." },
  { time: "10:00", title: "Экскурсия по саду", desc: "Прогулка с Пашей и Дашей. Что здесь растёт, почему именно так, как работает система." },
  { time: "10:45", title: "Распределение задач", desc: "Каждый выбирает то, что ему ближе: работа с почвой, посадки, мульчирование, обустройство." },
  { time: "11:00", title: "Работа в саду", desc: "Основной блок. Работаем спокойно, в своём ритме. Без гонки и оценок." },
  { time: "13:00", title: "Обед", desc: "Простая еда на свежем воздухе. Пауза, разговоры, тишина — по желанию." },
  { time: "14:00", title: "Вторая смена", desc: "Продолжение работы или наблюдение за садом. Можно попробовать что-то новое." },
  { time: "16:00", title: "Общий круг", desc: "Делимся впечатлениями. Что заметили, что почувствовали, что изменилось внутри." },
  { time: "17:00", title: "Завершение", desc: "Свободное время в саду. Фото, чай, обмен контактами." },
];

const ScheduleSection = () => {
  return (
    <section id="schedule" className="py-24 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-4 font-body">
            Расписание
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground">
            Как пройдёт день
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[52px] md:left-[68px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {schedule.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-6 md:gap-8 py-6 group"
              >
                <div className="flex-shrink-0 w-[44px] md:w-[56px] text-right">
                  <span className="font-display text-lg md:text-xl font-medium text-primary">
                    {item.time}
                  </span>
                </div>
                <div className="relative flex-shrink-0 mt-1.5">
                  <div className="w-3 h-3 rounded-full bg-sage border-2 border-background ring-2 ring-border group-hover:ring-primary transition-colors duration-300" />
                </div>
                <div className="pb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
