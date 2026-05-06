import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import groupImage from "@/assets/how-it-was/how-it-was-group.jpg";
import placeImage from "@/assets/how-it-was/how-it-was-place.jpg";
import workImage from "@/assets/how-it-was/how-it-was-work.jpg";

type GalleryItem = {
  alt: string;
  poster?: string;
  src: string;
  type: "image" | "video";
};

type PreviewCard = {
  alt: string;
  galleryIndex: number;
  src: string;
  type: "image" | "video";
};

const previewVideoSrc = "/media/how-it-was-preview.mp4";
const fullVideoSrc = "/media/how-it-was-full.mp4";
const fullVideoPoster = "/media/how-it-was/photos/199A1995_resized.jpg";

const galleryPhotos = [
  "/media/how-it-was/photos/199A0642_resized.jpg",
  "/media/how-it-was/photos/199A0644_resized.jpg",
  "/media/how-it-was/photos/199A0692_resized.jpg",
  "/media/how-it-was/photos/199A0753_resized.jpg",
  "/media/how-it-was/photos/199A0812_resized.jpg",
  "/media/how-it-was/photos/199A0905_resized.jpg",
  "/media/how-it-was/photos/199A0993_resized.jpg",
  "/media/how-it-was/photos/199A1062_resized.jpg",
  "/media/how-it-was/photos/199A1098_resized.jpg",
  "/media/how-it-was/photos/199A1124_resized.jpg",
  "/media/how-it-was/photos/199A1158_resized.jpg",
  "/media/how-it-was/photos/199A1189_resized.jpg",
  "/media/how-it-was/photos/199A1222_resized.jpg",
  "/media/how-it-was/photos/199A1241_resized.jpg",
  "/media/how-it-was/photos/199A1251_resized.jpg",
  "/media/how-it-was/photos/199A1262_resized.jpg",
  "/media/how-it-was/photos/199A1308_resized.jpg",
  "/media/how-it-was/photos/199A1331_resized.jpg",
  "/media/how-it-was/photos/199A1355_resized.jpg",
  "/media/how-it-was/photos/199A1365_resized.jpg",
  "/media/how-it-was/photos/199A1369_resized.jpg",
  "/media/how-it-was/photos/199A1431_resized.jpg",
  "/media/how-it-was/photos/199A1436_resized.jpg",
  "/media/how-it-was/photos/199A1451_resized.jpg",
  "/media/how-it-was/photos/199A1467_resized.jpg",
  "/media/how-it-was/photos/199A1474_resized.jpg",
  "/media/how-it-was/photos/199A1486_resized.jpg",
  "/media/how-it-was/photos/199A1491_resized.jpg",
  "/media/how-it-was/photos/199A1499_resized.jpg",
  "/media/how-it-was/photos/199A1504_resized.jpg",
  "/media/how-it-was/photos/199A1523_resized.jpg",
  "/media/how-it-was/photos/199A1534_resized.jpg",
  "/media/how-it-was/photos/199A1541_resized.jpg",
  "/media/how-it-was/photos/199A1548_resized.jpg",
  "/media/how-it-was/photos/199A1561_resized.jpg",
  "/media/how-it-was/photos/199A1564_resized.jpg",
  "/media/how-it-was/photos/199A1566_resized.jpg",
  "/media/how-it-was/photos/199A1578_resized.jpg",
  "/media/how-it-was/photos/199A1620_resized.jpg",
  "/media/how-it-was/photos/199A1714_resized.jpg",
  "/media/how-it-was/photos/199A1766_resized.jpg",
  "/media/how-it-was/photos/199A1810_resized.jpg",
  "/media/how-it-was/photos/199A1827_resized.jpg",
  "/media/how-it-was/photos/199A1839_resized.jpg",
  "/media/how-it-was/photos/199A1995_resized.jpg",
  "/media/how-it-was/photos/199A2072_resized.jpg",
  "/media/how-it-was/photos/199A2082_resized.jpg",
  "/media/how-it-was/photos/199A2149_resized.jpg",
] as const;

const previewSourcePhotoPaths = new Set<string>([
  "/media/how-it-was/photos/199A1431_resized.jpg",
  "/media/how-it-was/photos/199A1523_resized.jpg",
  "/media/how-it-was/photos/199A1995_resized.jpg",
]);

const galleryItems: GalleryItem[] = [
  {
    alt: "Полное видео с дня живой практики в саду RECOVERY*",
    poster: fullVideoPoster,
    src: fullVideoSrc,
    type: "video",
  },
  {
    alt: "Участники слушают вводное слово в саду RECOVERY*",
    src: groupImage,
    type: "image",
  },
  {
    alt: "Участники работают с почвой и сезонными растениями в саду RECOVERY*",
    src: workImage,
    type: "image",
  },
  {
    alt: "Сад RECOVERY* и дом ранней весной",
    src: placeImage,
    type: "image",
  },
  ...galleryPhotos.filter((src) => !previewSourcePhotoPaths.has(src)).map((src, index) => ({
    alt: `Фотография с дня живой практики в саду RECOVERY* ${index + 1}`,
    src,
    type: "image" as const,
  })),
];

