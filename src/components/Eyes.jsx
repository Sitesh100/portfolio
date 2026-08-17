import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * A pair of eyes that track the cursor.
 *
 * Each iris is moved with gsap.quickTo so pointer events stay cheap — the
 * setters reuse one tween per property instead of spawning a new one per
 * mousemove. On touch devices (no cursor to follow) the eyes idle-glance
 * around on their own so they never sit dead on the page.
 */
const Eyes = () => {

  const eyesRef = useRef(null);
  const socketRefs = useRef([]);
  const irisRefs = useRef([]);
  const lidRefs = useRef([]);

  useGSAP(() => {

    const sockets = socketRefs.current.filter(Boolean);
    const irises = irisRefs.current.filter(Boolean);
    const lids = lidRefs.current.filter(Boolean);
    if (!sockets.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // One reusable tween per axis, per eye.
    const move = irises.map((iris) => ({
      x: gsap.quickTo(iris, "x", { duration: 0.55, ease: "power3" }),
      y: gsap.quickTo(iris, "y", { duration: 0.55, ease: "power3" }),
    }));

    const lookAt = (clientX, clientY) => {
      sockets.forEach((socket, i) => {
        const rect = socket.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;

        const angle = Math.atan2(dy, dx);
        // Travel ramps up with distance but is capped inside the socket, so
        // the iris never clips through the eye's edge.
        const limit = rect.width * 0.2;
        const travel = Math.min(Math.hypot(dx, dy) / 7, limit);

        move[i].x(Math.cos(angle) * travel);
        move[i].y(Math.sin(angle) * travel);
      });
    };

    const onPointerMove = (e) => lookAt(e.clientX, e.clientY);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Idle wandering — runs until a real pointer shows up, and comes back
    // if the pointer goes away (touch, or cursor leaving the window).
    let idle;
    const startIdle = () => {
      if (idle || reduced) return;
      idle = gsap.timeline({ repeat: -1, repeatRefresh: true });
      idle.to(irises, {
        x: () => gsap.utils.random(-14, 14),
        y: () => gsap.utils.random(-10, 10),
        duration: 1.1,
        ease: "power2.inOut",
        stagger: 0.05,
      }).to({}, { duration: 1.4 });
    };
    const stopIdle = () => {
      idle?.kill();
      idle = null;
    };

    window.addEventListener("pointermove", stopIdle, { once: true });
    window.addEventListener("pointerleave", startIdle);
    if (window.matchMedia("(hover: none)").matches) startIdle();

    // Blink on a randomised interval so the two eyes feel alive rather than
    // mechanical.
    let blinkCall;
    const blink = () => {
      gsap.timeline({
        onComplete: () => {
          blinkCall = gsap.delayedCall(gsap.utils.random(2.5, 6.5), blink);
        },
      })
        .to(lids, { scaleY: 1, duration: 0.07, ease: "power2.in", stagger: 0.03 })
        .to(lids, { scaleY: 0, duration: 0.13, ease: "power2.out", stagger: 0.03 });
    };
    if (!reduced) blinkCall = gsap.delayedCall(2, blink);

    // Entrance pop.
    gsap.from(sockets, {
      scale: 0,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: eyesRef.current, start: "top 85%" },
    });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", startIdle);
      stopIdle();
      blinkCall?.kill();
    };

  }, { scope: eyesRef });

  return (
    <div ref={eyesRef} className="flex gap-5 lg:gap-8" aria-hidden="true">
      {[0, 1].map((i) => (
        <div
          key={i}
          ref={(el) => (socketRefs.current[i] = el)}
          className="relative w-24 h-24 lg:w-40 lg:h-40 rounded-full bg-white overflow-hidden shrink-0"
        >
          {/* Iris — the part that follows the cursor */}
          <div
            ref={(el) => (irisRefs.current[i] = el)}
            className="absolute inset-0 m-auto w-11 h-11 lg:w-[4.5rem] lg:h-[4.5rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #7B2FF7 0%, #2F86F7 45%, #101018 100%)",
            }}
          >
            {/* Pupil */}
            <div className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full bg-black" />
            {/* Specular highlight */}
            <div className="absolute top-[18%] left-[20%] w-1/4 h-1/4 rounded-full bg-white/80 blur-[1px]" />
          </div>

          {/* Eyelid — scaled from 0 → 1 on the y axis to blink */}
          <div
            ref={(el) => (lidRefs.current[i] = el)}
            className="absolute inset-0 bg-black origin-top scale-y-0"
          />
        </div>
      ))}
    </div>
  )
}

export default Eyes
