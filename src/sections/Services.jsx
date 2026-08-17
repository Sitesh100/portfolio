import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    id: "01",
    title: <>Web Design <br /> &amp; UI/UX</>,
    body: "Modern, user-focused interfaces with clean layouts, considered typography and smooth interactions. Responsive from mobile to ultrawide, built as reusable component systems in React and Tailwind CSS, and tested for accessibility.",
    theme: "bg-black text-white",
    position: "sticky top-4 pt-16 lg:pt-20 pb-[40rem]",
    // The tall bottom padding on each sticky panel is what lets the next one
    // slide up and cover it. The final panel is static so the stack resolves.
  },
  {
    id: "02",
    title: <>Web Development <br /> &amp; DevOps</>,
    body: "Scalable frontends in React and Next.js backed by Node.js and Express APIs, MongoDB or MySQL, and authentication and payment integrations. Shipped through Docker, Kubernetes and CI/CD pipelines on AWS and GCP — optimised images, fast builds, reliable uptime.",
    theme: "bg-[#E9E9F0] text-black",
    position: "sticky top-1/4 pt-16 lg:pt-20 pb-[30rem]",
  },
  {
    id: "03",
    title: <>Animated <br /> Websites</>,
    body: "Scroll-driven storytelling with GSAP and Framer Motion — ScrollTrigger sequences, SVG drawing, text splitting and micro-interactions. Motion that stays performant, respects reduced-motion preferences and never gets in the way of the content.",
    theme: "bg-white text-black",
    position: "sticky top-1/2 pt-16 lg:pt-20 pb-[20rem]",
  },
  {
    id: "04",
    title: <>SEO, AEO <br /> &amp; GEO</>,
    body: "Technical SEO plus Answer and Generative Engine Optimization: schema.org structured data, semantic markup, Core Web Vitals, metadata and keyword strategy — so the work ranks in search and gets cited by AI answer engines.",
    theme: "bg-black text-white",
    position: "relative py-16 lg:py-24",
  },
];

const Services = () => {

  const servicesRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".service-panel").forEach((panel) => {
      gsap.from(panel.querySelectorAll(".service-reveal"), {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 80%" },
      });
    });
  }, { scope: servicesRef });

  return (
    <section ref={servicesRef} id="services" aria-label="Services">
      {/* Title Wrapper */}
      <div className="bg-white text-black">
        <div className='main-container pb-8 lg:pb-12'>
          <h3>Services in Detail</h3>
        </div>
      </div>

      {/* Services List */}
      <div className='relative'>
        {services.map(({ id, title, body, theme, position }) => (
          <div key={id} className={`service-panel ${theme} ${position}`}>
            <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">

              {/* Left side */}
              <div className='flex gap-6 lg:gap-8'>
                <span className="service-reveal text-gray-400 text-lg lg:text-2xl font-heading tracking-wide block mb-4">{id}</span>
                <h2 className="service-reveal text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
                  {title}
                </h2>
              </div>

              {/* Right side */}
              <div className="flex items-center">
                <p className="service-reveal text-lg lg:text-xl leading-relaxed">{body}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
