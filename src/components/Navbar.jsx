import React, { useRef, useState } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import site from './siteData';

gsap.registerPlugin(useGSAP);

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Experience", to: "/#experience" },
  { label: "Projects", to: "/projects" },
];

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const navbarRef = useRef(null);
  const menuRef = useRef(null);

  useGSAP(() => {
    gsap.from(navbarRef.current, {
      opacity: 0,
      y: -100,
      duration: 0.6,
    });
  });

  // Stagger the menu items in each time the overlay opens.
  useGSAP(() => {
    if (!menuOpen) return;
    gsap.from(".menu-link", {
      y: 80,
      opacity: 0,
      duration: 0.5,
      stagger: 0.07,
      ease: "power3.out",
      delay: 0.25,
    });
  }, { dependencies: [menuOpen], scope: menuRef });

  return (
    <>
      <nav ref={navbarRef} className='fixed top-0 z-30 w-full mix-blend-difference' aria-label="Primary">
        <div className='main-container py-6 flex justify-between items-center'>

          {/* Logo */}
          <Link to='/' aria-label={`${site.name} — home`}>
            <div className='text-5xl font-heading-alt'>SK</div>
          </Link>

          {/* Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="menubar flex flex-col gap-1.5 cursor-pointer bg-transparent border-0"
          >
            <span
              className={`inline-block w-10 lg:w-12 h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            ></span>
            {/* Bottom line */}
            <span
              className={`inline-block w-10 lg:w-12 h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <div
        ref={menuRef}
        className={`fixed z-20 inset-0 bg-black text-white flex flex-col items-center justify-center text-3xl gap-4 transition-transform duration-500 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        {links.map(({ label, to }) => (
          <Link key={label} to={to} className='menu-link'>{label}</Link>
        ))}
        <a href={`mailto:${site.email}`} className='menu-link'>Contact</a>
        <a href={site.resume} download className='menu-link'>Resume</a>
      </div>
    </>
  )
}

export default Navbar
