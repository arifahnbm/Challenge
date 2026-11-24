/**
 * Awards and Experiences Data
 * Data-driven entries for the flippable landscape book & magnifying glass showcase
 */

export interface AwardExperienceItem {
  id: string;
  category: 'award' | 'experience';
  title: string;
  subtitle?: string;
  organization: string;
  date: string;
  sortDate: string; // ISO format (YYYY-MM) for exact sorting
  endDate?: string; // For experience: end date used in sorting
  badge: string;
  sealJp?: string;
  description: string;
  highlights: string[];
  image: string;
  link?: string;
  linkText?: string;
  link2?: string;
  linkText2?: string;
  quote?: string;
}

export const rawAwardsExperiences: AwardExperienceItem[] = [
  {
    id: "experience-forbimwangi",
    category: "experience",
    title: "Media Communication & Information Staff",
    subtitle: "Politeknik Negeri Banyuwangi",
    organization: "FORBIMWANGI (Scholarship Student Forum)",
    date: "Dec 2024 – Nov 2025",
    sortDate: "2024-12",
    badge: "Staff",
    description: "As a member of the Medkominfo Division, I am responsible for managing the organization's information and publication media, from visual content design and social media management to event documentation. I am also involved in effectively communicating information to members and the public and collaborating with the team to maintain the organization's image and branding consistency.",
    highlights: ["Visual Design", "Content & Social Media Management", "Documentation", "Organization Communication"],
    image: "/images/expawards/forbim.webp",
    link: "https://www.instagram.com/p/DFddDmlhLuL/?utm_source=ig_web_copy_link&dmpr=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    linkText: "Visit Instagram Coverage ↗",
  },
  {
    id: "award-kmipn25",
    category: "award",
    title: "2nd Winner KMIPN 2025 UX and Accessibility Subcategory Innovation Creation Category",
    subtitle: "2025 National Polytechnic Informatics Student Competition (KMIPN)",
    organization: "Politeknik Negeri Padang",
    date: "October 2025",
    sortDate: "2025-10",
    badge: "2nd Winner",
    description: "Won second place in the Innovation Creation category in the UX and Accessibility Innovation subcategory in the KMIPN by developing a technological innovation aimed at improving medication adherence in TB patients. In this competition, the team developed an application MVP and UI/UX prototype designed to be user-friendly, easily accessible, and to support a more regular and effective treatment process.",
    highlights: ["UX & Accessibility", "Inovation Creation", "KMIPN 2025", "National Competition"],
    image: "/images/expawards/kmipn25.webp",
    link: "https://poliwangi.ac.id/tim-innosuke-poliwangi-raih-prestasi-nasional-pada-ajang-inovasi-teknologi-bidang-tik/",
    linkText: "Visit Achievement Article ↗",
    link2:"https://www.instagram.com/p/DP3bOHxj9I7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    linkText2:"Visit Instagram Coverage ↗"
  },
  {
    id: "exp-jayla",
    category: "experience",
    title: "Mobile Application Developer Intern",
    organization: "Jayla Tech ID",
    date: "February 2026 – June 2026",
    sortDate: "2026-02",
    endDate: "2026-06",
    badge: "Mobile Dev",
    description: "As a Mobile Application Developer, I develop Android applications using Flutter, Firebase, and Google ML Kit to create scalable, responsive, and user-friendly mobile experiences. I also collaborate closely with development teams throughout the development process, contributing to effective teamwork, problem-solving, and the successful delivery of mobile applications.",
    highlights: ["Flutter", "Android", "Firebase", "Google ML Kit", "Teamwork", "Problem Solving"],
    image: "/images/expawards/jayla.webp"
  },
  {
    id: "award-vibecoding",
    category: "award",
    title: "Top 100 - JuaraVibeCoding 2026",
    subtitle: "Juara Vibe Coding 2026",
    organization: "Google Developer Groups (GDG)",
    date: "May 2026",
    sortDate: "2026-05",
    endDate: "2026-05",
    badge: "Top 100",
    description: "Selected as one of the Top 100 participants in JuaraVibeCoding 2026 for developing SatuLangkah, an AI-powered web application that helps people with ADHD and executive dysfunction break overwhelming tasks into manageable steps. Built using Google AI Studio and deployed on Google Cloud. ",
    highlights: ["Web App", "Vibe", "Gemini API", "AI Powered", "Google AI Studio"],
    image: "/images/expawards/jvc.webp",
    link: "https://www.instagram.com/p/DX_N28cEzye/?utm_source=ig_web_copy_link&knvt=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    linkText: "Visit Instagram Coverage ↗",
  },
  {
    id: "award-china",
    category: "award",
    title: "Excellence Award & Finalist AI + Machinary 15th China International Innovation and Entrepreneurship Competition",
    subtitle: "15th China International Innovation and Entrepreneurship Competition",
    organization: "XCMG",
    date: "October 2026",
    sortDate: "2026-10",
    endDate: "2026-10",
    badge: "Excellence Award",
    description: "Successfully advanced to the final round and received the Excellence Award at the 15th China International Innovation and Entrepreneurship Competition by developing an innovative technology solution for heavy equipment operations in the mining industry. Serving as a Front-End Developer, I contributed to building the In-Cab Tablet Operator Interface—a real-time monitoring dashboard designed to help operators track operational parameters and machine conditions. My work encompassed designing an intuitive user interface, translating UI designs into a functional tablet application through front-end slicing and implementation, and integrating real-time sensor data via the MQTT protocol. Additionally, I developed live operational data visualizations—covering strata types (soft/rock), RPM, bucket angle (degrees), and hydraulic pressure—alongside warning and alert interfaces to flag abnormal operating conditions such as high oil temperature, excessive hydraulic pressure, cavitation, and other potential anomalies.",
    highlights: ["Front-End Developer", "In-Cab Tablet Operator Interface", "Real-Time Monitoring Dashboard", "Operational Data Visualization", "Warning and Alert Interfaces"],
    image: "/images/expawards/china.webp",
    link: "https://www.instagram.com/p/DfCFBn8ByvX/?utm_source=ig_web_copy_link&dmpr=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    linkText: "Visit the Finalist Instagram Coverage ↗",
    link2: "https://www.instagram.com/p/DfjJDI7vyGo/?utm_source=ig_web_copy_link&evlk=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    linkText2: "Visit the Excellence Award Instagram Coverage ↗"
  },
  {
    id: "exp-inagata",
    category: "experience",
    title: "Front-End Developer Intern",
    organization: "PT Ina Gata Persada",
    date: "July 2026 – December 2026",
    sortDate: "2026-07",
    endDate: "2026-12",
    badge: "Front-End Developer",
    description: "As a Front-End Developer Intern at Inagata, I contributed to the development of CBT Edupongo, a Computer-Based Test (CBT) platform designed to support digital examination processes for students, teachers, and administrators. Using Vue.js, Bootstrap, and JavaScript, I translated UI/UX designs into functional, responsive web interfaces across student, teacher, and admin dashboards while building reusable components and structured front-end code to maintain consistency across user roles. Additionally, I integrated REST APIs to manage data communication between front-end and back-end systems, collaborating closely with the Back-End Developer team to ensure seamless integration and reliable platform functionality.",
    highlights: ["Vue.js", "Bootstrap", "JavaScript", "Front-End Developer", "Computer Based Test", "CBT Edupongo"],
    image: "/images/expawards/china.webp",
  },
];

/**
 * Sort entries chronologically descending based on:
 * - For experiences: endDate (or date)
 * - For awards: date (or sortDate)
 */
export function getSortedAwardsExperiences(): AwardExperienceItem[] {
  return [...rawAwardsExperiences].sort((a, b) => {
    const keyA = a.category === 'experience' ? (a.endDate || a.sortDate) : a.sortDate;
    const keyB = b.category === 'experience' ? (b.endDate || b.sortDate) : b.sortDate;
    return keyB.localeCompare(keyA);
  });
}

export const sortedAwardsExperiences = getSortedAwardsExperiences();
export const awardsAndExperiences = sortedAwardsExperiences;
export default sortedAwardsExperiences;
