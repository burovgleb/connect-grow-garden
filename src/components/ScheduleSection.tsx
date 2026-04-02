import { motion } from "framer-motion";

const schedule = [
  {
    time: "10:00",
    title: "Вступительное слово",
    desc: "Приветствие, смысл дня, знакомство с философией сада и правилами работы.",
  },
  {
    time: "10:30",
    title: "Садовая йога",
    desc: "Мягкая практика на траве, чтобы настроить тело, дыхание и внимание перед работой.",
  },
  {
    time: "11:15",
    title: "Практика знакомства",
    desc: "Короткий круг: кто мы, зачем пришли и с каким состоянием входим в этот день.",
  },
  {
    time: "11:30",
    title: "Обзорная экскурсия",
    desc: "Проходим сад целиком и видим логику места, связи между зонами и естественную динамику.",
  },
  {
    time: "12:15",
    title: "Первая рабочая сессия",
    desc: "Распределяемся по зонам, входим в контакт с участком и делаем самое важное без спешки.",
  },
  {
    time: "12:45",
    title: "Чай и обмен опытом",
    desc: "Небольшая пауза, чтобы передохнуть, обсудить первые наблюдения и переключиться.",
  },
  {
    time: "13:15",
    title: "Вторая рабочая сессия",
    desc: "Меняем зоны и продолжаем глубже: участники уже входят в ритм и лучше чувствуют место.",
  },
  {
    time: "14:15",
    title: "Обед",
    desc: "Полноценная спокойная пауза без суеты. Обед и чай мы берём на себя.",
  },
  {
    time: "15:00",
    title: "Практика наблюдения",
    desc: "Работаем с вниманием: тишина, органы чувств, детали и изменения, которые обычно ускользают.",
  },
  {
    time: "15:30",
    title: "Третья рабочая сессия",
    desc: "Завершающий блок, когда тело уже разогрето, а внимание обострено наблюдением.",
  },
  {
    time: "16:30",
    title: "Итоговый обход и вопросы",
    desc: "Смотрим на сделанное, осознаём изменения в саду и завершаем день общим кругом.",
  },
];

const tasks = [
  "Срезка сухих злаков и сезонных растительных остатков",
  "Мульчирование почвы срезанным материалом",
  "Заготовка материала для компостирования",
  "Запуск и активация компостной системы",
  "Внесение готового компоста в цветники",
  "Уборка листвы, чистка хвойных и прочёсывание газона",
];

const ScheduleSection = () => {
  return (
    <section id="schedule" className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="brand-kicker mb-4">
            Расписание
          </p>
          <h2 className="brand-title text-3xl md:text-5xl text-foreground">
            Как пройдёт день
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-[1.8] text-foreground/74">
            Комфортный ритм с рабочими сессиями, естественными паузами,
            наблюдением и общением. Общая длительность активностей —
            6 часов 45 минут.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-foreground/10 md:left-[68px]" />

          <div className="space-y-0">
            {schedule.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex gap-6 py-6 md:gap-8"
              >
                <div className="flex-shrink-0 w-[44px] md:w-[56px] text-right">
                  <span className="font-body text-xs font-light uppercase tracking-[0.24em] text-primary md:text-sm">
                    {item.time}
                  </span>
                </div>
                <div className="relative flex-shrink-0 mt-1.5">
                  <div className="h-3 w-3 rounded-full border-2 border-background bg-primary ring-2 ring-border transition-colors duration-300 group-hover:ring-primary" />
                </div>
                <div className="pb-2">
                  <h3 className="mb-2 font-display text-sm font-medium uppercase tracking-[0.12em] text-foreground md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-[1.75] text-foreground/76">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="brand-panel p-8"
          >
            <p className="brand-kicker mb-4">
              С чем будем работать
            </p>
            <h3 className="brand-title mb-6 text-2xl md:text-3xl text-foreground">
              Конкретные задачи дня
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {tasks.map((task) => (
                <div
                  key={task}
                  className="rounded-[1.4rem] border border-foreground/8 bg-background/80 px-4 py-4 text-sm font-light leading-[1.7] text-foreground/82"
                >
                  {task}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="brand-panel p-8"
          >
            <p className="brand-kicker mb-4">
              Ритм дня
            </p>
            <div className="space-y-4 text-sm font-light leading-[1.75] text-foreground/78">
              <p>
                Работаем по зонам и меняемся в течение дня, чтобы получить
                разный опыт и не утомиться однообразием.
              </p>
              <p>
                Утром настраиваемся через движение и внимание, днём
                работаем в саду, а затем закрепляем опыт практикой
                наблюдения и итоговым обходом.
              </p>
              <p>
                Этот формат помогает не только сделать полезную работу, но
                и прожить сад как систему, которая меняется во времени.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
