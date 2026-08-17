import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/**
 * Blend-mode cursor: a small dot that snaps to the pointer and a larger ring
 * that lags behind it. The ring swells over anything interactive.
 * Skipped entirely on touch / reduced-motion.
 */
const Cursor = () => {

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useGSAP(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    let shown = false;
    const onMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    };

    // Delegated so it also covers links rendered after mount.
    const interactive = "a, button, [role='button'], .menubar, .skill-pill";
    const onOver = (e) => {
      if (e.target.closest(interactive)) {
        gsap.to(ring, { scale: 2.2, borderWidth: 1, duration: 0.3, ease: "power3.out" });
      }
    };
    const onOut = (e) => {
      if (e.target.closest(interactive)) {
        gsap.to(ring, { scale: 1, borderWidth: 2, duration: 0.3, ease: "power3.out" });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  });

  return (
    <div className="max-lg:hidden fixed inset-0 z-[80] pointer-events-none mix-blend-difference" aria-hidden="true">
      <div ref={dotRef} className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white" />
      <div ref={ringRef} className="absolute top-0 left-0 w-9 h-9 rounded-full border-2 border-white" />
    </div>
  )
}

export default Cursor
