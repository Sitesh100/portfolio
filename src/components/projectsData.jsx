import amomic from "../assets/projects/amomic.png"
import asan from "../assets/projects/asan.png"
import personiks from "../assets/projects/personiks.png"
import tcc from "../assets/projects/tcc.png"
import gomens from "../assets/projects/gomens.png"
import preimer from "../assets/projects/preimer.png"
import trs from "../assets/projects/trs.png"

// `summary` and `stack` are what recruiters and ATS parsers actually read —
// the images are invisible to them. Entries with an empty `stack` render
// without tags, so fill those in when you have a moment.

const projects = [
  {
    id: 1,
    name: "Personiks",
    image: personiks,
    link: "https://personiks.com/",
    role: "Full-Stack Developer",
    summary:
      "Full-stack responsive web application built with Next.js, with HDFC Payment Gateway integration handling the complete payment flow, success/failure states and backend verification. Optimised through image optimisation, lazy loading and code splitting.",
    stack: ["Next.js", "React", "Node.js", "HDFC Payment Gateway", "Tailwind CSS"],
  },
  {
    id: 2,
    name: "Asan Devnest",
    image: asan,
    link: "https://asandevnest.com/",
    role: "Product Lead — Frontend & Backend Architecture",
    summary:
      "Developer platform where I led the frontend team and architected the backend: REST APIs for authentication, admin operations, problem sets and analytics, plus a refactored Mongoose schema design with validations for stronger data integrity.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "REST APIs"],
  },
  {
    id: 3,
    name: "Amomic AI",
    image: amomic,
    link: "https://amomic.in/",
    role: "Web Developer & SEO Specialist",
    summary:
      "React-based product site with a fully responsive layout, API integrations and motion-driven interactions. Search visibility improved through meta tag optimisation, faster page loads, structured data and refined keyword strategy.",
    stack: ["React", "Tailwind CSS", "SEO", "Structured Data"],
  },
  {
    id: 4,
    name: "TRS Property Mall",
    image: trs,
    link: "https://trspropertymall.com",
    role: "Web Developer",
    summary:
      "Real-estate listing website delivered end to end, from client requirements through to production deployment.",
    stack: [], // TODO: add the stack you shipped this with
  },
  {
    id: 5,
    name: "TCC Brand Identity",
    image: tcc,
    link: "https://tccbd.org/",
    role: "Web Developer",
    summary:
      "Brand identity and organisation website built with a responsive, content-led layout.",
    stack: [], // TODO: add the stack you shipped this with
  },
  {
    id: 6,
    name: "Gomens AI",
    image: gomens,
    link: "https://gomens.ai/",
    role: "Web Developer",
    summary:
      "Marketing site for an AI product, focused on responsive layout and interaction design.",
    stack: [], // TODO: add the stack you shipped this with
  },
  {
    id: 7,
    name: "Premier",
    image: preimer,
    link: "https://premier-three.vercel.app/",
    role: "Frontend Developer",
    summary:
      "Animated frontend build deployed on Vercel, exploring scroll-driven motion and layout composition.",
    stack: [], // TODO: add the stack you shipped this with
  },
];

export default projects;
