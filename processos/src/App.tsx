import { lazy, Suspense } from "react";
import { SegmentProvider, useSegment } from "./context/SegmentContext";
import { SegmentCrossfade } from "./components/SegmentCrossfade";
import { FlowLine } from "./components/FlowLine";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";

const SimulatorSection = lazy(() =>
  import("./components/SimulatorSection").then((m) => ({
    default: m.SimulatorSection,
  }))
);
const TransformSection = lazy(() =>
  import("./components/TransformSection").then((m) => ({
    default: m.TransformSection,
  }))
);
const CtaFinal = lazy(() =>
  import("./components/CtaFinal").then((m) => ({ default: m.CtaFinal }))
);

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}

export default function App() {
  return (
    <SegmentProvider>
      <PageContent />
    </SegmentProvider>
  );
}

function PageContent() {
  const { resetKey } = useSegment();

  return (
    <div className="relative overflow-x-clip">
      <FlowLine />
      <Hero />

      <SegmentCrossfade>
        {(segment) => (
          <>
            <ProblemSection key={`problem-${resetKey}`} segment={segment} />
            <Suspense fallback={<SectionFallback />}>
              <SimulatorSection
                key={`simulator-${resetKey}`}
                segment={segment}
              />
            </Suspense>
          </>
        )}
      </SegmentCrossfade>

      <Suspense fallback={<SectionFallback />}>
        <TransformSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CtaFinal />
      </Suspense>
    </div>
  );
}
