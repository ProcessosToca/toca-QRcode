import { motion } from "framer-motion";
import { useSegment } from "../context/SegmentContext";
import { SEGMENTS, type Segment } from "../data/content";

interface SegmentSwitchProps {
  onChoose?: (segment: Segment) => void;
}

export function SegmentSwitch({ onChoose }: SegmentSwitchProps) {
  const { segment, setSegment } = useSegment();

  const handleClick = (key: Segment) => {
    setSegment(key);
    onChoose?.(key);
    document
      .getElementById("problema")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      role="tablist"
      aria-label="Escolha seu segmento"
      className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {(Object.keys(SEGMENTS) as Segment[]).map((key) => {
        const content = SEGMENTS[key];
        const active = segment === key;
        return (
          <motion.button
            key={key}
            role="tab"
            aria-selected={active}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={() => handleClick(key)}
            className={`min-h-[44px] rounded-2xl border-2 bg-white px-6 py-6 text-left transition-colors ${
              active
                ? "border-accent"
                : "border-line hover:border-ink/30"
            }`}
          >
            <span className="block text-2xl font-black uppercase tracking-tight text-ink">
              {content.navLabel}
            </span>
            <span className="mt-1 block text-sm text-muted">
              {content.switchDescription}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
