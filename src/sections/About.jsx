import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

const About = () => {

  const aboutRef = useRef(null);

  useGSAP(() => {
    // Characters brighten as the section scrolls through the viewport.
    SplitText.create(".about-text", {
      type: "lines, chars",
      onSplit(self) {
        gsap.set(self.chars, { opacity: 0.2 });
        gsap.to(self.chars, {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        });
      },
    });

    // Underline sweeps in beneath the section label.
    gsap.fromTo(".about-rule",
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        ease: "power2.out",
        scrollTrigger: { trigger: aboutRef.current, start: "top 80%", end: "top 40%", scrub: 0.5 },
      }
    );

    gsap.from(".about-fact", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".about-facts", start: "top 88%" },
    });
  }, { scope: aboutRef });

  return (
    <section
      ref={aboutRef}
      id="about"
      aria-label="About"
      className='min-h-screen bg-white text-black rounded-tl-[60px] rounded-tr-[60px] relative z-10 py-20 lg:py-28 flex flex-col justify-center'
    >
      <div className='main-container'>

        {/* Section label */}
        <div className="mb-8 lg:mb-12">
          <h3>About</h3>
          <svg className="w-full max-w-[420px] h-[6px] mt-3" viewBox="0 0 420 6" preserveAspectRatio="none" aria-hidden="true">
            <line className="about-rule" x1="0" y1="3" x2="420" y2="3" stroke="url(#aboutGradient)" strokeWidth="6" />
            <defs>
              <linearGradient id="aboutGradient" x1="0" y1="0" x2="420" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4D6D" />
                <stop offset="0.5" stopColor="#7B2FF7" />
                <stop offset="1" stopColor="#2FF7ED" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className='about-text font-heading text-2xl md:text-3xl xl:text-[40px] 2xl:text-5xl leading-[1.25]'>
          Full-Stack Developer and DevOps Engineer building responsive,
          performance-optimised web applications with React.js, Next.js,
          TypeScript and Node.js — and deploying them on AWS and GCP with Docker,
          Kubernetes, Terraform and CI/CD pipelines. I&apos;ve led a frontend team,
          architected a production backend on Node, Express and MongoDB, cut a
          Docker image by over 90%, and integrated payment gateways and REST APIs
          end to end. Alongside that I work in SEO, AEO and GEO — structured data,
          Core Web Vitals and keyword strategy — so the products I ship get found
          as well as they perform.
        </p>

        {/* Scannable facts */}
        <dl className="about-facts grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-14 lg:mt-20 border-t border-black/10 pt-10">
          {[
            ["Core stack", "React · Next.js · Node.js"],
            ["Cloud & DevOps", "AWS · GCP · Docker · K8s"],
            ["Databases", "MongoDB · MySQL · Prisma"],
            ["Also", "SEO · AEO · GEO"],
          ].map(([label, value]) => (
            <div key={label} className="about-fact">
              <dt className="text-xs lg:text-sm uppercase tracking-wide text-black/50 font-heading">{label}</dt>
              <dd className="text-base lg:text-xl mt-2 leading-snug">{value}</dd>
            </div>
          ))}
        </dl>

      </div>
    </section>
  )
}

export default About
