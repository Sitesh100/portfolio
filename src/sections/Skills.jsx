import React, { useRef } from 'react'
import skills from '../components/skillsData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Skills = () => {

  const skillsRef = useRef(null);

  useGSAP(() => {

    // Animate the heading word-by-word on scroll
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
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 75%",
          },
        });
      },
    });

    // Reveal each category row as it enters the viewport
    gsap.utils.toArray(".skill-row").forEach((row) => {
      const num = row.querySelector(".skill-num");
      const heading = row.querySelector(".skill-heading");
      const pills = row.querySelectorAll(".skill-pill");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
        },
      });

      tl.from([num, heading], {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }).from(
        pills,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.6)",
        },
        "-=0.3"
      );
    });

  }, { scope: skillsRef });

  return (
    <div ref={skillsRef} className="bg-black text-white py-24 lg:py-40 overflow-hidden">

      {/* Title */}
      <div className="main-container pb-12 lg:pb-20 flex max-md:flex-col gap-6 justify-between items-start md:items-end">
        <div className="max-w-2xl">
          <h3 className="mb-4">Skills & Expertise</h3>
          <h2 className="skills-title text-[10vw] md:text-6xl lg:text-7xl font-heading font-bold leading-[1]">
            What I <span className="text-stroke">Build</span> With
          </h2>
        </div>
        <p className="text-lg lg:text-xl max-w-sm">
          A versatile, full-stack toolkit spanning modern front-end frameworks,
          scalable back-end systems, and cloud-native DevOps workflows.
        </p>
      </div>

      {/* Category rows */}
      <div className="main-container flex flex-col">
        {skills.map(({ id, category, items }) => (
          <div
            key={id}
            className="skill-row grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-start border-t border-white/15 py-10 lg:py-14"
          >
            {/* Left: number + category */}
            <div className="md:col-span-5 flex gap-6 lg:gap-8">
              <span className="skill-num text-gray-500 text-lg lg:text-2xl font-heading tracking-wide">
                0{id}
              </span>
              <h2 className="skill-heading text-4xl md:text-5xl lg:text-[3.4vw] font-heading font-bold leading-[1]">
                {category}
              </h2>
            </div>

            {/* Right: skill pills */}
            <div className="md:col-span-7 flex flex-wrap gap-3 lg:gap-4">
              {items.map((item) => (
                <span
                  key={item}
                  className="skill-pill border border-white/25 rounded-full px-5 py-2 text-base lg:text-lg font-heading transition-colors duration-300 hover:bg-white hover:text-black"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Skills
