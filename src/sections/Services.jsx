import React from 'react'

const Services = () => {
  return (
    <>
      {/* Title Wrapper */}
      <div className="bg-white text-black">
        <div className='main-container pb-8 lg:pb-12'>
          <h3>Services in Detail</h3>
        </div>
      </div>

      {/* Services List */}
      <div className='relative'>
        <div className="bg-black text-white pt-16 lg:pt-20 pb-[40rem] sticky top-4">
          <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">
              
            {/* Left side */}
            <div className='flex gap-6 lg:gap-8'>
              <span className="text-gray-400 text-lg lg:text-2xl font-heading tracking-wide block mb-4">01</span>
              <h2 className="text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
                  Web Design <br /> & UI/UX
              </h2>
            </div>

            {/* Right side */}
            <div className="flex items-center">
              <p className="text-lg lg:text-xl leading-relaxed">
                  Crafting modern, user-focused websites with clean layouts,
                  thoughtful typography, and smooth interactions. Every design
                  is tailored to deliver both aesthetic appeal and seamless
                  usability.
              </p>
            </div>

          </div>
        </div>
       <div className="bg-[#E9E9F0] text-black pt-16 lg:pt-20 pb-[23rem] sticky top-1/3">
  <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">
      
    {/* Left side */}
    <div className='flex gap-6 lg:gap-8'>
      <span className="text-gray-400 text-lg lg:text-2xl font-heading tracking-wide block mb-4">02</span>
      <h2 className="text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
        Web Development <br /> & DevOps
      </h2>
    </div>

    {/* Right side */}
    <div className="flex items-center">
      <p className="text-lg lg:text-xl leading-relaxed">
        Crafting modern, high-performance web experiences using the latest
        technologies and frameworks. I build scalable front-end interfaces and
        robust back-end systems integrated with CI/CD pipelines, ensuring smooth
        deployments, optimized performance, and reliable uptime. From responsive
        design to automated workflows, I bridge the gap between development and
        operations for seamless delivery.
      </p>
    </div>

  </div>
        </div>

        <div className="bg-white text-black py-16 lg:py-20 sticky top-2/3">
          <div className="main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">
              
            {/* Left side */}
            <div className='flex gap-6 lg:gap-8'>
              <span className="text-gray-400 text-lg lg:text-2xl font-heading tracking-wide block mb-4">03</span>
              <h2 className="text-[8vw] md:text-6xl font-heading font-bold leading-[1]">
                Animated <br /> Website
              </h2>
            </div>

            {/* Right side */}
            <div className="flex items-center">
              <p className="text-lg lg:text-xl leading-relaxed">
                Bringing ideas to life with smooth, immersive animations that engage users
                and elevate brand storytelling. Using tools like GSAP and Framer Motion, I
                design interactive experiences that feel dynamic yet natural — from subtle
                micro-interactions to full-page transitions — ensuring your website not
                only looks stunning but feels alive.
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Services