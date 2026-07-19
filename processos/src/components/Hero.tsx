import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HERO_CONTENT } from "../data/content";
import { SegmentSwitch } from "./SegmentSwitch";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
    const strike = root.querySelector<SVGPathElement>("[data-strike]");
    const rest = root.querySelectorAll<HTMLElement>("[data-hero-fade]");

    if (reducedMotion) {
      gsap.set(lines, { opacity: 1, yPercent: 0 });
      gsap.set(rest, { opacity: 1, y: 0 });
      if (strike) gsap.set(strike, { strokeDashoffset: 0 });
      return;
    }

    gsap.set(lines, { yPercent: 100, opacity: 0 });
    gsap.set(rest, { opacity: 0, y: 16 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.15,
    });

    if (strike) {
      const length = strike.getTotalLength();
      gsap.set(strike, { strokeDasharray: length, strokeDashoffset: length });
      tl.to(
        strike,
        { strokeDashoffset: 0, duration: 0.7, ease: "power3.inOut" },
        "-=0.5"
      );
    }

    tl.to(
      rest,
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-center gap-10 px-6 pb-20 pt-32 sm:px-10 lg:px-20"
    >
      <h1 className="text-display max-w-5xl text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.95]">
        <span
          data-hero-line
          className="relative inline-block overflow-hidden text-muted"
        >
          <span className="relative inline-block">
            {HERO_CONTENT.lineOne}
            <svg
              className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full sm:h-4"
              viewBox="0 0 400 20"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                data-strike
                d="M2,12 C100,4 300,18 398,8"
                fill="none"
                stroke="var(--accent)"
                strokeWidth={4}
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
        <br />
        <span data-hero-line className="inline-block overflow-hidden">
          <span className="relative inline-block text-ink">
            {HERO_CONTENT.lineTwoPrefix}
            <span className="text-accent">{HERO_CONTENT.lineTwoHighlight}</span>
            {HERO_CONTENT.lineTwoSuffix}
          </span>
        </span>
      </h1>

      <p
        data-hero-fade
        className="max-w-xl text-lg text-muted sm:text-xl"
      >
        {HERO_CONTENT.subtitle}
      </p>

      <div data-hero-fade>
        <SegmentSwitch />
      </div>
    </section>
  );
}
