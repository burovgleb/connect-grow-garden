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
    <section id="schedule" className="py-24 md:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
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
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mt-4 leading-relaxed">
            Комфортный ритм с рабочими сессиями, естественными паузами,
            наблюдением и общением. Общая длительность активностей —
            6 часов 45 минут.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
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

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-secondary p-8"
          >
            <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase font-body mb-4">
              С чем будем работать
            </p>
            <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-6">
              Конкретные задачи дня
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {tasks.map((task) => (
                <div
                  key={task}
                  className="rounded-xl border border-border/80 bg-background/70 px-4 py-4 text-sm leading-relaxed text-foreground/80"
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
            className="rounded-2xl border border-border bg-warm p-8"
          >
            <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase font-body mb-4">
              Ритм дня
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-foreground/80">
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
