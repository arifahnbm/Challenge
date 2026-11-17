/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * Edit this file to update any content on your portfolio:
 * - Brand & Logo
 * - Greetings & Rotating Roles
 * - Photo & Personal Information
 * - Social Links (CV, GitHub, LinkedIn)
 */

export const portfolioData = {
  // Brand Header
  brand: {
    name: "ARIFAH MACHI",
    sub: "PORTFOLIO OF ARIFAH",
    logo: "/images/sakura-logo.png",
  },

  // Navigation Links
  navigation: [
    { label: "Temples", jp: "伽藍", href: "#gate" },
    { label: "Gardens", jp: "庭園", href: "#pathways" },
    { label: "Rituals", jp: "神事", href: "#lessons" },
    { label: "Afterlight", jp: "残光", href: "#eternity" },
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
      href: "/cv.pdf", // Link to your CV PDF file in /public/cv.pdf
      isExternal: true,
    },
    {
      id: "github",
      type: "icon",
      icon: "github",
      title: "GitHub",
      fullTitle: "GitHub Profile",
      jp: "開発集",
      href: "https://github.com/",
      isExternal: true,
    },
    {
      id: "linkedin",
      type: "icon",
      icon: "linkedin",
      title: "LinkedIn",
      fullTitle: "LinkedIn Profile",
      jp: "繋がる",
      href: "https://linkedin.com/",
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

  // Footer Information
  footer: {
    logo: "/images/sakura-logo.png",
    description: "Continuously developing technical and teamwork skills to become a responsive, solution-oriented developer ready for the digital era.",
    copyright: "© 2026 Arifah Machi — Portfolio",
    mottoJp: "影の道",
  },
};
