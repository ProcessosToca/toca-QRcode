import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const POINT_COUNT = 90;
const VIEW_WIDTH = 40;
const CENTER_X = VIEW_WIDTH / 2;
const AMPLITUDE = 9;
const TRANSITION = 0.05;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

/**
 * The page's visual signature: a red thread that runs down the left edge,
 * chaotic at the top and combed straight as the reader scrolls past each
 * point — "do caos ao processo" told through the scrollbar itself.
 */
export function FlowLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const [docHeight, setDocHeight] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setDocHeight(document.documentElement.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!pathRef.current || docHeight === 0) return;

    const chaoticOffsets = Array.from({ length: POINT_COUNT }, (_, i) =>
      (seededRandom(i) - 0.5) * 2 * AMPLITUDE
    );

    const buildPath = (progress: number) => {
      let d = "";
      for (let i = 0; i < POINT_COUNT; i++) {
        const t = i / (POINT_COUNT - 1);
        const y = t * docHeight;
        let chaosFactor: number;
        if (t < progress - TRANSITION) chaosFactor = 0;
        else if (t > progress + TRANSITION) chaosFactor = 1;
        else chaosFactor = (t - (progress - TRANSITION)) / (TRANSITION * 2);
        const x = CENTER_X + chaoticOffsets[i] * chaosFactor;
        d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)} `;
      }
      return d;
    };

    if (reducedMotion) {
      pathRef.current.setAttribute("d", buildPath(1));
      return;
    }

    pathRef.current.setAttribute("d", buildPath(0));

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        if (pathRef.current) {
          pathRef.current.setAttribute("d", buildPath(self.progress));
        }
      },
    });

    return () => trigger.kill();
  }, [docHeight, reducedMotion]);

  if (docHeight === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-30 w-7"
      style={{ height: docHeight }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEW_WIDTH} ${docHeight}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.55}
        />
      </svg>
    </div>
  );
}
