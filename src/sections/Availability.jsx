import React, { useRef } from 'react'
import Eyes from '../components/Eyes'
import site from '../components/siteData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Availability = () => {

  const availRef = useRef(null);

  useGSAP(() => {
    SplitText.create(".avail-title", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 120,
          opacity: 0,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: availRef.current, start: "top 75%" },
        });
      },
    });

    gsap.from(".avail-meta", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: availRef.current, start: "top 65%" },
    });
  }, { scope: availRef });

  return (
    <section
      ref={availRef}
      aria-label="Availability"
      className="bg-black text-white py-24 lg:py-40 overflow-hidden"
    >
      <div className="main-container flex flex-col items-center gap-10 lg:gap-14 text-center">

        <Eyes />

        <h2 className="avail-title text-[9vw] md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] max-w-5xl">
          Currently <span className="text-stroke">Watching</span> For My Next Role
        </h2>

        <p className="avail-meta text-lg lg:text-xl max-w-2xl text-gray-300">
          {site.availability}. Based in {site.location}, comfortable working
          remotely across time zones, and available for immediate discussion.
        </p>

        <dl className="avail-meta grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-14 text-left mt-2">
          <div>
            <dt className="text-sm lg:text-base text-gray-500 font-heading uppercase tracking-wide">Role</dt>
            <dd className="text-base lg:text-lg mt-1">Full-Stack / DevOps</dd>
          </div>
          <div>
            <dt className="text-sm lg:text-base text-gray-500 font-heading uppercase tracking-wide">Location</dt>
            <dd className="text-base lg:text-lg mt-1">{site.location}</dd>
          </div>
          <div>
            <dt className="text-sm lg:text-base text-gray-500 font-heading uppercase tracking-wide">Work Type</dt>
            <dd className="text-base lg:text-lg mt-1">Full-time · Freelance</dd>
          </div>
          <div>
            <dt className="text-sm lg:text-base text-gray-500 font-heading uppercase tracking-wide">Notice</dt>
            <dd className="text-base lg:text-lg mt-1">Immediate</dd>
          </div>
        </dl>

      </div>
    </section>
  )
}

export default Availability
