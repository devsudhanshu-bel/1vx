
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const slides = [
  { name: "ARCANE", image: "/images/arcane.png", color: "#a3e635" },
  { name: "JETT", image: "/images/jett.png", color: "#38bdf8" },
  { name: "NEON", image: "/images/neon.png", color: "#22d3ee" },
  { name: "OMEN", image: "/images/omen.png", color: "#818cf8" },
  {
    name: "RED DEAD REDEMPTION II",
    image: "/images/rdr2.png",
    color: "#ef4444",
  },
  { name: "REYNA", image: "/images/reyna.png", color: "#e879f9" },
  { name: "SAGE", image: "/images/sage.png", color: "#2dd4bf" },
  { name: "EA SPORTS", image: "/images/fifa.png", color: "#f8fafc" },
  { name: "CALL OF DUTY", image: "/images/cod.png", color: "#d4a84b" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    Icon: ({ size = 20 }: { size?: number }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    Icon: ({ size = 20 }: { size?: number }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/",
    Icon: X,
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const incomingRef = useRef<HTMLImageElement>(null);
  const outgoingRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const directionRef = useRef(1);

  const slide = slides[active];

  const goTo = useCallback(
    (nextIndex: number, direction: number) => {
      if (nextIndex === active) return;

      directionRef.current = direction;
      setPreviousIndex(active);
      setActive(nextIndex);
    },
    [active],
  );

  const next = useCallback(() => {
    goTo((active + 1) % slides.length, 1);
  }, [active, goTo]);

  const previous = useCallback(() => {
    goTo((active - 1 + slides.length) % slides.length, -1);
  }, [active, goTo]);

  // Entrance animation and white breathing glow
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const controls = [
        logoRef.current,
        labelRef.current,
        counterRef.current,
        arrowsRef.current,
        socialsRef.current,
        ctaRef.current,
      ].filter(Boolean);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(controls, { clearProps: "all" });
        return;
      }

      gsap.fromTo(
        controls,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.12,
        },
      );

      gsap.to(logoRef.current, {
        textShadow:
          "0 0 8px rgba(255,255,255,0.95), 0 0 22px rgba(255,255,255,0.65), 0 0 42px rgba(255,255,255,0.35)",
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  // Cinematic image transitions
  useEffect(() => {
    const incoming = incomingRef.current;
    const outgoing = outgoingRef.current;
    const accent = accentRef.current;

    if (!incoming || !outgoing) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (firstRender.current || reduceMotion) {
      firstRender.current = false;
      gsap.set(incoming, { xPercent: 0, scale: 1, autoAlpha: 1 });
      gsap.set(outgoing, { xPercent: 0, autoAlpha: 0 });
      return;
    }

    const direction = directionRef.current;

    const ctx = gsap.context(() => {
      gsap.killTweensOf([incoming, outgoing, accent]);

      gsap.set(incoming, {
        xPercent: direction * 100,
        scale: 1.045,
        autoAlpha: 1,
      });

      gsap.set(outgoing, {
        xPercent: 0,
        scale: 1,
        autoAlpha: 1,
      });

      const timeline = gsap.timeline();

      timeline
        .to(
          outgoing,
          {
            xPercent: direction * -100,
            scale: 0.985,
            duration: 1.05,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          incoming,
          {
            xPercent: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.inOut",
          },
          0,
        );

      if (accent) {
        timeline.fromTo(
          accent,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.65, ease: "power2.out" },
          0.25,
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [active]);

  // Automatic slideshow
  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      directionRef.current = 1;
      setPreviousIndex(active);
      setActive((current) => (current + 1) % slides.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, [active, paused]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, previous]);

  return (
    <section
      ref={heroRef}
      aria-label="1VX gaming showcase"
      className="relative isolate w-full overflow-hidden bg-[#03050a] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null,
          )
        ) {
          setPaused(false);
        }
      }}
    >
      {/* Tall cinematic hero */}
      <div className="relative h-[clamp(560px,78vw,1000px)] min-h-[560px] max-h-[1000px] w-full overflow-hidden bg-[#03050a] sm:h-[78vh] sm:min-h-[650px] lg:h-[min(88vh,1000px)]">
        {/* Outgoing image */}
        <img
          ref={outgoingRef}
          src={slides[previousIndex].image}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover object-center"
          style={{
            visibility: active === previousIndex ? "hidden" : "visible",
          }}
        />

        {/* Active image */}
        <img
          ref={incomingRef}
          src={slide.image}
          alt={slide.name}
          draggable={false}
          fetchPriority={active === 0 ? "high" : "auto"}
          className="absolute inset-0 z-[1] h-full w-full select-none object-cover object-center"
        />

        {/* Gradient: transparent at top, 70% black at bottom */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.42) 32%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Header */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
          <a
            ref={logoRef}
            href="#"
            aria-label="1VX Home"
            className="text-2xl font-black italic tracking-tighter text-white transition duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] sm:text-3xl"
          >
            1VX
          </a>

          <span
            ref={labelRef}
            className="text-right text-[8px] font-semibold tracking-[0.2em] text-white/75 sm:text-[10px] sm:tracking-[0.35em]"
          >
            ENTER THE ARENA
          </span>
        </header>

        {/* Vertical social icons */}
        <nav
          ref={socialsRef}
          aria-label="Social media"
          className="absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-5 sm:gap-4 lg:right-8"
        >
          <span className="mb-1 hidden text-[9px] font-semibold tracking-[0.3em] text-white/50 [writing-mode:vertical-rl] sm:block">
            FOLLOW US
          </span>

          <div className="mb-1 h-8 w-px bg-white/40 sm:h-10" />

          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit 1VX on ${name}`}
              title={name}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white shadow-[0_0_8px_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:scale-110 hover:border-white hover:bg-white/15 hover:shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_28px_rgba(255,255,255,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-11 sm:w-11"
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:rotate-[-8deg] sm:h-5 sm:w-5"
              />
            </a>
          ))}

          <div className="mt-1 h-8 w-px bg-white/40 sm:h-10" />
        </nav>

        {/* Explore Now glass button */}
        <div
          ref={ctaRef}
          className="absolute bottom-16 left-5 z-20 sm:bottom-20 sm:left-8 lg:bottom-24 lg:left-12"
        >
          <a
            href="#games"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-white/65 bg-white/[0.08] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md transition-all duration-500 hover:border-white hover:bg-white/[0.16] hover:shadow-[0_0_22px_rgba(255,255,255,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-9 sm:py-3.5 sm:text-xs"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
              Explore Now
            </span>

            <span className="relative z-10 ml-3 inline-block text-base transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>

            <span className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-white/[0.08] transition-all duration-500 group-hover:w-full" />
          </a>
        </div>

        {/* Slide counter */}
        <div
          ref={counterRef}
          className="absolute bottom-5 left-5 z-20 flex items-center gap-3 sm:bottom-7 sm:left-8 lg:bottom-8 lg:left-12"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-xs font-bold tabular-nums">
            {String(active + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-6 bg-white/60 sm:w-8" />

          <span className="text-xs tabular-nums text-white/70">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Carousel arrows */}
        <div
          ref={arrowsRef}
          className="absolute bottom-4 right-5 z-20 flex items-center gap-2 sm:bottom-6 sm:right-8 sm:gap-3 lg:bottom-7 lg:right-12"
        >
          <button
            type="button"
            onClick={previous}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white shadow-[0_0_8px_rgba(255,255,255,0.12)] transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white/15 hover:shadow-[0_0_12px_rgba(255,255,255,0.85)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-10 sm:w-10"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white shadow-[0_0_8px_rgba(255,255,255,0.12)] transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white/15 hover:shadow-[0_0_12px_rgba(255,255,255,0.85)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-10 sm:w-10"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Original slide-color accent */}
        <div
          ref={accentRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[2px]"
          style={{ backgroundColor: slide.color }}
        />
      </div>
    </section>
  );
}
