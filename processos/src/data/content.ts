import type { LucideIcon } from "lucide-react";
import {
  Search,
  Compass,
  Cog,
  ArrowLeftRight,
  Factory,
  Ban,
  ClipboardCheck,
  Undo2,
  Globe,
  FileDown,
  ListChecks,
  Database,
  RefreshCw,
} from "lucide-react";

export type Segment = "industria" | "servicos";

// -----------------------------------------------------------------------
// CONFIGURÁVEL: link do WhatsApp usado no CTA final.
// -----------------------------------------------------------------------
export const WHATSAPP_LINK = "https://wa.me/55XXXXXXXXXXX";

export interface StatItem {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface StoryStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProblemContent {
  eyebrow: string;
  headline: string;
  intro: string;
  stats: StatItem[];
  storySteps: StoryStep[];
}

export interface IndustryPieceOutcome {
  passRateWithoutProcess: number; // chance (0-1) a piece passes with no standard
  passRateWithProcess: number; // chance (0-1) a piece passes with checklist
  timePerPieceSeconds: { without: number; with: number };
  costPerReworkBRL: number;
}

export interface ServiceStep {
  icon: LucideIcon;
  label: string;
}

export interface SimulatorContent {
  title: string;
  subtitle: string;
  // industria
  industryChecklist?: string[];
  industryOutcomes?: IndustryPieceOutcome;
  // servicos
  serviceSteps?: ServiceStep[];
  robotClientsTarget?: number;
  robotClientsPerTick?: number;
  hoursSavedPerMonth?: number;
  closingMessage: string;
}

export interface SegmentContent {
  key: Segment;
  navLabel: string;
  switchDescription: string;
  problem: ProblemContent;
  simulator: SimulatorContent;
}

export const SEGMENTS: Record<Segment, SegmentContent> = {
  industria: {
    key: "industria",
    navLabel: "Indústria",
    switchDescription: "Fábrica, linha de produção, qualidade.",
    problem: {
      eyebrow: "O problema",
      headline: "O inimigo silencioso da fábrica: o retrabalho.",
      intro:
        "Toda peça que volta pra linha come material, hora-máquina e prazo — e quase ninguém mede isso direito.",
      stats: [
        {
          value: 30,
          suffix: "%",
          label: "quanto o retrabalho pode representar do custo de produção",
        },
        {
          value: 3,
          suffix: "%",
          label: "taxa máxima aceitável de retrabalho na indústria brasileira",
        },
        {
          value: 11,
          suffix: "%",
          label:
            "perda real encontrada no processo de uma metalúrgica que achava que tinha margem de 32% — e vendia no prejuízo",
        },
      ],
      storySteps: [
        {
          icon: Factory,
          title: "Peça produzida",
          description:
            "A linha roda no ritmo de sempre. Ninguém para pra checar padrão — só pra entregar volume.",
        },
        {
          icon: Ban,
          title: "Inspeção reprova",
          description:
            "O controle de qualidade barra a peça. Já era: material gasto, hora-máquina gasta.",
        },
        {
          icon: Undo2,
          title: "Volta pra linha",
          description:
            "Refazer custa tempo, prazo e dinheiro — e ninguém registra isso na planilha de margem.",
        },
      ],
    },
    simulator: {
      title: "Você é o gestor de qualidade por 60 segundos",
      subtitle:
        "10 peças chegaram na sua bancada. Escolha o modo e clique em cada uma para inspecionar.",
      industryChecklist: [
        "Medida dentro da tolerância especificada",
        "Acabamento sem rebarba ou trinca visível",
        "Registro de lote e operador preenchido",
      ],
      industryOutcomes: {
        passRateWithoutProcess: 0.7,
        passRateWithProcess: 0.98,
        timePerPieceSeconds: { without: 6, with: 2.5 },
        costPerReworkBRL: 440,
      },
      closingMessage: "Isso foi UM lote. Agora multiplique pelo seu mês.",
    },
  },
  servicos: {
    key: "servicos",
    navLabel: "Serviços",
    switchDescription: "Cobrança, back-office, tarefas repetitivas.",
    problem: {
      eyebrow: "O problema",
      headline: "Quantas horas do seu time somem em tarefas repetitivas?",
      intro:
        "A mesma rotina, o mesmo clique, o mesmo site — todo santo dia, pra cada cliente da carteira.",
      stats: [
        {
          value: 9000,
          prefix: "R$ ",
          suffix: "/mês",
          label: "custo médio de uma posição de cobrança manual",
        },
        {
          value: 70,
          suffix: "%",
          label: "redução de custo operacional possível com automação",
        },
        {
          value: 8,
          suffix: "x",
          label: "mais velocidade na operação automatizada",
        },
        {
          value: 2,
          suffix: " a 6 meses",
          label: "payback típico de um projeto de automação",
        },
      ],
      storySteps: [
        {
          icon: Globe,
          title: "Entrar no site do banco/concessionária",
          description: "Login, senha, captcha. De novo.",
        },
        {
          icon: FileDown,
          title: "Baixar o boleto",
          description: "Salvar o arquivo no lugar certo, com o nome certo.",
        },
        {
          icon: ListChecks,
          title: "Conferir se existe débito",
          description: "Abrir, olhar, comparar com a planilha.",
        },
        {
          icon: Database,
          title: "Lançar no sistema",
          description: "Copiar valor, colar campo, salvar.",
        },
        {
          icon: RefreshCw,
          title: "Repetir. E repetir. E repetir…",
          description: "Para cada cliente. Todo mês.",
        },
      ],
    },
    simulator: {
      title: "Corrida: você vs. o robô",
      subtitle:
        "Clique nos 4 passos da cobrança pra processar um cliente. Veja quanto o robô processa no mesmo tempo.",
      serviceSteps: [
        { icon: Globe, label: "Site do banco" },
        { icon: FileDown, label: "Baixar boleto" },
        { icon: ListChecks, label: "Conferir débito" },
        { icon: Database, label: "Lançar no sistema" },
      ],
      robotClientsTarget: 37,
      robotClientsPerTick: 1,
      hoursSavedPerMonth: 62,
      closingMessage:
        "O robô não se cansa, não erra digitação e não esquece nenhum débito. Seu time fica livre para o que só gente faz bem: pensar e atender.",
    },
  },
};

export interface TransformPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const TRANSFORM_PILLARS: TransformPillar[] = [
  {
    icon: Search,
    title: "Analista de Processos",
    description:
      "Mapeia a rotina real (AS-IS), enxerga gargalos e desenha o fluxo ideal (TO-BE).",
  },
  {
    icon: Compass,
    title: "Líder de Processos",
    description:
      "Prioriza o que dá mais retorno, engaja o time e garante que o padrão vire cultura, não papel na gaveta.",
  },
  {
    icon: Cog,
    title: "Ferramentas",
    description:
      "BPMN para mapear, indicadores (KPI) para medir, RPA para automatizar o repetitivo.",
  },
];

export interface FlowStep {
  label: string;
}

export const IMPROVEMENT_LOOP: FlowStep[] = [
  { label: "Mapear" },
  { label: "Medir" },
  { label: "Melhorar" },
  { label: "Automatizar" },
  { label: "Monitorar" },
];

export const HERO_CONTENT = {
  lineOne: "Sua empresa funciona.",
  lineTwoPrefix: "Mas ela funciona com ",
  lineTwoHighlight: "processo",
  lineTwoSuffix: "?",
  subtitle:
    "Uma experiência interativa de 3 minutos para você sentir, na prática, o que uma área de Processos muda no seu negócio.",
};

export const CTA_CONTENT = {
  titlePrefix: "Sua empresa não precisa trabalhar mais. Precisa trabalhar em ",
  titleHighlight: "processo",
  titleSuffix: ".",
  primaryButton: "Quero mapear meus processos",
  secondaryButton: "Refazer a experiência",
};

export const ArrowLeftRightIcon = ArrowLeftRight;
export const ClipboardCheckIcon = ClipboardCheck;
