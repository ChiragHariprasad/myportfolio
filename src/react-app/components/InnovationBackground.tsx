import React, { useEffect, useRef } from 'react';

/* ========================================================================
   THE INNOVATION UNIVERSE
   A multi-layer dynamic background system that feels like a living
   ecosystem of ideas, research, engineering, and invention.
   
   Layer 1 — Innovation Constellation (gold node network)
   Layer 2 — Living Knowledge Graph (labeled concept nodes)
   Layer 3 — Floating Innovation Artifacts (technical diagrams)
   Layer 4 — Idea Evolution Engine (particle flow paths)
   Layer 5 — Signature Patent Formation Effect (blueprint assembly)
   Easter Egg — The number "4" forming from constellation nodes
   ======================================================================== */

// ─── Types ──────────────────────────────────────────────────────────────

interface Point { x: number; y: number }

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  targetX: number | null;
  targetY: number | null;
}

interface KnowledgeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  category: string;
  radius: number;
}

interface FloatingArtifact {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  scale: number;
  opacity: number;
  type: number;
  depth: number;
}

interface EvolutionParticle {
  progress: number;
  speed: number;
  pathIdx: number;
  size: number;
  opacity: number;
}

interface FormationState {
  active: boolean;
  type: 'four' | 'blueprint';
  phase: 'forming' | 'holding' | 'dispersing';
  phaseStart: number;
  indices: number[];
  targets: Point[];
}

interface AnimationData {
  nodes: ConstellationNode[];
  knowledge: KnowledgeNode[];
  artifacts: FloatingArtifact[];
  particles: EvolutionParticle[];
  formation: FormationState;
  intensity: { c: number; k: number; a: number; p: number; b: number };
  startTime: number;
  nextFourTime: number;
  nextBlueprintTime: number;
  w: number;
  h: number;
  time: number;
}

// ─── Constants ──────────────────────────────────────────────────────────

const TAU = Math.PI * 2;
const GOLD_R = 201, GOLD_G = 162, GOLD_B = 39;
const gold = (a: number): string => `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${a})`;

const CONN_DIST = 150;
const KNOW_CONN_DIST = 200;

const FORM_DUR = 5500;
const HOLD_DUR = 4000;
const DISPERSE_DUR = 5500;
const FIRST_FOUR_DELAY = 25000;

// Knowledge graph labels — drawn from actual portfolio content
const LABELS = [
  'V.E.C.T.O.R', 'Fraud Detection', 'eDNA Analysis', 'Urban Planning',
  'Meeting AI', 'KYC Systems', 'Causal Inference', 'Pathfinding',
  'FAISS', 'Real-time ML', 'Patents', 'Deep Learning',
  'Computer Vision', 'NLP', 'Cloud Architecture', 'Streaming',
  'Anomaly Detection', 'Clustering', 'RAG Pipelines', 'System Design',
  'Innovation', 'Research',
];

const CATEGORIES = [
  'patent', 'research', 'project', 'domain', 'project', 'project',
  'research', 'project', 'technology', 'technology', 'patent', 'technology',
  'technology', 'technology', 'domain', 'technology', 'research', 'technology',
  'technology', 'domain', 'patent', 'research',
];

// ── Number "4" easter egg — normalized target positions ──
const FOUR: Point[] = [
  // Left vertical stroke (top → junction)
  { x: 0.43, y: 0.26 }, { x: 0.43, y: 0.32 }, { x: 0.43, y: 0.38 },
  { x: 0.43, y: 0.44 }, { x: 0.43, y: 0.50 }, { x: 0.43, y: 0.56 },
  // Horizontal bar (left → right)
  { x: 0.48, y: 0.56 }, { x: 0.53, y: 0.56 }, { x: 0.58, y: 0.56 },
  // Right vertical stroke (full height)
  { x: 0.58, y: 0.26 }, { x: 0.58, y: 0.32 }, { x: 0.58, y: 0.38 },
  { x: 0.58, y: 0.44 }, { x: 0.58, y: 0.50 },
  { x: 0.58, y: 0.62 }, { x: 0.58, y: 0.68 }, { x: 0.58, y: 0.74 },
];

const FOUR_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],    // left stroke
  [5, 6], [6, 7], [7, 8],                      // horizontal bar
  [9, 10], [10, 11], [11, 12], [12, 13],       // right stroke top
  [13, 8], [8, 14], [14, 15], [15, 16],        // right stroke through junction
];

