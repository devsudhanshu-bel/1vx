
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Gamepad2,
  Monitor,
  Glasses,
  Coffee,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "ELITE PCs",
    description: "High-performance gaming rigs",
    Icon: Gamepad2,
  },
  {
    title: "PS5 CONSOLES",
    description: "Next-gen gaming experience",
    Icon: Monitor,
  },
  {
    title: "VR & SIMULATORS",
    description: "Step into new worlds",
    Icon: Glasses,
  },
  {
    title: "CAFÉ & DINING",
    description: "Great food, greater games",
    Icon: Coffee,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      const featureCards = gsap.utils.toArray<HTMLElement>(
        ".about-feature",
        featuresRef.current,
      );

      const headingWords = gsap.utils.toArray<HTMLElement>(
        ".about-heading-word",
        headingRef.current,
      );

      // Image reveal: smooth entrance with depth
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            autoAlpha: 0,
            x: -90,
            scale: 0.92,
          },
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );
      }

      // Small ABOUT label and line
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );
      }

      // Heading reveals word by word
      if (headingWords.length) {
        gsap.fromTo(
          headingWords,
          {
            autoAlpha: 0,
            y: 45,
            rotateX: -20,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.13,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Description rises into view
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Accent line grows vertically
      if (accentRef.current) {
        gsap.fromTo(
          accentRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Feature cards flow up from the bottom, one after another
      if (featureCards.length) {
        gsap.fromTo(
          featureCards,
          {
            autoAlpha: 0,
            y: 55,
            scale: 0.92,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: "back.out(1.35)",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-black px-5 py-20 text-white sm:px-8 sm:py-24 lg:min-h-[760px] lg:px-12 lg:py-28"
    >
      {/* Very subtle purple ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-700/[0.07] blur-[140px]"
      />

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* LEFT: GTA V artwork */}
        <div
          ref={imageRef}
          className="relative mx-auto w-full max-w-[680px] will-change-transform"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-10 rounded-full bg-fuchsia-600/[0.12] blur-[100px]"
          />

          <img
            src="/images/gtav.png"
            alt="GTA V inspired gaming artwork for 1vX Gaming"
            loading="lazy"
            className="relative z-10 block h-auto w-full object-contain transition-transform duration-700 ease-out hover:scale-[1.015]"
          />
        </div>

        {/* RIGHT: About content */}
        <div className="w-full">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="mb-5 flex items-center gap-4"
          >
            <span className="text-xs font-medium uppercase tracking-[0.45em] text-white/75">
              About
            </span>

            <span className="h-px w-24 bg-white/25" />
          </div>

          {/* Animated heading */}
          <h2
            ref={headingRef}
            id="about-heading"
            className="flex flex-wrap gap-x-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{ perspective: "700px" }}
          >
            <span className="about-heading-word inline-block">
              About
            </span>

            <span className="about-heading-word inline-block bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
              1vX Gaming
            </span>
          </h2>

          {/* Description and animated accent */}
          <div
            ref={descriptionRef}
            className="relative mt-8 pl-5 sm:pl-7"
          >
            <div
              ref={accentRef}
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-[2px] bg-gradient-to-b from-purple-400 to-fuchsia-600"
            />

            <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              1vX Gaming is the ultimate entertainment hub—elite PCs,
              PS5 consoles, VR, car simulators, pool, board games and
              café dining all under one electrifying roof. Lose
              yourself in the vibe: immerse in epic battles, relax
              with great food, and make unforgettable memories
              together. Whether you're here for competitive matches
              or casual hangs, expect top-tier equipment, an
              unmatched vibe and an atmosphere that fuels every
              game. From adrenaline-pumping moments to laid-back
              café chats, 1vX Gaming is where community, comfort,
              and passion collide.
            </p>
          </div>

          {/* Feature cards */}
          <div
            ref={featuresRef}
            className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-3 lg:mt-14"
          >
            {features.map(({ title, description, Icon }, index) => (
              <div
                key={title}
                className={`about-feature group flex flex-col items-center px-2 text-center ${
                  index < features.length - 1
                    ? "sm:border-r sm:border-white/15"
                    : ""
                }`}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/80 text-purple-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white group-hover:bg-purple-400/10 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(192,132,252,0.35)]">
                  <Icon
                    size={23}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-[10px] font-bold tracking-wide sm:text-xs">
                  {title}
                </h3>

                <p className="mt-2 max-w-32 text-xs leading-5 text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
