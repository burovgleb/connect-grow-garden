import { motion } from "framer-motion";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const RegisterSection = () => {
  return (
    <section id="register" className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-sage" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-warm" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-medium text-primary-foreground leading-tight mb-6">
            Оставить заявку
          </h2>
          <p className="text-primary-foreground/80 font-body text-lg leading-relaxed mb-4 max-w-xl mx-auto">
            Волонтёрский день пройдёт 11 апреля 2026. После заявки мы
            пришлём адрес сада, список вещей и ссылку на общий чат
            участников.
          </p>
          <p className="text-primary-foreground/60 font-body text-sm mb-10">
            Участие бесплатное · До 15 человек · Инструменты, обед и чай включены
          </p>

          <LeadCaptureForm />
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterSection;
