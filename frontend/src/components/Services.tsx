import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Monitor,
  Gamepad2,
  CarFront,
  Glasses,
  CircleDot,
  ArrowDown,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "PC GAMING",
    shortTitle: "PC Gaming",
    image: "/images/pc-gaming.png",
    description:
      "Experience next-level gaming with high-performance PCs, RTX graphics, high-refresh-rate monitors and premium peripherals. From competitive ranked matches to immersive open worlds, your next victory starts here.",
    detail: "BUILT FOR GAMERS. POWERED FOR VICTORY.",
    spec: "HIGH-PERFORMANCE GAMING",
    icon: Monitor,
  },
  {
    number: "02",
    title: "POOL & SOCIAL",
    shortTitle: "Pool",
    image: "/images/pool.png",
    description:
      "Rack them up, line up your shot and challenge your friends. Our pool tables bring together friendly competition, relaxed vibes and memorable gaming sessions away from the screen.",
    detail: "AIM TRUE. OWN THE TABLE.",
    spec: "PLAY YOUR NEXT SHOT",
    icon: CircleDot,
  },
  {
    number: "03",
    title: "PS5 GAMING",
    shortTitle: "PS5 Gaming",
    image: "/images/ps5-gaming.png",
    description:
      "Jump into cinematic adventures, competitive multiplayer and a huge variety of games. Grab a controller, bring your squad and experience console gaming together.",
    detail: "YOUR GAME. YOUR WORLD.",
    spec: "CONSOLE GAMING REIMAGINED",
    icon: Gamepad2,
  },
  {
    number: "04",
    title: "CAR SIMULATOR",
    shortTitle: "Car Simulator",
    image: "/images/car-sim.png",
    description:
      "Get behind the wheel with immersive racing simulators, steering wheels and responsive pedals. Feel every corner, chase your fastest lap and put your driving skills to the test.",
    detail: "FEEL EVERY TURN.",
    spec: "RACING WITHOUT LIMITS",
    icon: CarFront,
  },
  {
    number: "05",
    title: "VIRTUAL REALITY",
    shortTitle: "VR Gaming",
    image: "/images/vr-gaming.png",
    description:
      "Step beyond the screen and into another dimension. Explore immersive virtual worlds, experience new adventures and discover gaming from an entirely different perspective.",
    detail: "STEP INTO THE IMPOSSIBLE.",
    spec: "IMMERSION WITHOUT LIMITS",
    icon: Glasses,
  },
  {
    number: "06",
    title: "BOARD GAMES",
    shortTitle: "Board Games",
    image: "/images/board-games.png",
    description:
      "Put your strategy to the test with timeless classics and friendly rivalries. Gather your crew, make your move and turn an ordinary hangout into a legendary game night.",
    detail: "LESS SCROLLING. MORE PLAYING.",
    spec: "YOUR NEXT MOVE STARTS HERE",
    icon: Zap,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const slidesContainer = slidesRef.current;

    if (!section || !slidesContainer) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".service-slide");
      const imageLayers =
        gsap.utils.toArray<HTMLElement>(".service-image");
      const textLayers =
        gsap.utils.toArray<HTMLElement>(".service-copy");
      const progress = progressRef.current;
      const current = currentRef.current;

      if (!panels.length) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(panels, { autoAlpha: 0 });
      gsap.set(imageLayers, { scale: 1.12, xPercent: 5 });
      gsap.set(textLayers, { y: 35, autoAlpha: 0 });

      gsap.set(panels[0], { autoAlpha: 1 });
      gsap.set(imageLayers[0], { scale: 1, xPercent: 0 });
      gsap.set(textLayers[0], { y: 0, autoAlpha: 1 });

      if (reduceMotion) {
        gsap.set(panels, { autoAlpha: 1 });
        gsap.set(imageLayers, { scale: 1, xPercent: 0 });
        gsap.set(textLayers, { y: 0, autoAlpha: 1 });

        return;
      }

      const sequence = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (services.length - 1)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              services.length - 1,
              Math.floor(self.progress * services.length)
            );

            if (current) {
              current.textContent = String(index + 1).padStart(2, "0");
            }

            navRefs.current.forEach((nav, navIndex) => {
              if (!nav) return;

              nav.style.opacity = navIndex === index ? "1" : "0.38";
              nav.style.transform =
                navIndex === index ? "translateX(5px)" : "translateX(0)";
            });

            if (progress) {
              progress.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      panels.forEach((panel, index) => {
        if (index === 0) {
          sequence.to(
            imageLayers[index],
            { scale: 1.04, duration: 1 },
            0
          );

          sequence.to(
            textLayers[index],
            { y: -8, duration: 1 },
            0
          );
        }

        if (index < panels.length - 1) {
          const nextIndex = index + 1;
          const position = index + 1;

          sequence
            .to(
              panel,
              { autoAlpha: 0, duration: 0.45 },
              position
            )
            .to(
              imageLayers[index],
              { scale: 0.94, xPercent: -4, duration: 0.9 },
              position
            )
            .fromTo(
              panels[nextIndex],
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.45 },
              position
            )
            .fromTo(
              imageLayers[nextIndex],
              { scale: 1.12, xPercent: 5 },
              {
                scale: 1,
                xPercent: 0,
                duration: 1,
              },
              position
            )
            .fromTo(
              textLayers[nextIndex],
              { y: 40, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                ease: "power3.out",
              },
              position + 0.15
            );
        }
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our gaming services"
      className="relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden bg-black text-white"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(24,72,180,0.16),transparent_48%)]" />

      {/* Top navigation / section label */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/[0.08] px-5 py-5 sm:px-8 lg:px-14">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-xs">
            1VX / Experiences
          </span>
        </div>

        <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 sm:text-[10px]">
          Explore what we offer
        </span>
      </div>

      {/* Main pinned showcase */}
      <div
        ref={slidesRef}
        className="relative h-full w-full overflow-hidden"
      >
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <article
              key={service.number}
              className="service-slide absolute inset-0"
              aria-label={service.shortTitle}
            >
              {/* Full-bleed service image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.shortTitle}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="service-image absolute inset-0 h-full w-full object-cover object-center"
                />

                {/* Image grading */}
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/20 sm:via-black/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,transparent_5%,rgba(0,0,0,0.12)_65%,rgba(0,0,0,0.55)_100%)]" />
              </div>

              {/* Main copy */}
              <div className="service-copy relative z-10 flex h-full items-center px-6 pb-24 pt-24 sm:px-12 sm:pb-28 lg:px-[13%]">
                <div className="w-full max-w-2xl">
                  <div className="mb-5 flex items-center gap-3 sm:mb-7">
                    <span className="text-xs font-medium tracking-[0.25em] text-white/90">
                      {service.number}
                    </span>
                    <span className="h-px w-10 bg-white/40" />
                    <span className="text-[9px] uppercase tracking-[0.28em] text-white/55 sm:text-[10px]">
                      The 1VX experience
                    </span>
                  </div>

                  <div className="mb-4 flex items-center gap-3">
                    <Icon
                      size={21}
                      strokeWidth={1.5}
                      className="shrink-0 text-white/80"
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65 sm:text-xs">
                      {service.spec}
                    </span>
                  </div>

                  <h2 className="max-w-full text-4xl font-black uppercase leading-[0.92] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[clamp(4rem,7vw,7.5rem)]">
                    {service.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-[10px] font-medium uppercase leading-relaxed tracking-[0.24em] text-white/55 sm:mt-6 sm:text-xs">
                    {service.detail}
                  </p>

                  <div className="my-6 h-px w-20 bg-white/70 sm:my-8 sm:w-28" />

                  <p className="max-w-lg text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                    {service.description}
                  </p>

                  <div className="mt-8 flex items-center gap-3 sm:mt-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25">
                      <Icon size={17} strokeWidth={1.5} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                        {service.shortTitle}
                      </p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/40">
                        Discover the experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right-side service marker */}
              <div className="pointer-events-none absolute bottom-28 right-6 z-10 hidden items-end gap-4 sm:flex lg:right-14">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/55">
                  Service
                </span>
                <span className="text-5xl font-light tracking-tighter text-white/20 lg:text-7xl">
                  {service.number}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Left-side progress rail */}
      <div className="absolute bottom-24 left-5 z-30 hidden -translate-y-1/2 flex-col items-center gap-0 sm:flex lg:left-8">
        <div className="mb-3 h-12 w-px bg-white/20" />

        {services.map((service, index) => (
          <div
            key={service.number}
            ref={(node) => {
              navRefs.current[index] = node;
            }}
            className="flex h-9 items-center gap-3 transition-all duration-300"
            style={{ opacity: index === 0 ? 1 : 0.38 }}
          >
            <span
              className={`h-2 w-2 rounded-full border ${
                index === 0
                  ? "border-white bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                  : "border-white/50 bg-transparent"
              }`}
            />
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/80">
              {service.number}
            </span>
          </div>
        ))}

        <div className="mt-3 h-12 w-px bg-white/20" />
      </div>

      {/* Bottom progress bar and scroll hint */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="h-px w-full bg-white/15">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          />
        </div>

        <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-14">
          <div className="flex items-center gap-3">
            <span ref={currentRef} className="text-xs tabular-nums">
              01
            </span>
            <span className="text-xs text-white/30">/</span>
            <span className="text-xs tabular-nums text-white/40">06</span>
            <span className="ml-2 hidden text-[9px] uppercase tracking-[0.2em] text-white/40 sm:inline">
              Our services
            </span>
          </div>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/60 sm:text-[10px]">
            <span>Scroll to explore</span>
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}