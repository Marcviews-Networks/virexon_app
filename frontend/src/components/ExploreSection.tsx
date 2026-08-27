import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Tripods",
    subtitle: "Capture every moment with stability and precision.",
    image: "/images/tripod.jpeg",
  },
  {
    title: "Phone Stands",
    subtitle: "Simple, stylish and practical stands for everyday use.",
    image: "/images/phone-stand.jpeg",
  },
  {
    title: "Daily Essentials",
    subtitle: "Explore products designed for your everyday life.",
    image: "/images/daily-products.jpeg",
  },
];

export default function ExploreSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === categories.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };

  const activeCategory = categories[activeIndex];

  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (event: WheelEvent) => {
      if (isScrolling) return;

      isScrolling = true;

      if (event.deltaY > 0) {
        setActiveIndex((prev) =>
          prev === categories.length - 1 ? 0 : prev + 1
        );
      } else if (event.deltaY < 0) {
        setActiveIndex((prev) =>
          prev === 0 ? categories.length - 1 : prev - 1
        );
      }

      setTimeout(() => {
        isScrolling = false;
      }, 700);
    };

    const section = sectionRef.current;

    if (section) {
      section.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (section) {
        section.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Background Image */}
      <img
        src={activeCategory.image}
        alt={activeCategory.title}
        className="absolute inset-0 h-full w-full object-contain transition-all duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">
            Scroll To Explore
          </p>

          <h2 className="mb-4 text-4xl font-bold sm:text-5xl md:text-7xl">
            {activeCategory.title}
          </h2>

          <p className="mb-8 text-base text-white/80 sm:text-lg">
            {activeCategory.subtitle}
          </p>

          <button className="rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:scale-105">
            Explore Products
          </button>
        </div>
      </div>

      {/* Scroll Controls */}
      <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
        <button
          onClick={handlePrevious}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-black/40 text-xl transition hover:bg-white hover:text-black"
          aria-label="Previous category"
        >
          ↑
        </button>

        <button
          onClick={handleNext}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-black/40 text-xl transition hover:bg-white hover:text-black"
          aria-label="Next category"
        >
          ↓
        </button>
      </div>

      
    </section>
  );
}