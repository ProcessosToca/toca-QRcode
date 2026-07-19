import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export function Stat({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
}: StatProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  const format = (v: number) =>
    v.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    if (reducedMotion) {
      el.textContent = format(value);
      return;
    }

    el.textContent = "0";
    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = format(counter.val);
        },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, reducedMotion]);

  return (
    <div>
      <div className="font-mono text-4xl font-bold tabular-nums text-ink sm:text-5xl">
        {prefix}
        <span ref={numberRef}>0</span>
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}