const previewCards: PreviewCard[] = [
  {
    alt: "Короткое видео с дня живой практики в саду RECOVERY*",
    galleryIndex: 0,
    src: previewVideoSrc,
    type: "video",
  },
  {
    alt: "Участники слушают вводное слово в саду RECOVERY*",
    galleryIndex: 1,
    src: groupImage,
    type: "image",
  },
  {
    alt: "Участники работают с почвой и сезонными растениями в саду RECOVERY*",
    galleryIndex: 2,
    src: workImage,
    type: "image",
  },
  {
    alt: "Сад RECOVERY* и дом ранней весной",
    galleryIndex: 3,
    src: placeImage,
    type: "image",
  },
];

const HowItWasSection = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const selectedItem = galleryItems[selectedIndex];

  const openGallery = (index: number) => {
    setSelectedIndex(index);
    setIsGalleryOpen(true);
  };

  const showPrevious = () => {
    setSelectedIndex((current) => (current === 0 ? galleryItems.length - 1 : current - 1));
  };

  const showNext = () => {
    setSelectedIndex((current) => (current === galleryItems.length - 1 ? 0 : current + 1));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      return;
    }

    touchStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!start || event.pointerType === "mouse") {
      return;
    }

    const diffX = event.clientX - start.x;
    const diffY = event.clientY - start.y;
    const isHorizontalSwipe = Math.abs(diffX) > 48 && Math.abs(diffX) > Math.abs(diffY) * 1.25;

    if (!isHorizontalSwipe) {
      return;
    }

    if (diffX > 0) {
      showPrevious();
      return;
    }

    showNext();
  };

  useEffect(() => {
    if (!isGalleryOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((current) => (current === 0 ? galleryItems.length - 1 : current - 1));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((current) => (current === galleryItems.length - 1 ? 0 : current + 1));
      }

      if (event.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen]);

  const galleryOverlay =
    isGalleryOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            aria-label="Галерея дня живой практики в саду RECOVERY*"
            aria-modal="true"
            className="fixed inset-0 z-[1000] bg-[#090907] text-white"
            role="dialog"
          >
            <div className="grid h-[100dvh] min-h-screen grid-rows-[3.25rem_minmax(0,1fr)] gap-2 p-3 md:grid-rows-[4rem_minmax(0,1fr)] md:gap-4 md:p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.68rem] font-light uppercase tracking-[0.28em] text-white/58">
                  {selectedIndex + 1} / {galleryItems.length}
                </p>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/90 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/25"
                  onClick={() => setIsGalleryOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Закрыть галерею</span>
                </button>
              </div>

              <div className="grid min-h-0 grid-cols-1 gap-3 md:grid-cols-[minmax(4.5rem,8vw)_minmax(0,1fr)_minmax(4.5rem,8vw)]">
                <button
                  type="button"
                  className="hidden h-full items-center justify-center rounded-[1.5rem] border border-white/0 text-white/60 transition hover:border-white/10 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/25 md:flex"
                  onClick={showPrevious}
                >
                  <ChevronLeft className="h-9 w-9" />
                  <span className="sr-only">Предыдущий кадр</span>
                </button>

                <div
                  className="flex min-h-0 touch-pan-y items-center justify-center overflow-hidden"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                >
                  {selectedItem.type === "video" ? (
                    <video
                      key={selectedItem.src}
                      className="max-h-full max-w-full object-contain"
                      autoPlay
                      controls
                      playsInline
                      poster={selectedItem.poster}
                      preload="metadata"
                    >
                      <source src={selectedItem.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      key={selectedItem.src}
                      src={selectedItem.src}
                      alt={selectedItem.alt}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                <button
                  type="button"
                  className="hidden h-full items-center justify-center rounded-[1.5rem] border border-white/0 text-white/60 transition hover:border-white/10 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/25 md:flex"
                  onClick={showNext}
                >
                  <ChevronRight className="h-9 w-9" />
                  <span className="sr-only">Следующий кадр</span>
                </button>
              </div>

            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <section id="how-it-was" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="brand-kicker mb-4">
            Как это было 11 апреля
          </p>
          <h2 className="brand-title text-3xl text-foreground md:text-5xl">
            Живой отчёт из сада
          </h2>
          <p className="mt-5 text-base font-light leading-[1.85] text-foreground/76 md:text-lg">
            Чтобы почувствовать ритм и атмосферу дня, мы добавили
            короткий ролик и несколько кадров с прошлого события:
            совместная работа, внимание к сезону и человеческий масштаб
            группы.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {previewCards.map((item, index) => (
            <motion.button
              key={`${item.type}-${item.src}`}
              type="button"
              aria-label={item.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className="group block min-w-0 text-left"
              onClick={() => openGallery(item.galleryIndex)}
            >
              <div className="brand-panel w-full overflow-hidden p-2 transition duration-300 hover:shadow-[0_34px_84px_-50px_rgba(31,31,31,0.34)] md:p-3">
                <div className="relative overflow-hidden rounded-[1.2rem] border border-black/5 bg-black/10 md:rounded-[1.7rem]">
                  <div className="aspect-[4/3] overflow-hidden">
                    {item.type === "video" ? (
                      <video
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={placeImage}
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {item.type === "video" ? (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white shadow-[0_18px_48px_-26px_rgba(0,0,0,0.8)] backdrop-blur-sm transition duration-300 group-hover:scale-105 md:h-16 md:w-16">
                        <Play className="ml-0.5 h-5 w-5 fill-current md:h-6 md:w-6" />
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {galleryOverlay}
      </div>
    </section>
  );
};

export default HowItWasSection;
