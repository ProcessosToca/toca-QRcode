import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeftRight, Check } from "lucide-react";
import { SEGMENTS, type Segment } from "../data/content";
import { Stat } from "./ui/Stat";
import { Tag } from "./ui/Tag";
import { Card } from "./ui/Card";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ProblemSectionProps {
  segment: Segment;
}

export function ProblemSection({ segment }: ProblemSectionProps) {
  const content = SEGMENTS[segment].problem;
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll("[data-reveal]");
      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(cards, { opacity: 0, y: 24 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [segment, reducedMotion]);

  return (
    <section
      id="problema"
      ref={rootRef}
      className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:px-20"
    >
      <Tag tone="accent">{content.eyebrow}</Tag>
      <h2
        data-reveal
        className="text-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
      >
        {content.headline}
      </h2>
      <p data-reveal className="mt-4 max-w-2xl text-lg text-muted">
        {content.intro}
      </p>

      <div
        data-reveal
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
      >
        {content.stats.map((stat, i) => (
          <Card key={i} data-reveal>
            <Stat
              value={stat.value}
              decimals={stat.decimals}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          </Card>
        ))}
      </div>

      <div data-reveal className="mt-16">
        {segment === "industria" ? (
          <ReworkStory segment={segment} />
        ) : (
          <RepetitiveChecklist segment={segment} />
        )}
      </div>
    </section>
  );
}

function ReworkStory({ segment }: { segment: Segment }) {
  const steps = SEGMENTS[segment].problem.storySteps;
  return (
    <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div
            key={i}
            className="relative rounded-2xl border border-line bg-white p-6"
          >
            <Icon className="h-8 w-8 text-accent" strokeWidth={1.75} />
            <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.description}</p>
            {i === steps.length - 1 && (
              <div
                aria-hidden="true"
                className="mt-4 flex items-center gap-2 text-accent"
              >
                <ArrowLeftRight className="h-4 w-4 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  De volta ao início
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RepetitiveChecklist({ segment }: { segment: Segment }) {
  const steps = SEGMENTS[segment].problem.storySteps;
  const [checked, setChecked] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setChecked(steps.length);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % (steps.length + 1);
      setChecked(i);
    }, 900);
    return () => clearInterval(interval);
  }, [steps.length, reducedMotion]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-line bg-white p-6 sm:p-8">
      <p className="mb-4 text-xs font-bold uppercase tracking-wide text-muted">
        A rotina, todo dia, para cada cliente
      </p>
      <ul className="space-y-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isChecked = i < checked;
          return (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors duration-300 ${
                isChecked
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-surface"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                  isChecked
                    ? "border-accent bg-accent text-white"
                    : "border-line text-transparent"
                }`}
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <Icon className="h-4 w-4 shrink-0 text-muted" />
              <span className="text-sm font-medium text-ink">
                {step.title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
