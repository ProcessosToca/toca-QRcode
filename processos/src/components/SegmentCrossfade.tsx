import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useSegment } from "../context/SegmentContext";
import type { Segment } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface SegmentCrossfadeProps {
  children: (segment: Segment) => ReactNode;
}

/** Keeps the previous segment's content on screen until the fade-out
 * completes, so switching Indústria/Serviços never reloads or jump-cuts. */
export function SegmentCrossfade({ children }: SegmentCrossfadeProps) {
  const { segment } = useSegment();
  const [displaySegment, setDisplaySegment] = useState(segment);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (segment === displaySegment) return;
    const el = containerRef.current;
    if (!el || reducedMotion) {
      setDisplaySegment(segment);
      return;
    }
    gsap.to(el, {
      opacity: 0,
      y: 8,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setDisplaySegment(segment),
    });
  }, [segment, displaySegment, reducedMotion]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [displaySegment, reducedMotion]);

  return <div ref={containerRef}>{children(displaySegment)}</div>;
}
