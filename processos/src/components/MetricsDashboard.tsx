import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

export interface MetricDatum {
  label: string;
  before: number;
  after: number;
  formatValue?: (value: number) => string;
}

interface MetricsDashboardProps {
  data: MetricDatum[];
  deltaMessage?: string;
}

const formatDefault = (v: number) => `${Math.round(v)}`;

function MetricRow({ label, before, after, formatValue = formatDefault }: MetricDatum) {
  const chartData = [
    { name: "Antes", value: before },
    { name: "Depois", value: after },
  ];
  const max = Math.max(before, after, 1);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-muted">
        <span>{label}</span>
        <span className="font-mono normal-case text-ink">
          {formatValue(before)} → {formatValue(after)}
        </span>
      </div>
      <div className="h-14 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, bottom: 4, left: 0, right: 24 }}
          >
            <XAxis type="number" domain={[0, max * 1.15]} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={48}
              tick={{ fill: "#737373", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="value"
              radius={[0, 6, 6, 0]}
              isAnimationActive
              animationDuration={500}
              barSize={16}
            >
              {chartData.map((entry, i) => (
                <Cell key={entry.name} fill={i === 0 ? "#D4D4D4" : "#DC2626"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function MetricsDashboard({ data, deltaMessage }: MetricsDashboardProps) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-wide text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /> Sem
          processo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Com
          processo
        </span>
      </div>

      <div className="space-y-5">
        {data.map((metric) => (
          <MetricRow key={metric.label} {...metric} />
        ))}
      </div>

      {deltaMessage && (
        <p className="mt-5 font-mono text-sm font-bold text-accent">
          {deltaMessage}
        </p>
      )}
    </div>
  );
}
