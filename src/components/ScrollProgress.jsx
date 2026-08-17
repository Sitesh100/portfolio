import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Gradient bar pinned to the top edge, scrubbed by overall page progress. */
const ScrollProgress = () => {

  const barRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(90deg,#FF4D6D 0%,#BD3EB2 25%,#7B2FF7 50%,#2F86F7 75%,#2FF7ED 100%)",
        }}
      />
    </div>
  )
}

export default ScrollProgress
