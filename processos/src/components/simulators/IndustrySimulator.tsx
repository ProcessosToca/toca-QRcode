import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Package, Check, X } from "lucide-react";
import type { ReactNode } from "react";
import { SEGMENTS } from "../../data/content";
import { MetricsDashboard, type MetricDatum } from "../MetricsDashboard";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Mode = "sem" | "com";
type PieceStatus = "pending" | "pass" | "rework";

const PIECE_COUNT = 10;
const content = SEGMENTS.industria.simulator;
const outcomes = content.industryOutcomes!;
const checklist = content.industryChecklist!;

const baselineTime = PIECE_COUNT * outcomes.timePerPieceSeconds.without;
const baselineReworkRate = 1 - outcomes.passRateWithoutProcess;
const baselineReworkPct = baselineReworkRate * 100;
const baselineCost = PIECE_COUNT * baselineReworkRate * outcomes.costPerReworkBRL;

export function IndustrySimulator() {
  const [mode, setMode] = useState<Mode>("sem");
  const [pieces, setPieces] = useState<PieceStatus[]>(
    Array(PIECE_COUNT).fill("pending")
  );
  const [totalTime, setTotalTime] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);
  const confettiFired = useRef(false);
  const reducedMotion = useReducedMotion();

  const resolvedCount = pieces.filter((p) => p !== "pending").length;
  const reworkCount = pieces.filter((p) => p === "rework").length;
  const reworkPct = resolvedCount > 0 ? (reworkCount / resolvedCount) * 100 : 0;
  const completed = resolvedCount === PIECE_COUNT;

  const resetLot = () => {
    setPieces(Array(PIECE_COUNT).fill("pending"));
    setTotalTime(0);
    setTotalCost(0);
    confettiFired.current = false;
  };

  useEffect(() => {
    resetLot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (completed && mode === "com" && !confettiFired.current) {
      confettiFired.current = true;
      if (!reducedMotion) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#DC2626", "#A3A3A3", "#171717"],
        });
      }
    }
  }, [completed, mode, reducedMotion]);

  const inspectPiece = (index: number) => {
    if (pieces[index] !== "pending") return;

    const passRate =
      mode === "com" ? outcomes.passRateWithProcess : outcomes.passRateWithoutProcess;
    const outcome: PieceStatus = Math.random() < passRate ? "pass" : "rework";
    const timeIncrement =
      mode === "com"
        ? outcomes.timePerPieceSeconds.with
        : outcomes.timePerPieceSeconds.without;

    setPieces((prev) => {
      const next = [...prev];
      next[index] = outcome;
      return next;
    });
    setTotalTime((t) => t + timeIncrement);
    if (outcome === "rework") {
      setTotalCost((c) => c + outcomes.costPerReworkBRL);
      setShakeIndex(index);
      setTimeout(() => setShakeIndex(null), 400);
    }
  };

  const economized = Math.max(0, baselineCost - totalCost);

  const metrics: MetricDatum[] = [
    {
      label: "Tempo do lote",
      before: baselineTime,
      after: totalTime,
      formatValue: (v) => `${Math.round(v)}s`,
    },
    {
      label: "% Retrabalho",
      before: baselineReworkPct,
      after: reworkPct,
      formatValue: (v) => `${v.toFixed(0)}%`,
    },
    {
      label: "Custo de retrabalho",
      before: baselineCost,
      after: totalCost,
      formatValue: (v) => `R$ ${Math.round(v).toLocaleString("pt-BR")}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr,1fr]">
      <div>
        <div className="mb-6 flex flex-wrap gap-3">
          <ModeButton active={mode === "sem"} onClick={() => setMode("sem")}>
            Sem padrão
          </ModeButton>
          <ModeButton active={mode === "com"} onClick={() => setMode("com")}>
            Com checklist de processo
          </ModeButton>
        </div>

        {mode === "com" && (
          <div className="mb-6 rounded-2xl border border-accent bg-accent-soft p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-accent">
              Checklist de inspeção
            </p>
            <ul className="space-y-1 text-sm text-ink">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          {pieces.map((status, i) => (
            <button
              key={i}
              onClick={() => inspectPiece(i)}
              disabled={status !== "pending"}
              aria-label={`Peça ${i + 1}${
                status === "pending"
                  ? ""
                  : status === "pass"
                  ? " — aprovada"
                  : " — retrabalho"
              }`}
              className={`relative flex aspect-square min-h-[44px] flex-col items-center justify-center rounded-xl border-2 transition-colors ${
                status === "pending"
                  ? "border-line bg-surface hover:border-ink/40"
                  : status === "pass"
                  ? "border-ink/20 bg-white"
                  : "border-accent bg-white"
              } ${shakeIndex === i ? "animate-shake" : ""}`}
            >
              {status === "pending" && (
                <Package className="h-6 w-6 text-muted" strokeWidth={1.5} />
              )}
              {status === "pass" && (
                <Check className="h-7 w-7 text-ink" strokeWidth={2.5} />
              )}
              {status === "rework" && (
                <>
                  <X className="h-6 w-6 text-accent" strokeWidth={2.5} />
                  <span className="mt-0.5 text-[9px] font-black uppercase tracking-wide text-accent">
                    Retrabalho
                  </span>
                </>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-6 font-mono">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Tempo</p>
            <p
              className={`text-2xl font-bold tabular-nums ${
                mode === "sem" ? "text-accent" : "text-ink"
              }`}
            >
              {Math.round(totalTime)}s
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Custo</p>
            <p
              className={`text-2xl font-bold tabular-nums ${
                mode === "sem" ? "text-accent" : "text-ink"
              }`}
            >
              R$ {Math.round(totalCost).toLocaleString("pt-BR")}
            </p>
          </div>
          <button
            onClick={resetLot}
            className="ml-auto min-h-[44px] rounded-full border border-line px-5 py-2 text-sm font-bold text-ink transition-colors hover:border-ink/40"
          >
            Reiniciar lote
          </button>
        </div>

        {completed && mode === "com" && (
          <p className="mt-6 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white">
            {content.closingMessage} Nesse lote:{" "}
            <span className="font-mono font-bold text-accent">
              R$ {Math.round(economized).toLocaleString("pt-BR")}
            </span>{" "}
            economizados.
          </p>
        )}
      </div>

      <MetricsDashboard
        data={metrics}
        deltaMessage={
          mode === "com" && completed
            ? `R$ ${Math.round(economized).toLocaleString("pt-BR")} economizados nesse lote`
            : undefined
        }
      />
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[44px] rounded-full border-2 px-5 py-2 text-sm font-bold transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-line bg-white text-muted hover:border-ink/30"
      }`}
    >
      {children}
    </button>
  );
}