// ── Patent blueprint — normalized target positions ──
const BLUEPRINT: Point[] = [
  // Outer frame (clockwise from top-left)
  { x: 0.22, y: 0.22 }, { x: 0.40, y: 0.22 }, { x: 0.60, y: 0.22 }, { x: 0.78, y: 0.22 },
  { x: 0.78, y: 0.38 }, { x: 0.78, y: 0.54 }, { x: 0.78, y: 0.70 }, { x: 0.78, y: 0.78 },
  { x: 0.60, y: 0.78 }, { x: 0.40, y: 0.78 }, { x: 0.22, y: 0.78 },
  { x: 0.22, y: 0.70 }, { x: 0.22, y: 0.54 }, { x: 0.22, y: 0.38 },
  // Inner system diagram (3×3 grid)
  { x: 0.36, y: 0.35 }, { x: 0.50, y: 0.32 }, { x: 0.64, y: 0.35 },
  { x: 0.36, y: 0.50 }, { x: 0.50, y: 0.50 }, { x: 0.64, y: 0.50 },
  { x: 0.36, y: 0.65 }, { x: 0.50, y: 0.65 }, { x: 0.64, y: 0.65 },
  // Title block corner
  { x: 0.60, y: 0.72 }, { x: 0.76, y: 0.72 },
  { x: 0.60, y: 0.76 }, { x: 0.76, y: 0.76 },
  // Dimension markers
  { x: 0.18, y: 0.35 }, { x: 0.18, y: 0.65 },
  { x: 0.36, y: 0.18 }, { x: 0.64, y: 0.18 },
];

const BLUEPRINT_EDGES: [number, number][] = [
  // Frame
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 0],
  // Inner grid
  [14, 15], [15, 16], [14, 17], [15, 18], [16, 19],
  [17, 18], [18, 19], [17, 20], [18, 21], [19, 22],
  [20, 21], [21, 22],
  // Title block
  [23, 24], [23, 25], [24, 26], [25, 26],
  // Dimension lines
  [27, 28], [29, 30],
];

// ── Idea evolution paths (cubic bezier control points) ──
const EVO_PATHS: Point[][] = [
  [{ x: 0.04, y: 0.18 }, { x: 0.28, y: 0.06 }, { x: 0.72, y: 0.88 }, { x: 0.96, y: 0.72 }],
  [{ x: 0.06, y: 0.92 }, { x: 0.34, y: 0.55 }, { x: 0.66, y: 0.32 }, { x: 0.94, y: 0.10 }],
  [{ x: 0.02, y: 0.52 }, { x: 0.26, y: 0.24 }, { x: 0.74, y: 0.76 }, { x: 0.98, y: 0.48 }],
  [{ x: 0.10, y: 0.35 }, { x: 0.40, y: 0.80 }, { x: 0.60, y: 0.15 }, { x: 0.90, y: 0.60 }],
];

// ── Section-based layer intensity configuration ──
// c = constellation, k = knowledge, a = artifacts, p = particles, b = blueprint
const SEC: Record<string, { c: number; k: number; a: number; p: number; b: number }> = {
  hero:      { c: 1.0, k: 0.6, a: 0.5, p: 0.7, b: 0.3 },
  metrics:   { c: 0.8, k: 0.7, a: 0.5, p: 0.8, b: 0.3 },
  patents:   { c: 0.6, k: 0.5, a: 0.3, p: 0.5, b: 1.0 },
  projects:  { c: 0.7, k: 0.6, a: 1.0, p: 0.6, b: 0.4 },
  research:  { c: 0.5, k: 1.0, a: 0.6, p: 0.8, b: 0.3 },
  expertise: { c: 0.7, k: 0.8, a: 0.7, p: 0.5, b: 0.3 },
  timeline:  { c: 1.0, k: 0.5, a: 0.4, p: 0.6, b: 0.2 },
  contact:   { c: 0.6, k: 0.4, a: 0.3, p: 0.5, b: 0.2 },
};

// ─── Math Utilities ─────────────────────────────────────────────────────

const rand = (min: number, max: number): number => min + Math.random() * (max - min);

const distSq = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x1 - x2, dy = y1 - y2;
  return dx * dx + dy * dy;
};

const distAbs = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.sqrt(distSq(x1, y1, x2, y2));

