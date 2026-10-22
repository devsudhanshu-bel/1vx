
import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { Mail, Phone, ArrowRight } from "lucide-react";

const contacts = [
  {
    location: "1VX Indiranagar",
    phone: "+91 91649 08588",
    href: "tel:+919164908588",
  },
  {
    location: "1VX Jayanagar",
    phone: "+91 91649 08488",
    href: "tel:+919164908488",
  },
];

function SocialIcon({
  type,
}: {
  type: "instagram" | "facebook" | "youtube";
}) {
  if (type === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.7 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    type: "instagram" as const,
    href: "https://www.instagram.com/",
  },
  {
    label: "Email",
    type: "email" as const,
    href: "mailto:",
  },
  {
    label: "Facebook",
    type: "facebook" as const,
    href: "https://www.facebook.com/",
  },
  {
    label: "YouTube",
    type: "youtube" as const,
    href: "https://www.youtube.com/",
  },
];

export default function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.fromTo(
        content,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    setStatus("Opening your email application…");

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-black text-white lg:h-[100svh] lg:max-h-[100svh]"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] items-center px-5 py-10 sm:px-8 lg:h-full lg:min-h-0 lg:px-16 lg:py-5 xl:px-20">
        {/* Left vertical decoration */}
        <aside className="pointer-events-none absolute bottom-10 left-6 hidden flex-col items-center gap-5 lg:flex">
          <span className="h-16 w-px bg-white/35" />
          <span
            className="text-[10px] uppercase tracking-[0.4em] text-white/60"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            1VX / Gaming
          </span>
          <span className="h-16 w-px bg-white/35" />
          <span className="text-[9px] uppercase leading-5 tracking-[0.2em] text-white/50">
            PLAY
            <br />
            COMPETE
            <br />
            CONNECT
          </span>
        </aside>

        {/* Right vertical decoration */}
        <aside className="pointer-events-none absolute right-6 top-10 hidden flex-col items-center gap-5 lg:flex">
          <span className="h-16 w-px bg-white/35" />
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-white/60"
            style={{ writingMode: "vertical-rl" }}
          >
            More than just gaming
          </span>
          <span className="h-16 w-px bg-white/35" />
        </aside>

        {/* Main contact content */}
        <div
          ref={contentRef}
          className="mx-auto w-full max-w-[720px] lg:max-w-[760px]"
        >
          <header className="mb-6 text-center sm:mb-7 lg:mb-5">
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-white/40 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-white/75 sm:text-xs">
                Get in touch
              </span>
              <span className="h-px w-8 bg-white/40 sm:w-12" />
            </div>

            <h2
              id="contact-heading"
              className="font-nyxerin text-4xl uppercase leading-none tracking-wide sm:text-5xl md:text-6xl"
            >
              Get in <span className="text-white/55">touch</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-white/65 sm:text-sm md:text-base">
              Join the 1VX community — reach out for unlimited fun, events, or
              visits!
            </p>
          </header>

          {/* Social links */}
          <nav
            aria-label="Social media"
            className="mb-6 flex items-center justify-center gap-3 sm:mb-7 sm:gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.label === "Email" ? undefined : "_blank"}
                rel={social.label === "Email" ? undefined : "noreferrer"}
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:h-12 sm:w-12"
              >
                {social.type === "email" ? (
                  <Mail size={20} strokeWidth={1.5} />
                ) : (
                  <SocialIcon type={social.type} />
                )}
              </a>
            ))}
          </nav>

          {/* Phone contacts */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-7 sm:grid-cols-2 sm:gap-5">
            {contacts.map((contact, index) => (
              <a
                key={contact.location}
                href={contact.href}
                className={`group flex items-center justify-center gap-3 py-1 ${
                  index === 1
                    ? "sm:border-l sm:border-white/20 sm:pl-5"
                    : ""
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:bg-white group-hover:text-black">
                  <Phone size={16} strokeWidth={1.5} />
                </span>

                <span>
                  <span className="block text-[10px] tracking-[0.16em] text-white/55 sm:text-[11px]">
                    {contact.location}
                  </span>
                  <span className="mt-1 block text-sm font-semibold tracking-wide sm:text-base">
                    {contact.phone}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-[10px] font-semibold tracking-[0.22em] text-white/85 sm:text-xs"
              >
                NAME
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="h-11 w-full rounded-none border border-white/30 bg-white/[0.025] px-4 text-sm text-white outline-none placeholder:text-white/30 hover:border-white/50 focus:border-white sm:h-12"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-[10px] font-semibold tracking-[0.22em] text-white/85 sm:text-xs"
              >
                EMAIL
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-11 w-full rounded-none border border-white/30 bg-white/[0.025] px-4 text-sm text-white outline-none placeholder:text-white/30 hover:border-white/50 focus:border-white sm:h-12"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-[10px] font-semibold tracking-[0.22em] text-white/85 sm:text-xs"
              >
                MESSAGE
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Write your message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={3}
                className="min-h-24 w-full resize-y rounded-none border border-white/30 bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 hover:border-white/50 focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-between border border-white bg-white px-5 text-black transition-colors duration-300 hover:bg-black hover:text-white sm:h-14 sm:px-6"
            >
              <span className="flex-1 text-center text-[10px] font-bold uppercase tracking-[0.22em] sm:text-xs">
                Send message
              </span>
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {status && (
              <p role="status" className="text-center text-xs text-white/65">
                {status}
              </p>
            )}
          </form>

          <footer className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-[9px] uppercase tracking-[0.17em] text-white/40 sm:mt-6">
            <span>1VX Gaming</span>
            <span>Play. Compete. Connect.</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
