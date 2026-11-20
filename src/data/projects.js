/**
 * @typedef {Object} ProjectFeature
 * @property {string} title
 * @property {string} [title_id]
 * @property {string} description
 * @property {string} [description_id]
 * @property {string} image
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} [title_id]
 * @property {string} description
 * @property {string} [description_id]
 * @property {string} background
 * @property {string} [background_id]
 * @property {string} projectFor
 * @property {string} [projectFor_id]
 * @property {string} image
 * @property {('Design' | 'Website' | 'Mobile')[]} categories
 * @property {string[]} tech
 * @property {string} role
 * @property {string} [role_id]
 * @property {string} year
 * @property {string} status
 * @property {string} [status_id]
 * @property {ProjectFeature[]} features
 * @property {string} [githubLink]
 * @property {string} [demoLink]
 * @property {string} [prototypeLink]
 */

/** @type {Project[]} */
export const projects = [
  {
    id: "dineqr",
    title: "DineQR",
    title_id: "DineQR",
    description: "Smart QR-based digital restaurant ordering and real-time management dashboard system.",
    description_id: "Sistem pemesanan makanan digital berbasis QR code dan dashboard manajemen restoran real-time.",
    background: "Developed to eliminate physical menu bottlenecks, accelerate order-taking, and provide kitchen staff with a live order queue.",
    background_id: "Dikembangkan untuk memotong antrean pemesanan menu fisik dan menyediakan antrean pesanan real-time bagi staf dapur.",
    projectFor: "Academic Capstone Project",
    projectFor_id: "Proyek Capstone Akademik",
    image: "/images/projects/dineqr.webp",
    categories: ["Website", "Mobile"],
    tech: ["Next.js", "Laravel", "MySQL", "Tailwind CSS"],
    role: "Fullstack Developer & UI/UX",
    role_id: "Fullstack Developer & UI/UX",
    year: "2024",
    status: "Completed",
    status_id: "Selesai",
    features: [],
    githubLink: "https://github.com/arifahnbm",
    demoLink: "",
    prototypeLink: "",
  },
  {
    id: "fluensy",
    title: "Fluensy",
    title_id: "Fluensy",
    description: "AI-powered influencer marketing platform helping MSMEs discover matched creators with optimal ROI.",
    description_id: "Platform matchmaking influencer marketing bertenaga AI untuk membantu UMKM menemukan kreator yang tepat dengan ROI optimal.",
    background: "Bridging the gap between small brands and authentic nano/micro-influencers through algorithmic tier evaluation.",
    background_id: "Menjembatani brand lokal dan UMKM dengan kreator nano/mikro melalui evaluasi analitik pintar.",
    projectFor: "Innovation / Competition Project",
    projectFor_id: "Proyek Inovasi / Kompetisi",
    image: "/images/projects/fluensy.webp",
    categories: ["Design", "Website", "Mobile"],
    tech: ["React", "Next.js", "Tailwind CSS", "Figma", "Python"],
    role: "UI/UX Designer & Frontend Developer",
    role_id: "UI/UX Designer & Frontend Developer",
    year: "2024",
    status: "Completed",
    status_id: "Selesai",
    features: [],
    githubLink: "https://github.com/arifahnbm",
    demoLink: "",
    prototypeLink: "",
  },
  {
    id: "satulangkah",
    title: "SatuLangkah",
    title_id: "SatuLangkah",
    description: "Focus and productivity app delivering manageable micro-steps to overcome overwhelm and build continuous momentum.",
    description_id: "Aplikasi produktivitas dan fokus dengan instruksi mikro bertahap untuk mengatasi rasa kewalahan saat menyelesaikan tugas.",
    background: "Designed for individuals facing task paralysis or procrastination by breaking complex tasks into single, achievable actions.",
    background_id: "Dirancang untuk mengatasi prokrastinasi dan executive dysfunction dengan memecah pekerjaan menjadi langkah-langkah kecil.",
    projectFor: "Wellness & Productivity",
    projectFor_id: "Produktivitas & Kesejahteraan Diri",
    image: "/images/projects/satulangkah.webp",
    categories: ["Design", "Website", "Mobile"],
    tech: ["Next.js", "Flutter", "Tailwind CSS", "Figma"],
    role: "UI/UX Designer & Mobile Developer",
    role_id: "UI/UX Designer & Mobile Developer",
    year: "2024",
    status: "Completed",
    status_id: "Selesai",
    features: [],
    githubLink: "https://github.com/arifahnbm",
    demoLink: "",
    prototypeLink: "",
  },
  {
    id: "tbmate",
    title: "TBMATE",
    title_id: "TBMATE",
    description: "Tuberculosis medication tracker and adherence companion app featuring supportive avatars and automatic dosage reminders.",
    description_id: "Aplikasi pendamping kepatuhan minum obat tuberkulosis dengan avatar ramah, jadwal obat, dan pengingat harian otomatis.",
    background: "Tackling the challenge of treatment dropout during long-term 6+ month TB therapy through gamified daily habit tracking.",
    background_id: "Mencegah putus obat pada pengobatan TB jangka panjang (6+ bulan) melalui pemantauan dan pengingat harian yang suportif.",
    projectFor: "Healthcare Mobile App",
    projectFor_id: "Aplikasi Kesehatan Mobile",
    image: "/images/projects/tbmate.webp",
    categories: ["Mobile", "Design"],
    tech: ["Flutter", "Dart", "Firebase", "Figma"],
    role: "Mobile Developer & UI/UX",
    role_id: "Mobile Developer & UI/UX",
    year: "2024",
    status: "Completed",
    status_id: "Selesai",
    features: [],
    githubLink: "https://github.com/arifahnbm",
    demoLink: "",
    prototypeLink: "",
  },
];
