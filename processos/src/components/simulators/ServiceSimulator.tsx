import { useEffect, useState } from "react";
import { Check, Bot, User, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { SEGMENTS } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const content = SEGMENTS.servicos.simulator;
const steps = content.serviceSteps!;
const target = content.robotClientsTarget!;
const perTick = content.robotClientsPerTick ?? 1;
const STEP_DELAY_MS = 1000;
const ROBOT_TICK_MS = 150;

export function ServiceSimulator() {
  const [started, setStarted] = useState(false);
  const [userStepIndex, setUserStepIndex] = useState(0);
  const [userBusy, setUserBusy] = useState(false);
  const [userClients, setUserClients] = useState(0);
  const [robotClients, setRobotClients] = useState(0);
  const reducedMotion = useReducedMotion();

  const robotDone = robotClients >= target;

  useEffect(() => {
    if (!started) return;
    if (reducedMotion) {
      setRobotClients(target);
      return;
    }
    if (robotClients >= target) return;
    const t = setTimeout(
      () => setRobotClients((c) => Math.min(target, c + perTick)),
      ROBOT_TICK_MS
    );
    return () => clearTimeout(t);
  }, [started, robotClients, reducedMotion]);

  const handleStepClick = () => {
    if (userBusy) return;
    if (!started) setStarted(true);
    setUserBusy(true);
    window.setTimeout(() => {
      setUserBusy(false);
      setUserStepIndex((idx) => {
        const next = idx + 1;
        if (next === steps.length) {
          setUserClients((c) => c + 1);
          return 0;
        }
        return next;
      });
    }, STEP_DELAY_MS);
  };

  const reset = () => {
    setStarted(false);
    setUserStepIndex(0);
    setUserBusy(false);
    setUserClients(0);
    setRobotClients(0);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center gap-6 font-mono">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
              <User className="h-3.5 w-3.5" /> Você
            </p>
            <p className="text-3xl font-bold tabular-nums text-ink">
              {userClients} <span className="text-sm font-medium text-muted">clientes</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent">
              <Bot className="h-3.5 w-3.5" /> Robô
            </p>
            <p className="text-3xl font-bold tabular-nums text-accent">
              {robotClients} <span className="text-sm font-medium text-muted">clientes</span>
            </p>
          </div>
        </div>
        {robotDone && (
          <div className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">
            <Clock className="h-4 w-4 text-accent" />
            {content.hoursSavedPerMonth}h/mês economizadas
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-wide text-muted">
            Você (manual) — clique nos passos, um por vez
          </p>
          <div className="space-y-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isDone = i < userStepIndex;
              const isCurrent = i === userStepIndex;
              return (
                <button
                  key={i}
                  onClick={isCurrent ? handleStepClick : undefined}
                  disabled={!isCurrent || userBusy}
                  className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                    isDone
                      ? "border-ink/20 bg-surface"
                      : isCurrent
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-white opacity-50"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-5 w-5 shrink-0 text-ink" />
                  ) : (
                    <Icon className="h-5 w-5 shrink-0 text-accent" />
                  )}
                  <span className="text-sm font-medium text-ink">
                    {step.label}
                  </span>
                  {isCurrent && userBusy && (
                    <span className="ml-auto text-xs font-bold text-muted">
                      processando…
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-accent/30 bg-white p-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-wide text-accent">
            Robô (RPA) — processa sozinho
          </p>
          <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-9">
            {Array.from({ length: target }, (_, i) => (
              <motion.span
                key={i}
                initial={false}
                animate={{
                  backgroundColor: i < robotClients ? "#DC2626" : "#E5E5E5",
                  scale: i === robotClients - 1 ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.25 }}
                className="aspect-square rounded-sm"
              />
            ))}
          </div>
          {!started && (
            <p className="mt-4 text-sm text-muted">
              O robô entra em ação assim que você der o primeiro clique.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="max-w-lg text-sm text-muted">
          {robotDone ? content.closingMessage : ""}
        </p>
        <button
          onClick={reset}
          className="min-h-[44px] rounded-full border border-line px-5 py-2 text-sm font-bold text-ink transition-colors hover:border-ink/40"
        >
          Reiniciar corrida
        </button>
      </div>
    </div>
  );
}
