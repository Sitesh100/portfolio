import React, { useRef } from 'react'
import GradientButton from './GradientButton'
import site from './siteData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const CTA = () => {

  const ctaRef = useRef(null);

  useGSAP(() => {
    SplitText.create(".cta-text", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 90,
          opacity: 0,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 80%" },
        });
      },
    });

    gsap.from(".cta-action", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ctaRef.current, start: "top 65%" },
    });
  }, { scope: ctaRef });

  return (
    <section ref={ctaRef} id="contact" aria-label="Contact">
      <div className="main-container py-20 lg:py-28 h-full flex flex-col gap-8 justify-center items-center">

        <h2 className='cta-text max-w-6xl text-2xl md:text-3xl xl:text-[40px] 2xl:text-5xl text-center leading-[1.25] font-heading'>
          {site.availability}. Let&apos;s build something great together.
        </h2>

        <div className="cta-action flex flex-wrap gap-4 justify-center">
          <GradientButton text="Book a Call" link={`mailto:${site.email}`} className="magnetic" />
          <GradientButton text="Resume" link={site.resume} className="magnetic" download />
        </div>

        <address className="cta-action not-italic text-center text-base lg:text-xl text-gray-400 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{site.phone}</a>
          <span>{site.location}</span>
        </address>

      </div>
    </section>
  )
}

export default CTA
