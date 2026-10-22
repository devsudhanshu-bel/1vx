import { useEffect, useRef } from "react";
import { ArrowUpRight, Coffee, Gamepad2, Utensils } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Cafe() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const line = lineRef.current;

    if (!section || !image || !content || !line) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .fromTo(
          image,
          { x: -70, opacity: 0, scale: 0.96 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          }
        )
        .fromTo(
          content.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );

      gsap.to(image, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cafe"
      className="relative isolate overflow-hidden bg-black text-white"
    >
      {/* Subtle cinematic background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,rgba(28,55,120,0.16),transparent_55%)]" />

      {/* Top label */}
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-5 sm:px-8 lg:px-16">
        <a
          href="/"
          className="flex items-center gap-3 text-[10px] font-bold tracking-[0.24em] sm:text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_white]" />
          1VX / CAFÉ
        </a>

        <span className="text-[8px] tracking-[0.2em] text-white/40 sm:text-[10px]">
          MORE THAN JUST GAMING
        </span>
      </div>

      {/* Main two-column layout */}
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-16 lg:py-24">
        {/* LEFT: Cinematic café image */}
        <div
          ref={imageRef}
          className="group relative min-w-0"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
            <img
              src="/images/cafe-food.png"
              alt="Drinks and food served at the 1VX gaming café"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
            />

            {/* Image treatment */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

            {/* Image caption */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3 sm:bottom-7 sm:left-7">
              <span className="flex h-10 w-10 items-center justify-center border border-white/40 bg-black/30 backdrop-blur-sm">
                <Coffee size={18} strokeWidth={1.5} />
              </span>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em]">
                  THE 1VX CAFÉ
                </p>
                <p className="mt-1 text-[10px] text-white/60">
                  Good food. Great games.
                </p>
              </div>
            </div>
          </div>

          {/* Fine accent line */}
          <div className="mt-3 flex items-center gap-3">
            <div ref={lineRef} className="h-px flex-1 bg-white/50" />
            <span className="text-[9px] tracking-[0.18em] text-white/40">
              FOOD · DRINKS · VIBES
            </span>
          </div>
        </div>

        {/* RIGHT: Café description */}
        <div ref={contentRef} className="min-w-0 lg:py-6">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-white/70" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/60">
              TAKE A BREAK
            </span>
          </div>

          <h2 className="text-[clamp(3rem,6.5vw,6.25rem)] font-bold leading-[0.9] tracking-[-0.065em]">
            LEVEL UP.
            <br />
            <span className="text-white/45">REFUEL.</span>
            <br />
            PLAY ON.
          </h2>

          <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            Great gaming deserves great food. Take a break between
            matches, grab your favourite bites and drinks, and
            catch up with your crew in the 1VX café. Whether you're
            here for a quick snack or a full gaming session, there's
            always something to enjoy.
          </p>

          {/* Feature highlights */}
          <div className="mt-8 grid grid-cols-3 border-y border-white/15 py-5">
            <div className="pr-2 sm:pr-4">
              <Utensils
                size={19}
                strokeWidth={1.5}
                className="mb-3 text-white/80"
              />
              <p className="text-[9px] font-semibold tracking-[0.08em] sm:text-[10px] sm:tracking-[0.12em]">
                FOOD & BITES
              </p>
              <p className="mt-1 text-[10px] text-white/45 sm:text-xs">
                Freshly served
              </p>
            </div>

            <div className="border-x border-white/15 px-3 sm:px-5">
              <Coffee
                size={19}
                strokeWidth={1.5}
                className="mb-3 text-white/80"
              />
              <p className="text-[9px] font-semibold tracking-[0.08em] sm:text-[10px] sm:tracking-[0.12em]">
                DRINKS
              </p>
              <p className="mt-1 text-[10px] text-white/45 sm:text-xs">
                Sip & recharge
              </p>
            </div>

            <div className="pl-3 sm:pl-5">
              <Gamepad2
                size={19}
                strokeWidth={1.5}
                className="mb-3 text-white/80"
              />
              <p className="text-[9px] font-semibold tracking-[0.08em] sm:text-[10px] sm:tracking-[0.12em]">
                GAMING VIBES
              </p>
              <p className="mt-1 text-[10px] text-white/45 sm:text-xs">
                Stay a little longer
              </p>
            </div>
          </div>

          {/* Single CTA */}
          <a
            href="/menu"
            className="group mt-8 inline-flex min-h-14 items-center justify-between gap-10 border border-white/40 px-5 py-4 transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:min-w-[265px] sm:px-6"
          >
            <span className="text-[10px] font-bold tracking-[0.16em] sm:text-xs">
              EXPLORE THE MENU
            </span>

            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

          <p className="mt-4 text-[9px] tracking-[0.12em] text-white/35">
            YOUR NEXT FAVOURITE BITE IS WAITING.
          </p>
        </div>
      </div>

      {/* Minimal bottom border */}
      <div className="h-px w-full bg-white/10" />
    </section>
  );
}