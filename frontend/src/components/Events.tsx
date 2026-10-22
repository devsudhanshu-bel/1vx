
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Gamepad2,
  Trophy,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    number: "01",
    title: "VALORANT",
    secondLine: "TOURNAMENTS",
    description:
      "Compete in high-stakes Valorant tournaments—showcase your skills, dominate the arena, and win big!",
    image: "/images/valorant.png",
    label: "VIEW TOURNAMENTS",
    icon: Trophy,
    accent: "#13bfff",
    href: "#valorant-events",
  },
  {
    number: "02",
    title: "POOL",
    secondLine: "TOURNAMENTS",
    description:
      "Take your shot at our competitive pool tournaments. Whether you're a casual player or a seasoned pro, it's all about skill, strategy, and the thrill of the game.",
    image: "/images/pool-event.png",
    label: "VIEW POOL EVENTS",
    icon: Gamepad2,
    accent: "#19bfff",
    href: "#pool-events",
  },
  {
    number: "03",
    title: "CORPORATE",
    secondLine: "EVENTS",
    description:
      "Host your corporate events with us for team building, gaming sessions, and memorable experiences. Perfect for companies looking to engage, unwind, and create stronger teams.",
    image: "/images/coop.png",
    label: "PLAN A CORPORATE EVENT",
    icon: Users,
    accent: "#a855f7",
    href: "#corporate-events",
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      gsap.fromTo(
        heading.querySelectorAll(".event-heading-animate"),
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      const cardElements =
        cards.querySelectorAll<HTMLElement>(".event-card");

      gsap.fromTo(
        cardElements,
        { y: 65, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 82%",
            once: true,
          },
        }
      );

      cardElements.forEach((card) => {
        const image = card.querySelector(".event-image");
        const glow = card.querySelector(".event-glow");

        const onEnter = () => {
          gsap.to(card, {
            y: -8,
            duration: 0.35,
            ease: "power2.out",
          });

          if (image) {
            gsap.to(image, {
              scale: 1.07,
              duration: 0.7,
              ease: "power2.out",
            });
          }

          if (glow) {
            gsap.to(glow, {
              opacity: 1,
              duration: 0.35,
            });
          }
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });

          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          }

          if (glow) {
            gsap.to(glow, {
              opacity: 0,
              duration: 0.3,
            });
          }
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        // Store cleanup functions on the card for unmount.
        card.dataset.eventAnimationReady = "true";

        card.addEventListener("touchstart", () => {}, {
          passive: true,
        });

        cleanupListeners.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }, section);

    return () => {
      cleanupListeners.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  const cleanupListeners: Array<() => void> = [];

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative isolate w-full overflow-hidden bg-[#02040b] text-white"
    >
      {/* Cinematic full-section background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/images/event-bg.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040b]/75 via-[#02040b]/60 to-[#02040b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(0,92,255,0.16),transparent_65%)]" />
      </div>

      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        {/* Top label */}
        <div className="mb-12 flex items-center justify-between gap-4 sm:mb-16">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-xs">
            <span className="h-px w-8 bg-[#13bfff]" />
            1VX / Events
          </div>

          <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/55 sm:flex">
            Compete. Connect. Celebrate.
            <span className="text-lg font-black text-[#13bfff]">///</span>
          </div>
        </div>

        {/* Heading */}
        <div
          ref={headingRef}
          className="mb-12 grid gap-7 lg:mb-16 lg:grid-cols-[1fr_0.75fr] lg:items-end"
        >
          <div>
            <p className="event-heading-animate mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#13bfff]">
              More than just gaming
            </p>

            <h2 className="event-heading-animate font-['Nyxerin',Impact,sans-serif] text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              EVENTS
              <br />
              <span className="text-[#13bfff]">&amp; TOURNAMENTS</span>
            </h2>
          </div>

          <div className="event-heading-animate max-w-xl lg:justify-self-end">
            <p className="text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              Join adrenaline-charged Valorant showdowns and thrilling
              pool tournaments. Host corporate events where fun meets
              fierce competition—team up for gaming, challenges, and
              unforgettable moments.
            </p>

            <div className="mt-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
              <span className="h-px w-10 bg-[#13bfff]" />
              Make your next event legendary
            </div>
          </div>
        </div>

        {/* Event cards */}
        <div
          ref={cardsRef}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
        >
          {events.map((event) => {
            const Icon = event.icon;

            return (
              <article
                key={event.number}
                className="event-card group relative flex min-h-[540px] flex-col overflow-hidden border border-white/15 bg-[#030713]/75 transition-colors duration-300 hover:border-white/35 sm:min-h-[570px]"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 96%, 92% 100%, 0 100%)",
                }}
              >
                {/* Image */}
                <div className="relative h-[260px] overflow-hidden sm:h-[300px]">
                  <img
                    src={event.image}
                    alt={event.title + " event"}
                    loading="lazy"
                    className="event-image h-full w-full object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#030713] via-black/10 to-black/10" />
                  <div className="absolute inset-0 bg-[#02040b]/10" />

                  <div
                    className="event-glow pointer-events-none absolute inset-0 opacity-0"
                    style={{
                      background: `linear-gradient(135deg, ${event.accent}30, transparent 65%)`,
                    }}
                  />

                  <div className="absolute left-5 top-5 flex items-center gap-3">
                    <span
                      className="h-px w-8"
                      style={{ backgroundColor: event.accent }}
                    />
                    <span className="text-[10px] font-semibold tracking-[0.25em] text-white/80">
                      1VX / {event.number}
                    </span>
                  </div>

                  <span
                    className="absolute bottom-3 right-5 font-['Nyxerin',Impact,sans-serif] text-7xl font-black leading-none opacity-25 sm:text-8xl"
                    aria-hidden="true"
                  >
                    {event.number}
                  </span>
                </div>

                {/* Card content */}
                <div className="relative flex flex-1 flex-col px-5 pb-6 pt-2 sm:px-7 sm:pb-7">
                  <div
                    className="mb-4 h-[2px] w-12"
                    style={{ backgroundColor: event.accent }}
                  />

                  <h3 className="font-['Nyxerin',Impact,sans-serif] text-3xl font-black uppercase leading-[0.98] sm:text-4xl">
                    {event.title}
                    <br />
                    <span style={{ color: event.accent }}>
                      {event.secondLine}
                    </span>
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-6 text-white/70 sm:text-[15px] sm:leading-7">
                    {event.description}
                  </p>

                  <a
                    href={event.href}
                    className="mt-auto flex min-h-12 items-center justify-between gap-3 border px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xs"
                    style={{
                      borderColor: `${event.accent}cc`,
                    }}
                  >
                    <span>{event.label}</span>
                    <ArrowUpRight size={19} className="shrink-0" />
                  </a>

                  <div className="mt-5 flex items-center justify-between">
                    <span
                      className="text-[9px] uppercase tracking-[0.24em] text-white/40"
                    >
                      1VX Gaming
                    </span>
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                      style={{ color: event.accent }}
                    />
                  </div>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: event.accent }}
                />
              </article>
            );
          })}
        </div>

        {/* Footer line */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
          <span>Good players. Great memories.</span>
          <span className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#13bfff]" />
            Your next move starts here
          </span>
        </div>
      </div>
    </section>
  );
}
