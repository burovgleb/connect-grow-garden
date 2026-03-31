const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="font-display text-lg text-background/90">
            RECOVERY* x VSADU
          </p>
          <p className="font-body text-xs text-background/50 mt-1">
            Живые сады по принципам восстановительного землепользования
          </p>
        </div>
        <div className="flex gap-8 text-background/50 font-body text-sm">
          <a href="#about" className="hover:text-background/80 transition-colors">О дне</a>
          <a href="#schedule" className="hover:text-background/80 transition-colors">Расписание</a>
          <a href="#faq" className="hover:text-background/80 transition-colors">FAQ</a>
          <a href="#register" className="hover:text-background/80 transition-colors">Участвовать</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
