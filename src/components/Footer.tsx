const Footer = () => {
  return (
    <footer className="border-t border-foreground/8 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <p className="font-display text-sm font-normal uppercase tracking-[0.24em] text-foreground">
            RECOVERY* x VSADU
          </p>
          <p className="mt-2 text-xs font-light uppercase tracking-[0.16em] text-foreground/48">
            Живые сады по принципам восстановительного землепользования
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[0.72rem] font-light uppercase tracking-[0.24em] text-foreground/52">
          <a href="#about" className="transition-colors hover:text-foreground/80">О дне</a>
          <a href="#schedule" className="transition-colors hover:text-foreground/80">Расписание</a>
          <a href="#faq" className="transition-colors hover:text-foreground/80">FAQ</a>
          <a href="#register" className="transition-colors hover:text-foreground/80">Участвовать</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
