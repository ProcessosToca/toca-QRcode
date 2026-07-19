import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefreshCw } from "lucide-react";
import { TRANSFORM_PILLARS, IMPROVEMENT_LOOP } from "../data/content";
import { Tag } from "./ui/Tag";
import { Card } from "./ui/Card";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function TransformSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const loopPathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll("[data-pillar]");
      const chips = root.querySelectorAll("[data-chip]");

      if (reducedMotion) {
        gsap.set([cards, chips], { opacity: 1, y: 0, x: 0 });
      } else {
        gsap.set(cards, { opacity: 0, y: 24 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: "top 70%" },
        });

        gsap.set(chips, { opacity: 0, x: -16 });
        gsap.to(chips, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: chips[0] as Element, start: "top 80%" },
        });
      }

      const loopPath = loopPathRef.current;
      if (loopPath) {
        const length = loopPath.getTotalLength();
        if (reducedMotion) {
          gsap.set(loopPath, { strokeDashoffset: 0 });
        } else {
          gsap.set(loopPath, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(loopPath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: loopPath,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.4,
            },
          });
        }
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:px-20"
    >
      <Tag tone="accent">A transformação</Tag>
      <h2 className="text-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight">
        Isso não é mágica. É uma área de Processos.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TRANSFORM_PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Card key={i} data-pillar>
              <Icon className="h-8 w-8 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-bold text-ink">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{pillar.description}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-20">
        <p className="mb-6 text-xs font-bold uppercase tracking-wide text-muted">
          O ciclo de melhoria contínua
        </p>

        <div className="hidden sm:block">
          <div className="grid grid-cols-5 gap-2">
            {IMPROVEMENT_LOOP.map((step, i) => (
              <div
                key={i}
                data-chip
                className="rounded-xl border border-line bg-white py-4 text-center"
              >
                <span className="font-mono text-xs text-muted">
                  0{i + 1}
                </span>
                <p className="mt-1 text-sm font-bold text-ink">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
          <svg
            viewBox="0 0 500 70"
            className="mt-1 h-16 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={loopPathRef}
              d="M450,4 C500,40 20,40 50,4"
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2.5}
              strokeLinecap="round"
              markerEnd="url(#loop-arrow)"
            />
            <defs>
              <marker
                id="loop-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="4"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col gap-2 sm:hidden">
          {IMPROVEMENT_LOOP.map((step, i) => (
            <div
              key={i}
              data-chip
              className="rounded-xl border border-line bg-white px-4 py-3"
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <p className="text-sm font-bold text-ink">{step.label}</p>
            </div>
          ))}
          <div className="flex items-center gap-2 self-start rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent">
            <RefreshCw className="h-3.5 w-3.5 animate-spin [animation-duration:3s]" />
            volta pro início
          </div>
        </div>
      </div>
    </section>
  );
}
