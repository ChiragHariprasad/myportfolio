import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/portfolio.css';

interface Milestone {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'patent' | 'internship' | 'leadership' | 'research' | 'education';
  major: boolean;
  x: number;
  y: number;
}

const DATA: Milestone[] = [
  { date:'31 Aug 2021 – May 2024', title:'SJP - Sri Jayachamarajendra Government Polytechnic', subtitle:'Diploma in Engineering', description:'Completed polytechnic education forming the engineering foundation.', category:'education', major:false, x:50, y:600 },
  { date:'15 Jan – 4 Feb 2024', title:'Globle Tech Fortune Industries', subtitle:'Quality Assurance Intern', description:'Quality assurance engineering internship gaining industrial experience in manufacturing quality processes.', category:'internship', major:false, x:120, y:565 },
  { date:'23 Jul 2024', title:'RVCE - Rashtreeya Vidyalaya College of Engineering', subtitle:'B.E. in Computer Science & Engineering', description:'Admission into the undergraduate engineering program at RV College of Engineering, Bengaluru.', category:'education', major:false, x:185, y:535 },
  { date:'2024 – Present', title:'Intellectual Property Filing (V.E.C.T.O.R)', subtitle:'Primary Inventor - Fraud Analytics', description:'Designed and filed the patent for V.E.C.T.O.R (Velocity-Enhanced Clustering for Transactional Outlier Recognition).', category:'patent', major:true, x:250, y:500 },
  { date:'2024', title:'AI/ML Intern - IIFL Samasta', subtitle:'Strategy Team (3 Months)', description:'Delivered 2 end-to-end production AI platforms (MeetingsAI and VerifAI) as a solo developer.', category:'internship', major:false, x:315, y:462 },
  { date:'2024', title:'MeetingsAI / VerifAI System Delivery', subtitle:'Principal Architect - IIFL Samasta', description:'Enterprise meeting intelligence pipeline and high-assurance KYC document verification system.', category:'research', major:false, x:375, y:430 },
  { date:'2021 – 2024', title:'Class Representative', subtitle:'Student Leadership (3 Consecutive Years)', description:'Elected by peers to represent class interests and coordinate academic schedules.', category:'leadership', major:false, x:430, y:405 },
  { date:'3 Oct 2025', title:'V.E.C.T.O.R - Patent Published', subtitle:'Primary Inventor - Fraud Analytics', description:'Patent published for Velocity-Enhanced Clustering for Transactional Outlier Recognition. Real-time behavioral fraud detection.', category:'patent', major:true, x:500, y:355 },
  { date:'19 Nov 2025 – 13 May 2026', title:'IIFL Samasta - AIML Development Intern', subtitle:'Strategy Department', description:'Extended AIML development internship focused on deploying production AI systems for financial services.', category:'internship', major:false, x:570, y:315 },
  { date:'27 Mar 2026', title:'GENESIS - Patent Published', subtitle:'Primary Inventor - Urban AI', description:'Patent published for Generative Engine for Networked, Embedded, Spatial Infrastructure Synthesis.', category:'patent', major:true, x:660, y:250 },
  { date:'29 May 2026', title:'O.R.I.O.N. + Presentation Automation - Patents Published', subtitle:'Co-Inventor', description:'Two patents: Omni-Retail Intelligence & Ordering Network, and Context-Aware Adaptive Presentation Automation System.', category:'patent', major:true, x:770, y:180 },
  { date:'10 Jun 2026', title:'S.C.A.L.E. - IEEE Access Published', subtitle:'Lead Researcher', description:'"Unbalanced Expansion of Engineering Education in India" published in IEEE Access (Early Access). DOI: 10.1109/ACCESS.2026.3704923.', category:'patent', major:true, x:900, y:85 },
  { date:'Jun 2026', title:'PROMETHEUS - Customer Digital Twins', subtitle:'AI/ML Systems Architect', description:'AI Customer Futures platform with real-time omnichannel intelligence, churn/LTV prediction, semantic memory, and Monte Carlo simulation.', category:'research', major:false, x:1060, y:110 },
];

