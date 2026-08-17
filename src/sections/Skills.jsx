import React, { useRef, useState, useMemo } from 'react'
import skills from '../components/skillsData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/* --- radar geometry -------------------------------------------------- */

const SIZE = 520;
const CENTER = SIZE / 2;
const RADIUS = 150;
const LABEL_RADIUS = RADIUS + 40;
const RINGS = [0.25, 0.5, 0.75, 1];

// One hue per axis, sampled along the site's brand gradient.
const AXIS_COLORS = [
  "#FF4D6D",
  "#D93BBD",
  "#A233E4",
  "#5B5CF7",
  "#2F86F7",
  "#2FC4F2",
  "#2FF7ED",
];

const pointAt = (index, count, ratio) => {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * ratio,
    y: CENTER + Math.sin(angle) * RADIUS * ratio,
  };
};

const polygon = (count, ratioAt) =>
  Array.from({ length: count }, (_, i) => {
    const { x, y } = pointAt(i, count, ratioAt(i));
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");

/* --- section --------------------------------------------------------- */

const Skills = () => {
  const skillsRef = useRef(null);
  const panelRef = useRef(null);
  const [activeId, setActiveId] = useState(skills[1].id);

  const count = skills.length;
  const active = skills.find((s) => s.id === activeId) ?? skills[0];
  const activeIndex = skills.findIndex((s) => s.id === active.id);
  const activeColor = AXIS_COLORS[activeIndex % AXIS_COLORS.length];

  const dataPolygon = useMemo(
    () => polygon(count, (i) => skills[i].level / 100),
    [count]
  );

  /* intro animation */
  useGSAP(() => {
    SplitText.create(".skills-title", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 120,
          opacity: 0,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: skillsRef.current, start: "top 75%" },
        });
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: ".skills-chart", start: "top 80%" },
    });

    tl.from(".radar-ring", {
      scale: 0.4,
      opacity: 0,
      transformOrigin: "center",
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
    })
      .from(".radar-spoke", { opacity: 0, duration: 0.4, stagger: 0.04 }, "-=0.4")
      .from(
        ".radar-shape",
        {
          scale: 0.2,
          opacity: 0,
          transformOrigin: "center",
          duration: 1,
          ease: "power4.out",
        },
        "-=0.3"
      )
      .from(
        ".radar-node",
        { scale: 0, transformOrigin: "center", duration: 0.45, stagger: 0.06, ease: "back.out(2)" },
        "-=0.6"
      )
      .from(".radar-label", { opacity: 0, y: 8, duration: 0.4, stagger: 0.05 }, "-=0.5")
      .from(".skills-panel", { x: 40, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.8");
  }, { scope: skillsRef });

  /* re-animate the detail panel whenever the active axis changes */
  useGSAP(() => {
    const bars = panelRef.current?.querySelectorAll(".skill-bar-fill") ?? [];
    gsap.fromTo(
      panelRef.current?.querySelectorAll(".panel-anim") ?? [],
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: "power3.out" }
    );
    gsap.fromTo(
      bars,
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: "left center", duration: 0.7, stagger: 0.05, ease: "power3.out" }
    );
  }, { dependencies: [activeId], scope: panelRef });

  return (
    <div ref={skillsRef} className="bg-black text-white py-24 lg:py-40 overflow-hidden">

      {/* Title */}
      <div className="main-container pb-12 lg:pb-20 flex max-md:flex-col gap-6 justify-between items-start md:items-end">
        <div className="max-w-2xl">
          <h3 className="mb-4">Skills &amp; Expertise</h3>
          <h2 className="skills-title text-[10vw] md:text-6xl lg:text-7xl font-heading font-bold leading-[1]">
            What I <span className="text-stroke">Build</span> With
          </h2>
        </div>
        <p className="text-lg lg:text-xl max-w-sm">
          A versatile, full-stack toolkit spanning modern front-end frameworks,
          scalable back-end systems, and cloud-native DevOps workflows.
        </p>
      </div>

      {/* Chart + detail panel */}
      <div className="main-container skills-chart grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-t border-white/15 pt-12 lg:pt-20">

        {/* Radar */}
        <div className="lg:col-span-7">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="w-full max-w-[620px] mx-auto overflow-visible select-none"
            role="img"
            aria-label="Radar chart of skill areas and proficiency"
          >
            <defs>
              <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={activeColor} stopOpacity="0.45" />
                <stop offset="100%" stopColor={activeColor} stopOpacity="0.06" />
              </radialGradient>
              <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* grid rings */}
            {RINGS.map((r) => (
              <polygon
                key={r}
                className="radar-ring"
                points={polygon(count, () => r)}
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1"
              />
            ))}

            {/* scale ticks */}
            {RINGS.map((r) => (
              <text
                key={`tick-${r}`}
                x={CENTER + 5}
                y={CENTER - RADIUS * r + 4}
                className="fill-white/25 font-body"
                fontSize="10"
              >
                {r * 100}
              </text>
            ))}

            {/* spokes */}
            {skills.map((s, i) => {
              const { x, y } = pointAt(i, count, 1);
              return (
                <line
                  key={`spoke-${s.id}`}
                  className="radar-spoke"
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke={s.id === activeId ? activeColor : "rgba(255,255,255,0.16)"}
                  strokeWidth={s.id === activeId ? 1.5 : 1}
                  strokeDasharray={s.id === activeId ? "0" : "3 4"}
                />
              );
            })}

            {/* data shape */}
            <polygon
              className="radar-shape"
              points={dataPolygon}
              fill="url(#radarFill)"
              stroke={activeColor}
              strokeWidth="2"
              strokeLinejoin="round"
              style={{ transition: "stroke 400ms ease" }}
            />

            {/* interactive nodes + labels */}
            {skills.map((s, i) => {
              const isActive = s.id === activeId;
              const color = AXIS_COLORS[i % AXIS_COLORS.length];
              const node = pointAt(i, count, s.level / 100);
              const label = pointAt(i, count, LABEL_RADIUS / RADIUS);
              const anchor =
                Math.abs(label.x - CENTER) < 12
                  ? "middle"
                  : label.x > CENTER
                  ? "start"
                  : "end";

              return (
                <g
                  key={s.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveId(s.id)}
                  onFocus={() => setActiveId(s.id)}
                  onClick={() => setActiveId(s.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(s.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${s.category}, ${s.level} percent`}
                >
                  {/* generous hit area */}
                  <circle cx={node.x} cy={node.y} r="18" fill="transparent" />

                  <circle
                    className="radar-node"
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 7 : 4.5}
                    fill={isActive ? color : "#000"}
                    stroke={color}
                    strokeWidth="2"
                    filter={isActive ? "url(#radarGlow)" : undefined}
                    style={{ transition: "r 250ms ease, fill 250ms ease" }}
                  />

                  <text
                    className="radar-label font-heading uppercase tracking-wide"
                    x={label.x}
                    y={label.y}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    fontSize={isActive ? 15 : 13}
                    fill={isActive ? color : "rgba(255,255,255,0.55)"}
                    style={{ transition: "fill 250ms ease, font-size 250ms ease" }}
                  >
                    {s.short}
                  </text>
                  <text
                    x={label.x}
                    y={label.y + 15}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    fontSize="10"
                    className="radar-label font-body"
                    fill={isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.28)"}
                  >
                    {s.level}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* touch-friendly switcher */}
          <div className="lg:hidden flex flex-wrap gap-2 justify-center mt-8">
            {skills.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className="rounded-full border px-4 py-1.5 text-sm font-heading transition-colors duration-300"
                style={
                  s.id === activeId
                    ? {
                        borderColor: AXIS_COLORS[i % AXIS_COLORS.length],
                        color: "#000",
                        background: AXIS_COLORS[i % AXIS_COLORS.length],
                      }
                    : { borderColor: "rgba(255,255,255,0.25)" }
                }
              >
                {s.short}
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div ref={panelRef} className="skills-panel lg:col-span-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="panel-anim block text-sm font-heading tracking-widest text-gray-500">
                0{active.id} / 0{count}
              </span>
              <h2
                className="panel-anim text-4xl lg:text-5xl font-heading font-bold leading-[1.05] mt-2"
                style={{ color: activeColor }}
              >
                {active.category}
              </h2>
            </div>
            <span
              className="panel-anim font-heading-alt text-5xl lg:text-6xl leading-none"
              style={{ color: activeColor }}
            >
              {active.level}
              <span className="text-2xl align-top">%</span>
            </span>
          </div>

          <p className="panel-anim text-base lg:text-lg text-gray-400 mt-4 max-w-md">
            {active.blurb}
          </p>

          <ul className="mt-8 flex flex-col divide-y divide-white/10">
            {active.items.map((item) => (
              <li key={item.name} className="panel-anim py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-heading text-base lg:text-lg">{item.name}</span>
                  <span className="text-sm text-gray-500 tabular-nums">{item.level}%</span>
                </div>
                <div className="mt-2 h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full rounded-full"
                    style={{
                      width: `${item.level}%`,
                      background: `linear-gradient(90deg, ${activeColor}55, ${activeColor})`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <p className="panel-anim text-sm text-gray-600 mt-6 lg:hidden">
            Tap a label above to explore another area.
          </p>
          <p className="panel-anim text-sm text-gray-600 mt-6 max-lg:hidden">
            Hover any point on the chart to explore that area.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Skills
