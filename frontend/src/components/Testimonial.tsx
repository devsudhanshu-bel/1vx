
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    category: "TOURNAMENTS",
    quote:
      "The tournaments at 1VX are next level. The crowd, production, and energy make every match unforgettable.",
    author: "Tournament Player",
  },
  {
    category: "POOL EVENTS",
    quote:
      "Great tables, an amazing atmosphere, and genuinely fun competition. It's the perfect place to challenge your friends.",
    author: "Regular Visitor",
  },
  {
    category: "CORPORATE EVENTS",
    quote:
      "Our team event was brilliantly organised. Everyone got involved, had fun, and left with great memories.",
    author: "Event Attendee",
  },
  {
    category: "THE COMMUNITY",
    quote:
      "From the gaming setup to the people, everything feels different here. Every visit feels like an event.",
    author: "Community Member",
  },
];

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        contentRef.current?.children ?? [],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonial-heading"
      className="relative isolate overflow-hidden bg-[#03060d] px-4 py-10 text-white sm:px-6 sm:py-12 lg:h-[min(100svh,900px)] lg:min-h-[620px] lg:px-8 lg:py-8 xl:px-12"
    >
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]"
      />

      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-7 lg:h-full lg:grid-cols-[0.78fr_1.22fr] lg:gap-8 xl:gap-10">
        {/* LEFT: Character image */}
        <div
          ref={imageRef}
          className="relative h-[440px] overflow-hidden border border-blue-500/25 bg-[#050b17] sm:h-[500px] lg:h-full lg:min-h-0"
        >
          <img
            src="/images/testimonial.png"
            alt="Masked tactical gaming character representing the 1VX gaming community"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#02050b] via-black/15 to-[#02050b]/20" />
          <div className="absolute inset-0 bg-blue-950/15" />

          {/* Fine border */}
          <div className="pointer-events-none absolute inset-3 border border-white/15 sm:inset-4">
            <span className="absolute -left-px -top-px h-10 w-1 bg-cyan-400" />
            <span className="absolute -bottom-px -right-px h-10 w-1 bg-blue-500" />
          </div>

          <div className="absolute left-6 top-6 flex items-center gap-2 sm:left-8 sm:top-8">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/85 sm:text-[10px]">
              1VX / Community
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
            <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
              More than just gaming
            </span>

            <h3 className="font-nyxerin text-3xl uppercase leading-[0.98] sm:text-4xl xl:text-5xl">
              Built on
              <br />
              <span className="text-cyan-400">good games.</span>
              <br />
              Better people.
            </h3>

            <div className="my-4 h-px w-14 bg-cyan-400" />

            <p className="max-w-sm text-xs leading-5 text-white/75 sm:text-sm sm:leading-6">
              Every match, every event, every late-night session — our
              community makes 1VX special.
            </p>
          </div>
        </div>

        {/* RIGHT: Testimonial content */}
        <div
          ref={contentRef}
          className="flex min-w-0 flex-col justify-center lg:min-h-0"
        >
          <div className="mb-5 xl:mb-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-cyan-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Testimonials
              </span>
            </div>

            <h2
              id="testimonial-heading"
              className="font-nyxerin text-3xl uppercase leading-[0.98] sm:text-4xl xl:text-5xl 2xl:text-6xl"
            >
              The community
              <br />
              <span className="text-cyan-400">speaks.</span>
            </h2>

            <p className="mt-3 max-w-xl text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">
              From competitive tournaments to unforgettable team events,
              discover what makes the 1VX experience worth coming back for.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:gap-3">
            {testimonials.map((item, index) => (
              <article
                key={item.category}
                className="group relative flex flex-col border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-blue-950/30 sm:p-4 xl:p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="flex gap-0.5 text-cyan-400"
                    aria-label="Sample 5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={12}
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>

                  <Quote
                    aria-hidden="true"
                    className="h-5 w-5 text-blue-500/50 transition-colors group-hover:text-cyan-400"
                  />
                </div>

                <p className="flex-1 text-xs leading-5 text-white/80 sm:text-[13px] sm:leading-[1.4rem]">
                  “{item.quote}”
                </p>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
                      {item.author}
                    </p>
                    <span className="shrink-0 text-[10px] text-cyan-300/80">
                      0{index + 1}
                    </span>
                  </div>

                  <span className="mt-1.5 block text-[9px] uppercase tracking-[0.16em] text-white/45 sm:text-[10px]">
                    {item.category}
                  </span>
                </div>

                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
              1VX Gaming
            </span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 sm:text-[10px]">
              Play. Compete. Connect.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