const CAT_COLORS: Record<string,string> = {
  patent: '#fbbf24', internship: '#34d399', research: '#60a5fa', leadership: '#f472b6', education: '#a78bfa',
};
const CAT_LABELS: Record<string,string> = {
  patent: 'Patent', internship: 'Internship', research: 'Research', leadership: 'Leadership', education: 'Education',
};

const ZONES = [
  { x:75, y:580, label:'BASE CAMP', sub:'Software Foundations', fromY:700, toY:500 },
  { x:225, y:510, label:'ASCENT RIDGE', sub:'Applied Systems', fromY:500, toY:430 },
  { x:380, y:420, label:'INVENTOR PHASE', sub:'First Filing', fromY:430, toY:390 },
  { x:570, y:340, label:'HIGH ALTITUDE', sub:'Advanced AI', fromY:390, toY:280 },
  { x:700, y:240, label:'MAJOR SUMMIT', sub:'Generative AI', fromY:280, toY:210 },
  { x:830, y:170, label:'TWIN PEAKS', sub:'Patent Complex', fromY:210, toY:140 },
  { x:970, y:95, label:'HIGHEST SUMMIT', sub:'Research Peak', fromY:140, toY:60 },
  { x:1100, y:120, label:'PLATEAU', sub:'Future Intelligence', fromY:60, toY:-10 },
];

