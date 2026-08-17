// Single source of truth for identity / contact details.
// Used by the UI *and* by the JSON-LD structured data in index.html,
// so recruiters' parsers and humans always see the same facts.

const site = {
  name: "Sitesh Kumar",
  role: "Full-Stack Developer & DevOps Engineer",
  headline:
    "Full-Stack Developer & DevOps Engineer React.js, Next.js, Node.js, Docker, Kubernetes, AWS & GCP",
  location: "Delhi, India",
  email: "siteshkjha9@gmail.com",
  phone: "+91 8287147677",
  // TODO: replace with your real GitHub profile URL
  github: "https://github.com/siteshkumar",
  linkedin: "https://www.linkedin.com/in/sitesh-kumar-25814a236/",
  instagram: "https://www.instagram.com/sleepless_friend/",
  // Served straight from `public/`, so it also works as a shareable direct link.
  resume: "/sitesh-kumar-resume.pdf",
  resumeFileName: "Sitesh-Kumar-Resume.pdf",
  availability: "Open to full-time roles, freelance projects and collaborations",
};

export default site;
