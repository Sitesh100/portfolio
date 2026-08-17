import React, { useRef } from 'react'
import projects from '../components/projectsData'
import CTA from '../components/CTA'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Projects = () => {

  const pageRef = useRef(null);

  useGSAP(() => {
    gsap.from(".project-card", {
      y: 70,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".projects-grid", start: "top 85%" },
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      <div className='bg-white text-black'>
        <div className='main-container py-28'>

          <h1 className='text-6xl lg:text-[8vw] font-heading font-bold leading-[1] tracking-tight text-center'>Projects</h1>
          <p className="text-lg lg:text-xl text-center max-w-3xl mx-auto mt-8">
            Client and product work built with React.js, Next.js, Node.js and
            MongoDB, deployed with Docker and CI/CD on AWS and GCP.
          </p>

          <div className='projects-grid grid md:grid-cols-2 gap-10 lg:gap-14 mt-12 lg:mt-20'>
            {projects.map(({ id, name, image, link, role, summary, stack }) => (
              <article key={id} className="project-card flex flex-col">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group overflow-hidden rounded-2xl block"
                >
                  <img
                    src={image}
                    alt={`${name} ${role} project screenshot`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                <h2 className="uppercase leading-[1.4] text-2xl lg:text-3xl font-heading mt-5">
                  <a href={link} target="_blank" rel="noreferrer noopener" className="hover:opacity-70 transition-opacity">
                    {name}
                  </a>
                </h2>

                <p className="text-sm lg:text-base font-heading uppercase tracking-wide text-black/50 mt-1">{role}</p>
                <p className="text-base lg:text-lg leading-relaxed mt-3">{summary}</p>

                {stack.length > 0 && (
                  <ul className="flex flex-wrap gap-2 lg:gap-3 mt-5">
                    {stack.map((tech) => (
                      <li key={tech} className="border border-black/20 rounded-full px-4 py-1.5 text-sm lg:text-base font-heading">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

        </div>
      </div>
      <CTA />
    </div>
  )
}

export default Projects
