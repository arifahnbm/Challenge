/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * Edit this file to update any content on your portfolio:
 * - Brand & Logo
 * - Greetings & Rotating Roles
 * - Photo & Personal Information
 * - Social Links (CV, GitHub, LinkedIn)
 */

import { projects } from './projects.js';
import { awardsAndExperiences } from './awardsExperiences.js';

export { projects, awardsAndExperiences };

export const portfolioData = {
  // Brand Header
  brand: {
    name: "ARIFAH MACHI",
    sub: "PORTFOLIO OF ARIFAH",
    logo: "/images/sakura-logo.png",
  },

  // Navigation Links
  navigation: [
    { label: "Greeting", jp: "挨拶", href: "#hero" },
    { label: "About", jp: "概要", href: "#gate" },
    { label: "Projects", jp: "作品", href: "#pathways" },
    { label: "Award & Experience", jp: "実績", href: "#lessons" },
    { label: "Contact", jp: "連絡", href: "#eternity" },
  ],

  // Hero Section Content
  hero: {
    chapter: "Chapter 00 — The Greeting",
    greetings: ["Hi!", "こんにちは", "Halo"],
    name: "I'm Arifah Machi",
    roles: ["Software Developer", "AI Engineer", "UI/UX Designer"],
    bio: "Continuously developing technical and teamwork skills to become a responsive, solution-oriented developer ready for the digital era.",
  },

  // Action Buttons (Japanese Hanko Stamp Style)
  stamps: [
    {
      id: "cv",
      type: "text",
      text: "CV",
      title: "CV",
      fullTitle: "Curriculum Vitae",
      jp: "経歴書",
      href: "https://drive.google.com/file/d/14ZmRoPtP_EQqkEVMZZew-QFxVVjrxX9c/view?usp=sharing", // Link to your CV PDF file in /public/cv.pdf
      isExternal: true,
    },
    {
      id: "github",
      type: "icon",
      icon: "github",
      title: "GitHub",
      fullTitle: "GitHub Profile",
      jp: "開発集",
      href: "https://github.com/arifahnbm",
      isExternal: true,
    },
    {
      id: "linkedin",
      type: "icon",
      icon: "linkedin",
      title: "LinkedIn",
      fullTitle: "LinkedIn Profile",
      jp: "繋がる",
      href: "https://linkedin.com/in/arifahnbm",
      isExternal: true,
    },
  ],

  // Profile Card (Washi Photo Card on Hero Section)
  profileCard: {
    image: "/images/arifah-photo.webp",
    alt: "Arifah Machi",
    sealJp: "有葉",
    tagJp: "肖像",
    tagEn: "PORTFOLIO",
    titleJp: "有葉 · ARIFAH",
    subtitle: "Creative Work",
  },

  // Education (Section 01 The Summary)
  education: {
    degree: "Bachelor of Applied Computer Science",
    institution: "Banyuwangi State Polytechnic",
    period: "Aug 2023 – Present",
    location: "Banyuwangi, Indonesia",
    gpa: "3.76",
    gpaScale: "4.00",
  },

  // Summary / Bio (Section 01 The Summary)
  summary: {
    lead: "Hi! I'm Arifah Nur Basyiroh Machi, a student at Banyuwangi State Polytechnic, majoring in Business and Informatics, specializing in UI/UX design, Next.js, Laravel, MySQL, and Flutter.",
    body: "Familiar with project-based learning, I'm learning how to develop web and mobile applications. I'm continuously developing my technical and teamwork skills to become a responsive, solution-oriented developer, ready to face the challenges of the digital era.",
  },

  // Key Strengths / Skills (Section 01 The Summary)
  skills: [
    { title: "Adaptability", category: "Soft Skill" },
    { title: "Continuous Learning", category: "Growth Mindset" },
    { title: "Time Management", category: "Efficiency & Focus" },
    { title: "Problem Solving", category: "Solution-Oriented" },
    { title: "Communication", category: "Teamwork & Clarity" },
  ],

  // Featured Projects (Section 02 The Creations)
  projects: projects,

  // Awards & Experiences (Section 03 The Journey)
  awardsAndExperiences: awardsAndExperiences,

  // Footer Information
  footer: {
    logo: "/images/sakura-logo.png",
    description: "Continuously developing technical and teamwork skills to become a responsive, solution-oriented developer ready for the digital era.",
    copyright: "© 2026 Arifah Machi — Portfolio",
    mottoJp: "影の道",
  },
};