/* ── catmull-rom → cubic bezier ── */
function cr2bezier(pts: {x:number;y:number}[]): string {
  if (pts.length < 2) return '';
  const n = pts.length;
  const segs: string[] = [];
  for (let i = 0; i < n - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[0];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i + 2 < n ? pts[i + 2] : pts[n - 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    segs.push(`${i === 0 ? `M${p1.x},${p1.y}` : ''}C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`);
  }
  return segs.join('');
}

const SMOOTH_PATH = cr2bezier(DATA);

function mountainBodyPath(d: string, bottomY = 700): string {
  const last = DATA[DATA.length - 1];
  const first = DATA[0];
  return `${d} L${last.x + 80},${bottomY} L${first.x - 80},${bottomY} Z`;
}

const BODY_PATH = mountainBodyPath(SMOOTH_PATH);

const TimelineMountain: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltip, setTooltip] = useState<{ m: Milestone; x: number; y: number } | null>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* animate trail drawing */
  useEffect(() => {
    if (!isVisible || !trailRef.current) return;
    const len = trailRef.current.getTotalLength();
    const start = performance.now();
    const dur = 2200;
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimProgress(eased);
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isVisible]);

  const handleMove = useCallback((m: Milestone, e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTooltip({ m, x: r.left + r.width / 2, y: r.top });
  }, []);

  const handleLeave = useCallback(() => setTooltip(null), []);

  const majorIndices = DATA.reduce((acc, m, i) => (m.major ? [...acc, i] : acc), [] as number[]);

  function milestoneMarker(m: Milestone, i: number) {
    const col = CAT_COLORS[m.category];
    const isPatentSummit = m.major && m.category === 'patent';
    const isIEEE = m.title.startsWith('S.C.A.L.E.');
    const isFuture = m.title.startsWith('PROMETHEUS');
    const isFirst = m.title.startsWith('S.J.P');
    const sz = isIEEE ? 18 : isPatentSummit ? 14 : isFuture ? 10 : m.category === 'education' ? 8 : 9;

    if (isFirst) {
      return (
        <g>
          <path d={`M${m.x},${m.y+sz} L${m.x-sz*1.2},${m.y+sz-1} L${m.x-sz*0.6},${m.y} L${m.x},${m.y-sz*0.3} L${m.x+sz*0.6},${m.y} L${m.x+sz*1.2},${m.y+sz-1} Z`} fill={col} opacity={0.8} />
          <circle cx={m.x} cy={m.y - 2} r={3} fill="rgba(255,255,255,0.6)" />
        </g>
      );
    }

    if (isFuture) {
      return (
        <g>
          <rect x={m.x - sz} y={m.y - sz} width={sz * 2} height={sz * 1.8} rx={3} fill="rgba(196,132,252,0.15)" stroke="rgba(196,132,252,0.35)" strokeWidth={1} strokeDasharray="3 2" />
          <text x={m.x} y={m.y + 2} fontSize={7} fill="rgba(196,132,252,0.5)" textAnchor="middle">∞</text>
        </g>
      );
    }

    if (isIEEE) {
      return (
        <g className="mt-glow-plat">
          <circle cx={m.x} cy={m.y} r={18} fill="#94a3f8" opacity={0.12} className="mt-pulse-plat" />
          <circle cx={m.x} cy={m.y} r={8} fill="none" stroke="#94a3f8" strokeWidth={2} opacity={0.6} />
          <polygon points={`${m.x},${m.y-sz} ${m.x+sz*0.8},${m.y+sz*0.3} ${m.x+sz*0.3},${m.y+sz*0.7} ${m.x-sz*0.3},${m.y+sz*0.7} ${m.x-sz*0.8},${m.y+sz*0.3}`} fill="#94a3f8" opacity={0.95} stroke="#c084fc" strokeWidth={2} />
          <polygon points={`${m.x},${m.y-sz+8} ${m.x+sz*0.45},${m.y+sz*0.1} ${m.x-sz*0.45},${m.y+sz*0.1}`} fill="rgba(255,255,255,0.3)" />
          <circle cx={m.x} cy={m.y - 5} r={6} fill="rgba(255,255,255,0.6)" />
          <text x={m.x} y={m.y - 28} className="mt-banner-text" textAnchor="middle" fill="#94a3f8">IEEE PUBLISHED RESEARCHER</text>
        </g>
      );
    }

    if (isPatentSummit) {
      return (
        <g className="mt-glow-gold">
          <circle cx={m.x} cy={m.y} r={14} fill={col} opacity={0.15} className="mt-pulse-gold" />
          <polygon points={`${m.x},${m.y-sz} ${m.x+sz*0.75},${m.y+sz*0.35} ${m.x+sz*0.3},${m.y+sz*0.7} ${m.x-sz*0.3},${m.y+sz*0.7} ${m.x-sz*0.75},${m.y+sz*0.35}`} fill={col} opacity={0.9} stroke={col} strokeWidth={1.5} />
          <polygon points={`${m.x},${m.y-sz+6} ${m.x+sz*0.4},${m.y+sz*0.1} ${m.x-sz*0.4},${m.y+sz*0.1}`} fill="rgba(255,255,255,0.25)" />
          <circle cx={m.x} cy={m.y - 4} r={5} fill="rgba(255,255,255,0.5)" />
        </g>
      );
    }

    /* default - camp/tent marker */
    return (
      <g>
        <polygon points={`${m.x},${m.y-sz} ${m.x+sz*0.8},${m.y+sz*0.3} ${m.x+sz*0.3},${m.y+sz} ${m.x-sz*0.3},${m.y+sz} ${m.x-sz*0.8},${m.y+sz*0.3}`} fill={col} opacity={0.7} />
        <rect x={m.x - 4} y={m.y - 2} width={8} height={6} rx={1} fill="rgba(255,255,255,0.4)" />
      </g>
    );
  }

  return (
    <section id="timeline" ref={sectionRef} className="section-container mt-section">
      <div className={isVisible ? 'animate-fade-up' : ''}>
        <div className="section-header">
          <span className="section-tag">Milestones & History</span>
          <h2 className="section-title">The Innovation Ascent</h2>
          <p className="section-subtitle">
            A chronological trace of engineered architectures, published patents, research investigations, academic milestones, and professional experience.
          </p>
        </div>
      </div>

      {/* ── Mountain SVG ── */}
      <div className="mt-map-wrap">
        <svg className="mt-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="mtSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0e1a" />
              <stop offset="50%" stopColor="#121a2e" />
              <stop offset="100%" stopColor="#1a2035" />
            </linearGradient>
            <linearGradient id="mtBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,215,0,0.06)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.015)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.005)" />
            </linearGradient>
            <linearGradient id="mtLayer2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.025)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.008)" />
            </linearGradient>
            <filter id="mtGlow">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <filter id="mtGlowStrong">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* ── sky background ── */}
          <rect x="0" y="0" width="1200" height="700" fill="url(#mtSky)" />

          {/* ── stars ── */}
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={20 + Math.random() * 1160} cy={10 + Math.random() * 200} r={0.5 + Math.random() * 1} fill="rgba(255,255,255,0.15)" opacity={0.3 + Math.random() * 0.5} className="mt-star" />
          ))}

          {/* ── sun rays ── */}
          {[0, 12, 24].map((angle) => (
            <polygon key={angle} points="1050,0 940,50 950,55" fill="rgba(251,191,36,0.06)" className="mt-sun-ray" style={{ transformOrigin: '1050px 0px', transform: `rotate(${angle}deg)` }} />
          ))}

          {/* ── mountain layers (depth) ── */}
          <path d={BODY_PATH} fill="rgba(255,255,255,0.012)" />
          <path d={mountainBodyPath(cr2bezier(DATA.map((p, i) => ({ x: p.x + (i % 2 ? 15 : -15), y: p.y + 20 + i * 0.5 }))))} fill="url(#mtLayer2)" />
          <path d={BODY_PATH} fill="url(#mtBody)" />

          {/* ── ridgeline glow ── */}
          <path d={SMOOTH_PATH} fill="none" stroke="rgba(251,191,36,0.04)" strokeWidth={8} strokeLinecap="round" />

          {/* ── elevation lines ── */}
          {[500, 400, 300, 200, 100].map((y) => (
            <g key={y}>
              <line x1={30} x2={1170} y1={y} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} strokeDasharray="3 4" />
              <text x={28} y={y + 3} fontSize={5} fill="#4a5568" textAnchor="end" letterSpacing="0.05em">
                {y === 500 ? '0m' : y === 400 ? '2,000m' : y === 300 ? '4,000m' : y === 200 ? '6,000m' : y === 100 ? '8,000m' : ''}
              </text>
            </g>
          ))}

          {/* ── zone labels ── */}
          {ZONES.map((z, i) => (
            <g key={i} opacity={0.3}>
              <text x={z.x} y={z.y} fontSize={6.5} fill="#8892a8" textAnchor="middle" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>{z.label}</text>
              <text x={z.x} y={z.y + 10} fontSize={4.5} fill="#4a5568" textAnchor="middle" letterSpacing="0.12em" style={{ textTransform: 'uppercase' }}>{z.sub}</text>
            </g>
          ))}

          {/* ── clouds ── */}
          {[
            { cx: 160, cy: 480, s: 1 },
            { cx: 400, cy: 380, s: 0.8 },
            { cx: 700, cy: 300, s: 0.6 },
            { cx: 950, cy: 200, s: 0.5 },
          ].map((c, i) => (
            <g key={i} className="mt-cloud" style={{ animationDelay: `${i * 2}s` }}>
              <ellipse cx={c.cx} cy={c.cy} rx={40 * c.s} ry={8 * c.s} fill="rgba(255,255,255,0.015)" />
              <ellipse cx={c.cx + 16 * c.s} cy={c.cy - 4 * c.s} rx={28 * c.s} ry={6 * c.s} fill="rgba(255,255,255,0.01)" />
            </g>
          ))}

          {/* ── snow caps ── */}
          {DATA.filter(m => m.y < 400).map((m, i) =>
            Array.from({ length: 4 }, (_, j) => (
              <circle key={`s-${i}-${j}`} cx={m.x + (Math.random() - 0.5) * 20} cy={m.y + (Math.random() - 0.5) * 14} r={0.8 + Math.random() * 1} fill="rgba(255,255,255,0.4)" className="mt-snow" style={{ animationDelay: `${Math.random() * 3}s` }} />
            ))
          )}

          {/* ── trail line ── */}
          <path ref={trailRef} d={SMOOTH_PATH} fill="none" stroke="rgba(251,191,36,0.6)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={`${animProgress * 3000} ${3000 - animProgress * 3000}`} strokeDashoffset={0} />

          {/* ── trail segment colors ── */}
          {[
            { start: 0, end: 7, color: 'rgba(96,165,250,0.35)' },
            { start: 7, end: 9, color: 'rgba(251,191,36,0.35)' },
            { start: 9, end: 11, color: 'rgba(251,191,36,0.45)' },
            { start: 11, end: 12, color: 'rgba(196,132,252,0.4)' },
          ].map((seg, si) => {
            const pts = DATA.slice(seg.start, seg.end + 1);
            const segPath = cr2bezier(pts);
            return (
              <path key={si} d={segPath} fill="none" stroke={seg.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={`${animProgress * 3000} ${3000 - animProgress * 3000}`} strokeDashoffset={0} opacity={animProgress > 0 ? 1 : 0} />
            );
          })}

          {/* ── milestone markers ── */}
          {DATA.map((m, i) => {
            const revealAt = (i + 1) / DATA.length;
            const opacity = animProgress >= revealAt ? 1 : 0;
            const scale = animProgress >= revealAt ? 1 : 0.5;
            return (
              <g key={i} className="mt-marker" style={{ opacity, transform: `scale(${scale})`, transformOrigin: `${m.x}px ${m.y}px`, transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                onMouseEnter={(e) => handleMove(m, e)} onMouseLeave={handleLeave}>

                {milestoneMarker(m, i)}

                {/* label */}
                <text x={m.x} y={m.major ? m.y + 24 : m.y + 14} fontSize={m.major ? 6.5 : 5.5} fill={m.major ? '#fbbf24' : '#6b7a93'} textAnchor="middle" fontWeight={m.major ? 'bold' : 'normal'}>
                  {m.title.length > 22 ? m.title.slice(0, 20) + '…' : m.title}
                </text>
                <text x={m.x} y={(m.major ? m.y + 24 : m.y + 14) + 9} fontSize={4} fill="#4a5568" textAnchor="middle">
                  {m.date}
                </text>

                {/* achievement banner for major milestones */}
                {m.major && !m.title.startsWith('2024') && (
                  <g transform={`translate(${m.x},${m.y - 26})`}>
                    <rect x={-55} y={-5} width={110} height={11} rx={4} fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.12)" strokeWidth={0.5} />
                    <text x={0} y={3} fontSize={4.5} fill="#fbbf24" textAnchor="middle" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }} fontWeight={600}>
                      {m.title.startsWith('S.C.A.L.E.') ? 'IEEE PUBLISHED' : 'PATENT PUBLISHED'}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Tooltip ── */}
      {tooltip && (
        <div className="mt-tooltip visible" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className={`mt-tt-title ${tooltip.m.major ? 'mt-tt-achievement' : ''} ${tooltip.m.title.startsWith('S.C.A.L.E.') ? 'mt-tt-research' : ''}`}>
            {tooltip.m.title}
          </div>
          <div className="mt-tt-sub">
            {tooltip.m.category === 'patent' ? '📜 ' : tooltip.m.category === 'internship' ? '💼 ' : tooltip.m.category === 'research' ? '🔬 ' : tooltip.m.category === 'education' ? '🎓 ' : '🏆 '}
            {tooltip.m.category === 'education' ? 'Academic' : CAT_LABELS[tooltip.m.category]}
            {tooltip.m.major ? '  ★ Major Milestone' : ''}
          </div>
          <div className="mt-tt-date">{tooltip.m.date}</div>
          <div className="mt-tt-desc">{tooltip.m.description}</div>
          <div className="mt-tt-subtitle">{tooltip.m.subtitle}</div>
        </div>
      )}

      {/* ── Stats ── */}
      <div className="mt-stats">
        {[
          { num: '2024–2026', label: 'Years Covered' },
          { num: '13', label: 'Milestones' },
          { num: '4', label: 'Patents Published' },
          { num: '1', label: 'IEEE Publication' },
          { num: '8,848m', label: 'Peak Elevation' },
          { num: '∞', label: 'Future Scope' },
        ].map((s, i) => (
          <div key={i} className="mt-stat-item">
            <div className="mt-stat-num">{s.num}</div>
            <div className="mt-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Legend ── */}
      <div className="mt-legend">
        {[
          { color: '#64748b', label: 'Base Camp' },
          { color: '#818cf8', label: 'Camp / Ridge' },
          { color: '#fbbf24', label: 'Patent Summit' },
          { color: '#94a3f8', label: 'Research Peak' },
          { color: 'rgba(196,132,252,0.5)', label: 'Future Plateau' },
        ].map((l, i) => (
          <div key={i} className="mt-legend-item">
            <div className="mt-legend-dot" style={{ background: l.color }} />
            <span>{l.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineMountain;
