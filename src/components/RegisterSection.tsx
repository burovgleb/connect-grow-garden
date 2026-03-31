import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
            Присоединяйтесь
          </h2>
          <p className="text-primary-foreground/80 font-body text-lg leading-relaxed mb-4 max-w-lg mx-auto">
            Места ограничены — до 15 человек. 
            Оставьте заявку, и мы свяжемся с вами с деталями.
          </p>
          <p className="text-primary-foreground/60 font-body text-sm mb-10">
            Участие бесплатное · Инструменты и обед включены
          </p>

          <Button
            variant="outline"
            size="lg"
            className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-display tracking-wide text-base px-10 py-6 h-auto"
            asChild
          >
            <a href="https://forms.gle" target="_blank" rel="noopener noreferrer">
              Заполнить заявку
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterSection;
