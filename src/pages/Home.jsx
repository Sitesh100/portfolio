import React from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Services from '../sections/Services'
import Skills from '../sections/Skills'
// import Experience from '../sections/Experience'
import Work from '../sections/Work'
import Marquee from '../sections/Marquee'
import Availability from '../sections/Availability'
import CTA from '../components/CTA'

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Skills />
      {/* <Experience /> */}
      <Work />
      <Marquee />
      <Availability />
      <CTA />
    </main>
  )
}

export default Home