function cubicBezier(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const u = 1 - t;
  const uu = u * u, uuu = uu * u;
  const tt = t * t, ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

function getCounts(w: number) {
  if (w < 768) return { nodes: 40, know: 8, art: 3, part: 12 };
  if (w < 1200) return { nodes: 55, know: 14, art: 5, part: 20 };
  return { nodes: 75, know: 22, art: 8, part: 30 };
}

// ─── Artifact Drawing Functions ─────────────────────────────────────────
// Each draws a technical diagram centered at (0,0). The caller handles
// translate, rotate, scale, and globalAlpha.

function drawPatent(ctx: CanvasRenderingContext2D, s: number) {
  const w = 50 * s, h = 65 * s;
  ctx.strokeRect(-w / 2, -h / 2, w, h);
  // Title bar
  ctx.strokeRect(-w / 2 + 3 * s, -h / 2 + 3 * s, w - 6 * s, 6 * s);
  // Figure area
  ctx.strokeRect(-w / 2 + 6 * s, -h / 2 + 12 * s, w - 12 * s, h * 0.4);
  // Technical sketch inside figure
  ctx.beginPath();
  ctx.moveTo(-8 * s, -h / 2 + 16 * s);
  ctx.lineTo(0, -h / 2 + 26 * s);
  ctx.lineTo(8 * s, -h / 2 + 16 * s);
  ctx.lineTo(8 * s, -h / 2 + 36 * s);
  ctx.lineTo(-8 * s, -h / 2 + 36 * s);
  ctx.closePath();
  ctx.stroke();
  // Claim text lines
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const y = h / 2 - 16 * s + i * 3.5 * s;
    ctx.moveTo(-w / 2 + 5 * s, y);
    ctx.lineTo(w / 2 - 5 * s, y);
  }
  ctx.stroke();
}

function drawNeuralNet(ctx: CanvasRenderingContext2D, s: number) {
  const layers = [3, 5, 4, 3];
  const layerX = [-25 * s, -8 * s, 8 * s, 25 * s];
  const positions: Point[][] = [];

  for (let l = 0; l < layers.length; l++) {
    positions[l] = [];
    const n = layers[l];
    for (let i = 0; i < n; i++) {
      positions[l].push({ x: layerX[l], y: (i - (n - 1) / 2) * 10 * s });
    }
  }
  // Connections between layers
  ctx.beginPath();
  for (let l = 0; l < layers.length - 1; l++) {
    for (const p1 of positions[l]) {
      for (const p2 of positions[l + 1]) {
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
    }
  }
  ctx.stroke();
  // Neuron circles
  for (const layer of positions) {
    for (const p of layer) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5 * s, 0, TAU);
      ctx.stroke();
    }
  }
}

function drawArchitecture(ctx: CanvasRenderingContext2D, s: number) {
  const boxes: [number, number, number, number][] = [
    [-20 * s, -28 * s, 16 * s, 10 * s],
    [6 * s, -28 * s, 16 * s, 10 * s],
    [-7 * s, -8 * s, 16 * s, 10 * s],
    [-20 * s, 12 * s, 16 * s, 10 * s],
    [6 * s, 12 * s, 16 * s, 10 * s],
  ];
  for (const [bx, by, bw, bh] of boxes) ctx.strokeRect(bx, by, bw, bh);
  ctx.beginPath();
  ctx.moveTo(-12 * s, -18 * s); ctx.lineTo(-1 * s, -8 * s);
  ctx.moveTo(14 * s, -18 * s); ctx.lineTo(7 * s, -8 * s);
  ctx.moveTo(-1 * s, 2 * s); ctx.lineTo(-12 * s, 12 * s);
  ctx.moveTo(7 * s, 2 * s); ctx.lineTo(14 * s, 12 * s);
  ctx.stroke();
}

function drawFlowchart(ctx: CanvasRenderingContext2D, s: number) {
  // Decision diamond
  ctx.beginPath();
  ctx.moveTo(0, -28 * s); ctx.lineTo(15 * s, -15 * s);
  ctx.lineTo(0, -2 * s); ctx.lineTo(-15 * s, -15 * s);
  ctx.closePath();
  ctx.stroke();
  // Process rectangles
  ctx.strokeRect(-18 * s, 5 * s, 14 * s, 8 * s);
  ctx.strokeRect(4 * s, 5 * s, 14 * s, 8 * s);
  // Terminal ellipse
  ctx.beginPath();
  ctx.ellipse(0, 25 * s, 12 * s, 6 * s, 0, 0, TAU);
  ctx.stroke();
  // Flow arrows
  ctx.beginPath();
  ctx.moveTo(-8 * s, -2 * s); ctx.lineTo(-11 * s, 5 * s);
  ctx.moveTo(8 * s, -2 * s); ctx.lineTo(11 * s, 5 * s);
  ctx.moveTo(-11 * s, 13 * s); ctx.lineTo(-5 * s, 19 * s);
  ctx.moveTo(11 * s, 13 * s); ctx.lineTo(5 * s, 19 * s);
  ctx.stroke();
}

