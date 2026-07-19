import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Segment } from "../data/content";

interface SegmentContextValue {
  segment: Segment;
  setSegment: (segment: Segment) => void;
  resetKey: number;
  resetExperience: () => void;
}

const SegmentContext = createContext<SegmentContextValue | undefined>(
  undefined
);

export function SegmentProvider({ children }: { children: ReactNode }) {
  const [segment, setSegmentState] = useState<Segment>("industria");
  const [resetKey, setResetKey] = useState(0);

  const setSegment = useCallback((next: Segment) => {
    setSegmentState(next);
  }, []);

  const resetExperience = useCallback(() => {
    setResetKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <SegmentContext.Provider
      value={{ segment, setSegment, resetKey, resetExperience }}
    >
      {children}
    </SegmentContext.Provider>
  );
}

export function useSegment(): SegmentContextValue {
  const ctx = useContext(SegmentContext);
  if (!ctx) {
    throw new Error("useSegment must be used within a SegmentProvider");
  }
  return ctx;
}
