import React, { useRef } from 'react'
import GradientButton from '../components/GradientButton'
import projects from '../components/projectsData'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Work = () => {

  const workRef = useRef(null);
  const projectsRef = useRef(null);

  useGSAP(() => {
    // Horizontal scroll
    const scrollDistance = () =>
      projectsRef.current.scrollWidth - window.innerWidth;

    const horizontal = gsap.to(projectsRef.current, {
      x: () => -scrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: workRef.current,
        start: "center center",
        end: () => `+=${projectsRef.current.scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1, // prevents flicker on fast scroll
        invalidateOnRefresh: true,
      },
    });

    // Cards tilt and settle as they cross the middle of the screen.
    gsap.utils.toArray(".work-card").forEach((card) => {
      gsap.fromTo(card,
        { rotate: 4, scale: 0.92 },
        {
          rotate: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontal,
            start: "left right",
            end: "center center",
            scrub: true,
          },
        }
      );
    });

    SplitText.create(".work-title", {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 100,
          opacity: 0,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: workRef.current, start: "top 75%" },
        });
      },
    });

  }, { scope: workRef });


  return (
    <section
      ref={workRef}
      id="work"
      aria-label="Selected work"
      className="min-h-screen bg-white text-black py-24 lg:py-40 overflow-hidden"
    >

      {/* Title Wrapper */}
      <div className='main-container pb-8 lg:pb-12 flex max-md:flex-col gap-6 justify-between items-start md:items-end'>
        <div className='max-w-xl'>
          <h3 className='mb-3'>Selected Work</h3>
          <h2 className="work-title text-[10vw] md:text-5xl lg:text-6xl font-heading font-bold leading-[1] mb-4">
            Shipped &amp; Live
          </h2>
          <p className='text-lg lg:text-xl'>
            Real-world client and product work — full-stack platforms, payment
            integrations, cloud deployments and responsive web applications
            delivered end to end.
          </p>
        </div>
        <GradientButton text="Explore All" link="/projects" className="btn-light magnetic" />
      </div>

      <div ref={projectsRef}>
        {/* Projects */}
        <ul className='flex gap-4 lg:gap-8 ms-4 lg:ms-[40%] mt-6'>
          {projects.map(({ id, name, image, link, role, stack }) => (
            <li key={id}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${name} — ${role}`}
                className="work-card relative rounded-2xl w-full min-w-[340px] lg:min-w-xl h-72 lg:h-96 block overflow-hidden group"
              >
                {/* Project Image */}
                <img
                  src={image}
                  alt={`${name} — ${role} project screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Project Name */}
                <span className="absolute top-4 right-4 bg-black text-white text-sm lg:text-lg uppercase leading-[1.4] font-heading px-5 py-1 rounded-full">
                  {name}
                </span>

                {/* Detail overlay — slides up on hover */}
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 bg-gradient-to-t from-black via-black/85 to-transparent text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-sm lg:text-base font-heading uppercase tracking-wide text-white/70">{role}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {stack.map((tech) => (
                      <span key={tech} className="border border-white/30 rounded-full px-3 py-1 text-xs lg:text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

    </section>
  )
}

export default Work