function drawNotebook(ctx: CanvasRenderingContext2D, s: number) {
  ctx.strokeRect(-28 * s, -20 * s, 25 * s, 40 * s);
  ctx.strokeRect(3 * s, -20 * s, 25 * s, 40 * s);
  ctx.beginPath();
  ctx.moveTo(0, -20 * s); ctx.lineTo(0, 20 * s);
  ctx.stroke();
  // Text lines
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.moveTo(-25 * s, -14 * s + i * 6 * s);
    ctx.lineTo(-6 * s, -14 * s + i * 6 * s);
  }
  ctx.stroke();
  // Data scatter on right page
  const pts = [[8, -10], [13, -6], [15, -12], [20, -3], [24, -8],
    [10, 5], [16, 2], [21, 7], [14, 10], [22, 12]];
  for (const [px, py] of pts) {
    ctx.beginPath();
    ctx.arc(px * s, py * s, 1.2 * s, 0, TAU);
    ctx.fill();
  }
}

function drawSchematic(ctx: CanvasRenderingContext2D, s: number) {
  const gridSize = 4, spacing = 12 * s;
  const offset = -(gridSize - 1) * spacing / 2;
  // Component nodes
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      ctx.beginPath();
      ctx.arc(offset + i * spacing, offset + j * spacing, 1.5 * s, 0, TAU);
      ctx.fill();
    }
  }
  // PCB traces
  ctx.beginPath();
  for (let i = 0; i < gridSize - 1; i++) {
    for (let j = 0; j < gridSize; j++) {
      if ((i + j) % 2 === 0) {
        ctx.moveTo(offset + i * spacing, offset + j * spacing);
        ctx.lineTo(offset + (i + 1) * spacing, offset + j * spacing);
      }
    }
  }
  for (let j = 0; j < gridSize - 1; j++) {
    for (let i = 0; i < gridSize; i++) {
      if ((i + j) % 2 === 1) {
        ctx.moveTo(offset + i * spacing, offset + j * spacing);
        ctx.lineTo(offset + i * spacing, offset + (j + 1) * spacing);
      }
    }
  }
  ctx.stroke();
}

function drawCircuit(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(-30 * s, 0); ctx.lineTo(-15 * s, 0);
  // Resistor zigzag
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(-12 * s + i * 6 * s, (i % 2 === 0 ? -5 : 5) * s);
  }
  ctx.lineTo(18 * s, 0); ctx.lineTo(30 * s, 0);
  ctx.stroke();
  // Capacitor
  ctx.beginPath();
  ctx.moveTo(0, -20 * s); ctx.lineTo(0, -8 * s);
  ctx.moveTo(-8 * s, -8 * s); ctx.lineTo(8 * s, -8 * s);
  ctx.moveTo(-8 * s, -4 * s); ctx.lineTo(8 * s, -4 * s);
  ctx.moveTo(0, -4 * s); ctx.lineTo(0, 8 * s);
  ctx.stroke();
  // Ground symbol
  ctx.beginPath();
  ctx.moveTo(0, 8 * s); ctx.lineTo(0, 12 * s);
  ctx.moveTo(-8 * s, 12 * s); ctx.lineTo(8 * s, 12 * s);
  ctx.moveTo(-5 * s, 15 * s); ctx.lineTo(5 * s, 15 * s);
  ctx.moveTo(-2 * s, 18 * s); ctx.lineTo(2 * s, 18 * s);
  ctx.stroke();
}

function drawDataViz(ctx: CanvasRenderingContext2D, s: number) {
  // Axes
  ctx.beginPath();
  ctx.moveTo(-25 * s, -20 * s); ctx.lineTo(-25 * s, 20 * s); ctx.lineTo(25 * s, 20 * s);
  ctx.stroke();
  // Bar chart
  const bars = [8, 15, 12, 20, 10, 17, 14];
  ctx.beginPath();
  for (let i = 0; i < bars.length; i++) {
    const x = -22 * s + i * 7 * s, bh = bars[i] * s;
    ctx.moveTo(x, 20 * s); ctx.lineTo(x, 20 * s - bh);
    ctx.lineTo(x + 5 * s, 20 * s - bh); ctx.lineTo(x + 5 * s, 20 * s);
  }
  ctx.stroke();
  // Trend line
  ctx.beginPath();
  ctx.moveTo(-22 * s, 12 * s);
  ctx.quadraticCurveTo(0, -15 * s, 22 * s, 5 * s);
  ctx.stroke();
}

