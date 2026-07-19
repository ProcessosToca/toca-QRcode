import { SEGMENTS, type Segment } from "../data/content";
import { Tag } from "./ui/Tag";
import { IndustrySimulator } from "./simulators/IndustrySimulator";
import { ServiceSimulator } from "./simulators/ServiceSimulator";

interface SimulatorSectionProps {
  segment: Segment;
}

export function SimulatorSection({ segment }: SimulatorSectionProps) {
  const content = SEGMENTS[segment].simulator;

  return (
    <section
      id="simulador"
      className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:px-20"
    >
      <Tag>O simulador</Tag>
      <h2 className="text-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight">
        {content.title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-muted">{content.subtitle}</p>

      <div className="mt-12">
        {segment === "industria" ? (
          <IndustrySimulator />
        ) : (
          <ServiceSimulator />
        )}
      </div>
    </section>
  );
}
