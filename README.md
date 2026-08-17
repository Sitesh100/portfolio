# Sitesh Kumar — Portfolio

Personal portfolio of **Sitesh Kumar**, Full-Stack Developer & DevOps Engineer.
Built with React 19, Vite, Tailwind CSS v4 and GSAP.

**Stack:** React.js · Next.js · Node.js · Express · MongoDB · Docker · Kubernetes · AWS · GCP · Terraform · CI/CD

---

## Features

- **Recruiter-first content** — experience timeline, education, quantified
  achievements, categorised skills and per-project stack/role detail, all as
  real text an ATS can parse.
- **Structured data** — `schema.org/Person` JSON-LD in `index.html` covering
  role, education, skills and contact details, plus Open Graph and Twitter
  cards and a `<noscript>` fallback.
- **GSAP motion** — ScrollTrigger pinning, horizontal project scroll, SplitText
  reveals, DrawSVG line animations, magnetic buttons, a scroll-progress bar and
  a blend-mode cursor.
- **Cursor-tracking eyes** — `src/components/Eyes.jsx`, driven by `gsap.quickTo`
  with randomised blinking and idle glancing on touch devices.
- **Accessible by default** — semantic landmarks, labelled links and icons, and
  every animation gated behind `prefers-reduced-motion`.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
```

---

## Editing content

All copy lives in data files — no need to touch components:

| File | Contents |
| --- | --- |
| `src/components/siteData.jsx` | Name, role, email, phone, social links, resume path |
| `src/components/experienceData.jsx` | Work history and education |
| `src/components/projectsData.jsx` | Projects: role, summary, tech stack |
| `src/components/skillsData.jsx` | Skill categories |
| `index.html` | Meta tags and JSON-LD structured data |

### Resume

The PDF lives at `public/sitesh-kumar-resume.pdf`, so it's also reachable as a
direct shareable link at `/sitesh-kumar-resume.pdf`.

Every "View Resume" link — hero, contact CTA, nav menu, footer — opens that
URL in a new tab, where the browser's own PDF viewer handles preview,
download and print. To swap the file, replace it in `public/` and update
`resume` in `siteData.jsx`.

### Before deploying

1. Set your real GitHub URL in `src/components/siteData.jsx` and in the
   `sameAs` array in `index.html`.
3. Replace `https://siteshkumar.com/` in `index.html` (canonical, `og:url`,
   `og:image`) with your live domain, and add `public/og-image.png` at
   1200×630.
4. Fill the `stack: []` arrays marked `TODO` in `projectsData.jsx`.
5. Compress the project screenshots in `src/assets/projects/` — several are
   over 1 MB, which drags down Largest Contentful Paint.