const DRAW_FNS = [
  drawPatent, drawNeuralNet, drawArchitecture, drawFlowchart,
  drawNotebook, drawSchematic, drawCircuit, drawDataViz,
];

// ─── Component ──────────────────────────────────────────────────────────

interface InnovationBackgroundProps {
  activeSection?: string;
}

const InnovationBackground: React.FC<InnovationBackgroundProps> = ({
  activeSection = 'hero',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const sectionRef = useRef(activeSection);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dataRef = useRef<AnimationData | null>(null);

  // Keep section ref in sync with prop
  useEffect(() => {
    sectionRef.current = activeSection;
  }, [activeSection]);

  // ── Main animation lifecycle ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;

    // ── Canvas DPR setup ──
    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // ── Initialize all entities ──
    const init = () => {
      const counts = getCounts(w);
      const now = Date.now();

      const nodes: ConstellationNode[] = [];
      for (let i = 0; i < counts.nodes; i++) {
        nodes.push({
          x: rand(0, w), y: rand(0, h),
          vx: rand(-0.12, 0.12), vy: rand(-0.12, 0.12),
          radius: rand(1.2, 2.8),
          pulsePhase: rand(0, TAU),
          pulseSpeed: rand(0.008, 0.025),
          targetX: null, targetY: null,
        });
      }

      const knowledge: KnowledgeNode[] = [];
      for (let i = 0; i < counts.know; i++) {
        knowledge.push({
          x: rand(80, w - 80), y: rand(80, h - 80),
          vx: rand(-0.06, 0.06), vy: rand(-0.06, 0.06),
          label: LABELS[i % LABELS.length],
          category: CATEGORIES[i % CATEGORIES.length],
          radius: rand(3, 5),
        });
      }

      const artifacts: FloatingArtifact[] = [];
      for (let i = 0; i < counts.art; i++) {
        artifacts.push({
          x: rand(100, w - 100), y: rand(100, h - 100),
          vx: rand(-0.05, 0.05), vy: rand(-0.05, 0.05),
          rotation: rand(0, TAU),
          rotSpeed: rand(-0.0006, 0.0006),
          scale: rand(0.6, 1.0),
          opacity: rand(0.04, 0.08),
          type: i % DRAW_FNS.length,
          depth: rand(0.3, 1.0),
        });
      }

      const particles: EvolutionParticle[] = [];
      for (let i = 0; i < counts.part; i++) {
        particles.push({
          progress: rand(0, 1),
          speed: rand(0.00025, 0.0008),
          pathIdx: Math.floor(rand(0, EVO_PATHS.length)),
          size: rand(1, 2.2),
          opacity: rand(0.10, 0.25),
        });
      }

      dataRef.current = {
        nodes, knowledge, artifacts, particles,
        formation: {
          active: false, type: 'four', phase: 'forming',
          phaseStart: 0, indices: [], targets: [],
        },
        intensity: { ...SEC.hero },
        startTime: now,
        nextFourTime: now + FIRST_FOUR_DELAY,
        nextBlueprintTime: now + rand(180000, 240000),
        w, h, time: 0,
      };
    };

    // ── Start a formation effect ──
    const startFormation = (type: 'four' | 'blueprint') => {
      const d = dataRef.current;
      if (!d) return;

      const pattern = type === 'four' ? FOUR : BLUEPRINT;
      const indices: number[] = [];
      const used = new Set<number>();
      const targets: Point[] = [];

      for (const pt of pattern) {
        const tx = pt.x * w, ty = pt.y * h;
        let bestIdx = -1, bestDist = Infinity;

        for (let i = 0; i < d.nodes.length; i++) {
          if (used.has(i)) continue;
          const dd = distSq(d.nodes[i].x, d.nodes[i].y, tx, ty);
          if (dd < bestDist) { bestDist = dd; bestIdx = i; }
        }

        if (bestIdx >= 0) {
          used.add(bestIdx);
          indices.push(bestIdx);
          targets.push({ x: tx, y: ty });
          d.nodes[bestIdx].targetX = tx;
          d.nodes[bestIdx].targetY = ty;
        }
      }

      d.formation = {
        active: true, type, phase: 'forming',
        phaseStart: Date.now(), indices, targets,
      };
    };

    // ── Update all entities ──
    const update = (dt: number) => {
      const d = dataRef.current;
      if (!d) return;
      d.time += dt;

      // Smoothly interpolate section intensity
      const target = SEC[sectionRef.current] || SEC.hero;
      const lr = 0.02 * dt;
      d.intensity.c += (target.c - d.intensity.c) * lr;
      d.intensity.k += (target.k - d.intensity.k) * lr;
      d.intensity.a += (target.a - d.intensity.a) * lr;
      d.intensity.p += (target.p - d.intensity.p) * lr;
      d.intensity.b += (target.b - d.intensity.b) * lr;

      // ── Constellation nodes ──
      for (const node of d.nodes) {
        if (node.targetX !== null && node.targetY !== null) {
          // Ease toward formation target
          node.x += (node.targetX - node.x) * 0.016 * dt;
          node.y += (node.targetY - node.y) * 0.016 * dt;
        } else {
          node.x += node.vx * dt;
          node.y += node.vy * dt;
        }
        node.pulsePhase += node.pulseSpeed * dt;
        // Wrap edges
        if (node.x < -30) node.x = w + 30;
        if (node.x > w + 30) node.x = -30;
        if (node.y < -30) node.y = h + 30;
        if (node.y > h + 30) node.y = -30;
      }

      // ── Knowledge nodes ──
      for (const kn of d.knowledge) {
        kn.x += kn.vx * dt;
        kn.y += kn.vy * dt;
        if (kn.x < 70 || kn.x > w - 70) kn.vx *= -1;
        if (kn.y < 70 || kn.y > h - 70) kn.vy *= -1;
        kn.x = Math.max(70, Math.min(w - 70, kn.x));
        kn.y = Math.max(70, Math.min(h - 70, kn.y));
      }

      // ── Floating artifacts ──
      for (const art of d.artifacts) {
        art.x += art.vx * dt;
        art.y += art.vy * dt;
        art.rotation += art.rotSpeed * dt;
        if (art.x < -100 || art.x > w + 100) art.vx *= -1;
        if (art.y < -100 || art.y > h + 100) art.vy *= -1;
      }

      // ── Evolution particles ──
      for (const pt of d.particles) {
        pt.progress += pt.speed * dt;
        if (pt.progress > 1) {
          pt.progress = 0;
          pt.pathIdx = Math.floor(rand(0, EVO_PATHS.length));
          pt.speed = rand(0.00025, 0.0008);
        }
      }

      // ── Formation state machine ──
      const now = Date.now();
      if (d.formation.active) {
        const elapsed = now - d.formation.phaseStart;
        if (d.formation.phase === 'forming' && elapsed > FORM_DUR) {
          d.formation.phase = 'holding';
          d.formation.phaseStart = now;
        } else if (d.formation.phase === 'holding' && elapsed > HOLD_DUR) {
          d.formation.phase = 'dispersing';
          d.formation.phaseStart = now;
          // Release nodes back to free drift
          for (const idx of d.formation.indices) {
            d.nodes[idx].targetX = null;
            d.nodes[idx].targetY = null;
          }
        } else if (d.formation.phase === 'dispersing' && elapsed > DISPERSE_DUR) {
          d.formation.active = false;
        }
      } else {
        // Trigger new formations on schedule
        if (now > d.nextFourTime) {
          startFormation('four');
          d.nextFourTime = now + rand(90000, 130000);
        } else if (now > d.nextBlueprintTime) {
          startFormation('blueprint');
          d.nextBlueprintTime = now + rand(180000, 260000);
        }
      }
    };

    // ── Render all layers ──
    const render = () => {
      const d = dataRef.current;
      if (!d) return;
      ctx.clearRect(0, 0, w, h);

      const time = d.time;
      const int = d.intensity;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const CONN_DIST_SQ = CONN_DIST * CONN_DIST;
      const KNOW_CONN_DIST_SQ = KNOW_CONN_DIST * KNOW_CONN_DIST;

      // ── Ambient center glow ──
      const ambientGrad = ctx.createRadialGradient(
        w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.55
      );
      ambientGrad.addColorStop(0, gold(0.025));
      ambientGrad.addColorStop(0.6, gold(0.008));
      ambientGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, w, h);

      // ═══════════════════════════════════════════
      // LAYER 1 — Innovation Constellation
      // ═══════════════════════════════════════════

      // Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < d.nodes.length; i++) {
        const ni = d.nodes[i];
        for (let j = i + 1; j < d.nodes.length; j++) {
          const nj = d.nodes[j];
          const dSq = distSq(ni.x, ni.y, nj.x, nj.y);
          if (dSq < CONN_DIST_SQ) {
            const dd = Math.sqrt(dSq);
            const a = (1 - dd / CONN_DIST) * 0.10 * int.c;
            if (a < 0.008) continue;
            ctx.strokeStyle = gold(a);
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.stroke();
          }
        }
      }

      // Nodes with pulsing glow
      for (const node of d.nodes) {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.5 + 0.5;
        const a = (0.10 + pulse * 0.22) * int.c;
        const r = node.radius * (0.8 + pulse * 0.4);

        // Outer glow
        ctx.fillStyle = gold(a * 0.15);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3.5, 0, TAU);
        ctx.fill();

        // Core dot
        ctx.fillStyle = gold(a);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, TAU);
        ctx.fill();
      }

      // ═══════════════════════════════════════════
      // LAYER 4 — Idea Evolution Engine
      // ═══════════════════════════════════════════

      for (const pt of d.particles) {
        const path = EVO_PATHS[pt.pathIdx];
        const pos = cubicBezier(pt.progress, path[0], path[1], path[2], path[3]);
        const px = pos.x * w, py = pos.y * h;
        // Fade at start and end of path
        const fadeInOut = Math.sin(pt.progress * Math.PI);
        const a = pt.opacity * int.p * fadeInOut;
        if (a < 0.008) continue;

        // Particle trail
        for (let t = 1; t <= 3; t++) {
          const prevT = Math.max(0, pt.progress - 0.007 * t);
          const prevPos = cubicBezier(prevT, path[0], path[1], path[2], path[3]);
          ctx.fillStyle = gold(a * (0.4 - t * 0.1));
          ctx.beginPath();
          ctx.arc(prevPos.x * w, prevPos.y * h, pt.size * 0.5, 0, TAU);
          ctx.fill();
        }

        // Main particle
        ctx.fillStyle = gold(a);
        ctx.beginPath();
        ctx.arc(px, py, pt.size, 0, TAU);
        ctx.fill();
      }

      // ═══════════════════════════════════════════
      // LAYER 3 — Floating Innovation Artifacts
      // ═══════════════════════════════════════════

      for (const art of d.artifacts) {
        const a = art.opacity * int.a;
        if (a < 0.008) continue;

        // Mouse-driven parallax
        const parallaxX = (mx !== -9999 ? (mx - w / 2) : 0) * art.depth * 0.006;
        const parallaxY = (my !== -9999 ? (my - h / 2) : 0) * art.depth * 0.006;

        ctx.save();
        ctx.translate(art.x + parallaxX, art.y + parallaxY);
        ctx.rotate(art.rotation);
        ctx.globalAlpha = a;
        ctx.strokeStyle = gold(1);
        ctx.fillStyle = gold(0.8);
        ctx.lineWidth = 0.6;
        DRAW_FNS[art.type](ctx, art.scale);
        ctx.restore();
      }

      // ═══════════════════════════════════════════
      // LAYER 2 — Living Knowledge Graph
      // ═══════════════════════════════════════════

      // Animated dashed connections
      ctx.lineWidth = 0.6;
      const dashOffset = -time * 0.25;
      ctx.setLineDash([3, 7]);
      ctx.lineDashOffset = dashOffset;

      for (let i = 0; i < d.knowledge.length; i++) {
        const ki = d.knowledge[i];
        for (let j = i + 1; j < d.knowledge.length; j++) {
          const kj = d.knowledge[j];
          const dSq = distSq(ki.x, ki.y, kj.x, kj.y);
          if (dSq < KNOW_CONN_DIST_SQ) {
            const dd = Math.sqrt(dSq);
            let a = (1 - dd / KNOW_CONN_DIST) * 0.07 * int.k;

            // Brighten pathways near mouse cursor
            const midX = (ki.x + kj.x) / 2, midY = (ki.y + kj.y) / 2;
            const mDist = distAbs(mx, my, midX, midY);
            if (mDist < 200) a += (1 - mDist / 200) * 0.06;

            if (a < 0.008) continue;
            ctx.strokeStyle = gold(a);
            ctx.beginPath();
            ctx.moveTo(ki.x, ki.y);
            ctx.lineTo(kj.x, kj.y);
            ctx.stroke();
          }
        }
      }
      ctx.setLineDash([]);

      // Knowledge nodes with hover illumination
      for (const kn of d.knowledge) {
        const mDist = distAbs(mx, my, kn.x, kn.y);
        const mouseBoost = mDist < 180 ? (1 - mDist / 180) * 0.2 : 0;
        const a = (0.12 + mouseBoost) * int.k;

        // Glow halo
        ctx.fillStyle = gold(a * 0.12);
        ctx.beginPath();
        ctx.arc(kn.x, kn.y, kn.radius * 4.5, 0, TAU);
        ctx.fill();

        // Node core
        ctx.fillStyle = gold(a);
        ctx.beginPath();
        ctx.arc(kn.x, kn.y, kn.radius, 0, TAU);
        ctx.fill();
      }

      // Knowledge labels — appear when layer is prominent
      if (int.k > 0.4) {
        ctx.save();
        ctx.font = '9px Inter, system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        for (const kn of d.knowledge) {
          const mDist = distAbs(mx, my, kn.x, kn.y);
          const mouseBoost = mDist < 180 ? (1 - mDist / 180) * 0.12 : 0;
          const a = (0.06 + mouseBoost) * int.k;
          if (a < 0.015) continue;
          ctx.fillStyle = gold(a);
          ctx.fillText(kn.label, kn.x, kn.y + kn.radius + 10);
        }
        ctx.restore();
      }

      // ═══════════════════════════════════════════
      // LAYER 5 — Formation Effects (Blueprint + "4")
      // ═══════════════════════════════════════════

      if (d.formation.active) {
        const elapsed = Date.now() - d.formation.phaseStart;
        let opacity = 0;

        if (d.formation.phase === 'forming') {
          opacity = Math.min(1, elapsed / FORM_DUR) * 0.30;
        } else if (d.formation.phase === 'holding') {
          // Gentle pulse during hold
          const pulse = Math.sin(Date.now() * 0.003) * 0.04;
          opacity = 0.30 + pulse;
        } else if (d.formation.phase === 'dispersing') {
          opacity = (1 - Math.min(1, elapsed / DISPERSE_DUR)) * 0.30;
        }

        if (opacity > 0.008) {
          const edges = d.formation.type === 'four' ? FOUR_EDGES : BLUEPRINT_EDGES;

          // Connecting edges
          ctx.strokeStyle = gold(opacity);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          for (const [a, b] of edges) {
            if (a < d.formation.indices.length && b < d.formation.indices.length) {
              const na = d.nodes[d.formation.indices[a]];
              const nb = d.nodes[d.formation.indices[b]];
              ctx.moveTo(na.x, na.y);
              ctx.lineTo(nb.x, nb.y);
            }
          }
          ctx.stroke();

          // Enhanced node glow during formation
          for (const idx of d.formation.indices) {
            const node = d.nodes[idx];
            ctx.fillStyle = gold(opacity * 0.4);
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 3, 0, TAU);
            ctx.fill();
            ctx.fillStyle = gold(opacity * 1.2);
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 1.6, 0, TAU);
            ctx.fill();
          }

          // Subtle radial glow behind the formation during hold
          if (d.formation.phase === 'holding' && d.formation.targets.length > 0) {
            let cx = 0, cy = 0;
            for (const t of d.formation.targets) { cx += t.x; cy += t.y; }
            cx /= d.formation.targets.length;
            cy /= d.formation.targets.length;

            const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 250);
            glowGrad.addColorStop(0, gold(0.04));
            glowGrad.addColorStop(1, gold(0));
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 250, 0, TAU);
            ctx.fill();
          }
        }
      }
    };

    // ── Animation loop ──
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (lastTimestamp === 0) lastTimestamp = timestamp;
      const rawDt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      // Normalize to ~60fps baseline, cap to prevent large jumps
      const dt = Math.min(rawDt, 50) / 16.67;

      if (!document.hidden) {
        update(dt);
        render();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    // ── Event handlers ──
    const onResize = () => {
      setupCanvas();
      if (dataRef.current) {
        dataRef.current.w = w;
        dataRef.current.h = h;
      }
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // ── Start everything ──
    setupCanvas();
    init();
    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      id="innovation-universe"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default InnovationBackground;
