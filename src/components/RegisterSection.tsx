import { motion } from "framer-motion";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const RegisterSection = () => {
  return (
    <section id="register" className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="brand-panel relative overflow-hidden px-6 py-10 text-center md:px-10 md:py-12"
        >
          <div className="absolute -top-10 right-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-10 left-6 h-32 w-32 rounded-full bg-accent/12 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="brand-title mb-6 text-3xl md:text-5xl text-foreground leading-[1.15]">
            Оставить заявку
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-base font-light leading-[1.85] text-foreground/80 md:text-lg">
            Волонтёрский день пройдёт 11 апреля 2026. После заявки мы
            пришлём адрес сада, список вещей и ссылку на общий чат
            участников.
          </p>
          <p className="brand-kicker mb-10">
            Участие бесплатное · До 15 человек · Инструменты, обед и чай включены
          </p>

          <LeadCaptureForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterSection;
