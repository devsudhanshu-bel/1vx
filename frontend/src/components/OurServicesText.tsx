
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurServicesText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const words = ["OUR", "SERVICES"];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const letters = lettersRef.current.filter(Boolean);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(letters, {
          autoAlpha: 1,
          clearProps: "filter,transform",
        });
        gsap.set([lineRef.current, hintRef.current], {
          autoAlpha: 1,
        });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline.fromTo(
        letters,
        {
          yPercent: 115,
          rotateX: -75,
          autoAlpha: 0,
          filter: "blur(12px)",
          scale: 0.8,
        },
        {
          yPercent: 0,
          rotateX: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.85,
          stagger: 0.065,
          ease: "power4.out",
        },
      );

      timeline.to(
        letters,
        {
          textShadow:
            "0 0 5px rgba(255,255,255,0.9), 0 0 18px rgba(255,255,255,0.45)",
          duration: 0.45,
          stagger: 0.025,
          ease: "power2.out",
        },
        "-=0.3",
      );

      timeline.fromTo(
        lineRef.current,
        { scaleX: 0, autoAlpha: 0 },
        {
          scaleX: 1,
          autoAlpha: 1,
          duration: 0.75,
          ease: "power3.inOut",
        },
        "-=0.15",
      );

      timeline.fromTo(
        hintRef.current,
        { y: 12, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, section);

    return () => ctx.revert();
  }, []);

  let letterIndex = 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Our Services"
      className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-black px-3 py-24 text-white sm:min-h-[78vh] sm:px-6 sm:py-32"
      style={{ perspective: "1000px" }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/service-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Black gradient: opaque top and bottom, lighter middle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Subtle white ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-64 w-[80vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[110px]"
      />

      {/* Fine horizontal technical line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-1/2 z-[2] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative z-10 w-full max-w-[1600px] text-center">
        <h2
          aria-label="Our Services"
          className="font-nyxerin flex flex-col items-center justify-center gap-2 uppercase leading-[0.9] tracking-normal"
        >
          {words.map((word) => (
            <span
              key={word}
              aria-hidden="true"
              className="flex max-w-full justify-center overflow-hidden py-2"
            >
              {word.split("").map((letter) => {
                const index = letterIndex++;

                return (
                  <span
                    key={`${word}-${index}`}
                    ref={(element) => {
                      if (element) lettersRef.current[index] = element;
                    }}
                    className="inline-block text-[clamp(3.5rem,12.5vw,12rem)] text-white will-change-transform"
                    style={{
                      textShadow:
                        "0 0 8px rgba(255,255,255,0.22)",
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        <div
          ref={lineRef}
          className="mx-auto mt-8 h-px w-[min(65vw,440px)] bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)] sm:mt-11"
        />

        <div
          ref={hintRef}
          className="mt-7 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/70 sm:text-xs sm:tracking-[0.45em]">
            The experience starts here
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 hover:border-white hover:shadow-[0_0_18px_rgba(255,255,255,0.45)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 4v15m-6-6 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
