import { motion } from "framer-motion";
import { CTA_CONTENT, WHATSAPP_LINK } from "../data/content";
import { useSegment } from "../context/SegmentContext";
import { Button } from "./ui/Button";

export function CtaFinal() {
  const { resetExperience } = useSegment();

  return (
    <section className="relative bg-ink px-6 py-32 text-white sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8">
        <h2 className="text-display text-[clamp(2rem,6vw,4rem)] font-black leading-tight">
          {CTA_CONTENT.titlePrefix}
          <span className="text-accent">{CTA_CONTENT.titleHighlight}</span>
          {CTA_CONTENT.titleSuffix}
        </h2>

        <div className="flex flex-col gap-4 sm:flex-row">
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="flex min-h-[44px] items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold tracking-tight text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent/90"
          >
            {CTA_CONTENT.primaryButton}
          </motion.a>
          <Button variant="ghost" onClick={resetExperience}>
            {CTA_CONTENT.secondaryButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
