import React, { useRef } from 'react'
import GradientButton from '../components/GradientButton'
import site from '../components/siteData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

const Hero = () => {

  const heroRef = useRef(null);

  useGSAP(() => {

    // pin hero section
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });

    const intro = gsap.timeline();

    // Name
    SplitText.create(".hero-name", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        intro.from(self.words, { y: 100, opacity: 0, stagger: 0.1 }, 0.2);
      },
    });

    // Headline
    SplitText.create(".hero-headline", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        intro.from(self.words, { y: 120, opacity: 0, stagger: 0.12 }, 0.4);
      },
    });

    // Supporting line + buttons + stats
    intro.from(".hero-sub", { y: 40, opacity: 0, duration: 0.6, ease: "power2.out" }, 1.0)
      .from(".hero-cta", { y: 40, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 1.2)
      .from(".hero-stat", { y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 1.4);

    // Star: draw the outline, then hand off to an endless slow rotation.
    gsap.fromTo(".star path",
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 2.4,
        ease: "power1.inOut",
        delay: 0.3,
      }
    );

    gsap.from(".star svg", {
      scale: 0.6,
      opacity: 0,
      transformOrigin: "center center",
      duration: 1.4,
      ease: "back.out(1.4)",
      onComplete: () => {
        gsap.to(".star svg", {
          rotate: "+=360",
          transformOrigin: "center",
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      },
    });

    // Star drifts as you scroll out of the hero.
    gsap.to(".star", {
      y: -160,
      rotate: 40,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(".hero-hint-dot", {
      y: 11,
      repeat: -1,
      yoyo: true,
      duration: 0.9,
      ease: "power1.inOut",
    });

    // Scroll hint fades away the moment you start scrolling.
    gsap.to(".hero-hint", {
      opacity: 0,
      y: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "20% top",
        scrub: true,
      },
    });

  }, { scope: heroRef });

  return (
    <section ref={heroRef} aria-label="Introduction" className='relative overflow-hidden z-0'>

      {/* Text container */}
      <div className="main-container h-screen flex flex-col lg:justify-center items-start lg:py-12 max-lg:pt-32">

        <h1 className="hero-name gradient-underline text-3xl lg:text-[3.2vw] uppercase font-heading font-semibold">
          {site.name}
        </h1>

        <p className="hero-headline text-6xl lg:text-[7.4vw] font-heading font-bold leading-[1] tracking-tight mt-3 mb-5">
          Full-Stack <br /> <span className='text-stroke'>Developer</span> &amp; DevOps
        </p>

        <p className="hero-sub max-w-2xl text-base lg:text-xl text-gray-300 leading-relaxed mb-7">
          I build responsive, performance-optimised web applications with
          React.js, Next.js and Node.js and ship them to production on AWS and
          GCP with Docker, Kubernetes and CI/CD pipelines.
        </p>

        <div className="flex flex-wrap gap-4">
          <GradientButton text="Let's Talk" link={`mailto:${site.email}`} className="hero-cta magnetic" />
          <GradientButton text="View Resume" link={site.resume} className="hero-cta magnetic" external />
        </div>

        {/* Quick-scan facts — the first thing a recruiter looks for */}
        <dl className="flex flex-wrap gap-x-10 gap-y-5 mt-10 lg:mt-14">
          {[
            ["Experience", "3 product teams"],
            ["Projects", "7+ shipped"],
            ["Focus", "React · Next.js · DevOps"],
            ["Based in", site.location],
          ].map(([label, value]) => (
            <div key={label} className="hero-stat">
              <dt className="text-xs lg:text-sm uppercase tracking-wide text-gray-500 font-heading">{label}</dt>
              <dd className="text-base lg:text-xl mt-1">{value}</dd>
            </div>
          ))}
        </dl>

      </div>

      {/* Scroll hint */}
      <div className="hero-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-lg:hidden" aria-hidden="true">
        <span className="text-xs uppercase tracking-[0.3em] font-heading text-gray-400">Scroll</span>
        <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.75" y="0.75" width="12.5" height="24.5" rx="6.25" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
          <circle className="hero-hint-dot" cx="7" cy="7" r="2" fill="white" />
        </svg>
      </div>

      {/* shape */}
      <div className="star absolute -z-1 top-80 lg:top-32 right-[-35%] lg:right-[-12%] opacity-80" aria-hidden="true">
        <svg className='h-[48vh] lg:h-[80vh]' width="100%" height="100%" viewBox="0 0 653 631" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M290.361 1.55611L333.686 284.91L333.88 286.179L334.595 285.114L496.712 43.7172L530.894 66.1542L354.53 298.39L353.719 299.458L355.031 299.182L644.761 238.164L651.694 276.116L359.086 321.398L357.759 321.603L358.897 322.315L605.849 476.828L581.885 510.336L344.939 341.783L343.894 341.039L344.16 342.294L403.733 622.683L363.139 630.092L319.819 346.737L319.626 345.469L318.911 346.534L156.783 587.928L122.522 565.048L298.964 333.261L299.777 332.192L298.463 332.469L8.73045 393.474L1.564 354.212L294.405 310.247L295.74 310.046L294.596 309.329L47.5646 154.375L71.6092 121.305L308.567 289.864L309.612 290.609L309.345 289.353L249.767 8.96559L290.361 1.55611Z" stroke="url(#paint0_linear_1074_2)" />
          <defs>
            <linearGradient id="paint0_linear_1074_2" x1="4.77595" y1="374.593" x2="648.724" y2="257.056" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF4D6D" />
              <stop offset="0.25" stopColor="#BD3EB2" />
              <stop offset="0.5" stopColor="#7B2FF7" />
              <stop offset="0.75" stopColor="#2F86F7" />
              <stop offset="1" stopColor="#2FF7ED" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </section>
  )
}

export default Hero
