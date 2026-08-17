import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/**
 * Gradient pill link with a magnetic hover: the button eases toward the
 * cursor while it's inside, and springs back on exit. Disabled on touch and
 * for users who've asked for reduced motion.
 */
const GradientButton = ({ text, link, className = "", download = false, external = false }) => {

  const btnRef = useRef(null);

  useGSAP(() => {
    const el = btnRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * 0.35);
      yTo((e.clientY - (rect.top + rect.height / 2)) * 0.5);
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, { scope: btnRef });

  return (
    <a
      ref={btnRef}
      href={link}
      {...(download ? { download: true } : {})}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`btn uppercase font-heading border-2 border-transparent text-center min-w-[205px] px-12 py-2 lg:py-3 rounded-full max-sm:text-lg inline-block ${className}`}
    >
      {text}
    </a>
  )
}

export default GradientButton
