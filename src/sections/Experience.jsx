import React, { useRef } from 'react'
import { experience } from '../components/experienceData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

const Experience = () => {

  const expRef = useRef(null);

  useGSAP(() => {

    // Heading reveal
    SplitText.create(".exp-title", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 120,
          opacity: 0,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: expRef.current, start: "top 75%" },
        });
      },
    });

    // The spine draws itself as you scroll the section.
    gsap.fromTo(".exp-spine-path",
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-list",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      }
    );

    // Each role: marker pops, then text staggers in.
    gsap.utils.toArray(".exp-item").forEach((item) => {
      gsap.timeline({
        scrollTrigger: { trigger: item, start: "top 80%" },
      })
        .from(item.querySelector(".exp-dot"), {
          scale: 0,
          duration: 0.5,
          ease: "back.out(2.5)",
        })
        .from(item.querySelectorAll(".exp-reveal"), {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        }, "-=0.25");
    });

    gsap.utils.toArray(".edu-card").forEach((card) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });

  }, { scope: expRef });

  return (
    <section
      ref={expRef}
      id="experience"
      aria-label="Work experience and education"
      className="bg-black text-white py-24 lg:py-40 overflow-hidden"
    >
      {/* Title */}
      <div className="main-container pb-12 lg:pb-20 flex max-md:flex-col gap-6 justify-between items-start md:items-end">
        <div className="max-w-2xl">
          <h3 className="mb-4">Experience</h3>
          <h2 className="exp-title text-[10vw] md:text-6xl lg:text-7xl font-heading font-bold leading-[1]">
            Where I&apos;ve <span className="text-stroke">Shipped</span>
          </h2>
        </div>
        <p className="text-lg lg:text-xl max-w-sm">
          Frontend, backend and DevOps roles across product teams — building
          interfaces, architecting APIs and getting them into production.
        </p>
      </div>

      {/* Timeline */}
      <div className="main-container relative exp-list">

        {/* Drawn spine */}
        <svg
          className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-[2px] h-[calc(100%-1rem)] overflow-visible max-md:hidden"
          preserveAspectRatio="none"
          viewBox="0 0 2 100"
          aria-hidden="true"
        >
          <line x1="1" y1="0" x2="1" y2="100" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="2" />
          <line className="exp-spine-path" x1="1" y1="0" x2="1" y2="100" stroke="url(#expGradient)" strokeWidth="2" />
          <defs>
            <linearGradient id="expGradient" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF4D6D" />
              <stop offset="0.5" stopColor="#7B2FF7" />
              <stop offset="1" stopColor="#2FF7ED" />
            </linearGradient>
          </defs>
        </svg>

        <ol className="flex flex-col">
          {experience.map(({ id, company, role, period, stack, points }) => (
            <li key={id} className="exp-item relative md:pl-16 py-8 lg:py-12 border-t border-white/15 first:border-t-0">

              {/* Marker */}
              <span className="exp-dot absolute left-0 top-[2.6rem] lg:top-[3.6rem] w-[18px] h-[18px] rounded-full bg-white max-md:hidden" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-12 items-start">
                <div className="md:col-span-5">
                  <h4 className="exp-reveal text-3xl md:text-4xl lg:text-[2.6vw] font-heading font-bold leading-[1.05]">
                    {role}
                  </h4>
                  <p className="exp-reveal text-lg lg:text-xl mt-2 text-gray-300">{company}</p>
                  {period && (
                    <p className="exp-reveal text-base text-gray-500 mt-1 font-heading tracking-wide">{period}</p>
                  )}
                </div>

                <div className="md:col-span-7">
                  <ul className="flex flex-col gap-3 text-base lg:text-lg leading-relaxed text-gray-200">
                    {points.map((point) => (
                      <li key={point} className="exp-reveal flex gap-3">
                        <span className="mt-[0.6em] shrink-0 w-1.5 h-1.5 rounded-full bg-white/50" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 lg:gap-3 mt-6">
                    {stack.map((tech) => (
                      <span
                        key={tech}
                        className="exp-reveal border border-white/25 rounded-full px-4 py-1.5 text-sm lg:text-base font-heading"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

   

    </section>
  )
}

export default Experience
