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
    projectFor: "Project-Based Learning & Seblang Restaurant",
    projectFor_id: "Pembelajaran Berbasis Proyek & Restoran Seblang",
    image: "/images/projects/dineqr.webp",
    categories: ["Website"],
    tech: ["Laravel", "MySQL", "Tailwind CSS"],
    role: "Fullstack Developer & Leader Team",
    role_id: "Pengembang Fullstack & Ketua Tim",
    year: "2025",
    status: "Completed",
    status_id: "Selesai",
    features: [{
      title: "Real-time Menu",
      description: "Real-time menu updates with stock status information.",
      image: "/images/projects/dineqr/feature1.webp",
    }, {
      title: "Ordering & Payment Management",
      description: "Efficient order and payment management through an integrated system.",
      image: "/images/projects/dineqr/feature2.webp",
    }, {
      title: "Admin Dashboard",
      description: "Comprehensive admin dashboard for monitoring sales and performance metrics.",
      image: "/images/projects/dineqr/feature3.webp",
    }, {
      title: "Menu & Stock Management",
      description: "Intuitive interface for managing menu items and tracking inventory levels.",
      image: "/images/projects/dineqr/feature4.webp",
    }],
    githubLink: "https://github.com/arifahnbm/DineQR.git",
  },
  {
    id: "fluensy",
    title: "Fluensy",
    title_id: "Fluensy",
    description: "AI-powered influencer marketing platform helping MSMEs discover matched creators with optimal ROI.",
    description_id: "Platform matchmaking influencer marketing bertenaga AI untuk membantu UMKM menemukan kreator yang tepat dengan ROI optimal.",
    background: "Bridging the gap between small brands and authentic nano/micro-influencers through algorithmic tier evaluation.",
    background_id: "Menjembatani brand lokal dan UMKM dengan kreator nano/mikro melalui evaluasi analitik pintar.",
    projectFor: "Early-Stage Tech Startup",
    projectFor_id: "Startup Teknologi Tahap Awal",
    image: "/images/projects/fluensy.webp",
    categories: ["Design", "Website"],
    tech: ["Next.js", "Tailwind CSS", "Figma", "Laravel"],
    role: "Chief Design Officer & Front-End Developer",
    role_id: "Ketua Divisi Desain & Pengembang Front-End",
    year: "2026",
    status: "Ongoing",
    status_id: "Sedang Dikerjakan",
    features: [{
      title: "Smart Influencer Matching",
      description: "AI-powered matching system to connect brands with relevant influencers based on audience demographics and engagement metrics.",
      image: "/images/projects/fluensy/feature1.webp",
    }, {
      title: "Fake Follower Detection",
      description: "AI-powered detection system to identify and filter out fake followers from brand audiences.",
      image: "/images/projects/fluensy/feature2.webp",
    }, {
      title: "Budget Optimization",
      description: "AI-powered budget optimization system to allocate promotion budgets based on real-time performance data.",
      image: "/images/projects/fluensy/feature3.webp",
    }, {
      title: "Rate Card for Influencers",
      description: "AI-powered rate card system to set fair pricing for influencer collaborations based on their reach and engagement.",
      image: "/images/projects/fluensy/feature4.webp",
    }],
    demoLink: "https://fluensy.web.id/",
    prototypeLink: "https://figma.com/proto/fluensy",
  },
  {
    id: "satulangkah",
    title: "SatuLangkah",
    title_id: "SatuLangkah",
    description: "Focus and productivity app delivering manageable micro-steps to overcome overwhelm and build continuous momentum.",
    description_id: "Aplikasi produktivitas dan fokus dengan instruksi mikro bertahap untuk mengatasi rasa kewalahan saat menyelesaikan tugas.",
    background: "Designed for individuals facing task paralysis or procrastination by breaking complex tasks into single, achievable actions.",
    background_id: "Dirancang untuk mengatasi prokrastinasi dan executive dysfunction dengan memecah pekerjaan menjadi langkah-langkah kecil.",
    projectFor: "Google Juara Vibe Coding Competition",
    projectFor_id: "Kompetisi Coding Google Juara Vibe",
    image: "/images/projects/satulangkah.webp",
    categories: ["Website"],
    tech: ["Next.js", "Tailwind CSS", "Gemini API"],
    role: "Fullstack Developer & AI Engineer",
    role_id: "Pengembang Fullstack & Insinyur AI",
    year: "2026",
    status: "Completed",
    status_id: "Selesai",
    features: [{
      title: "AI-Powered Object Recognition",
      description: "AI-powered object recognition to identify items in the user's room and provide tailored tidying suggestions.",
      image: "/images/projects/satulangkah/feature1.webp",
    }, {
      title: "AI-Powered Task Breakdown",
      description: "AI-powered task breakdown to simplify complex tidying tasks into manageable steps.",
      image: "/images/projects/satulangkah/feature2.webp",
    }],
    demoLink: "https://satulangkah.vercel.app/",
    
  },
  {
    id: "tbmate",
    title: "TBMATE",
    title_id: "TBMATE",
    description: "Tuberculosis medication tracker and adherence companion app featuring supportive avatars and automatic dosage reminders.",
    description_id: "Aplikasi pendamping kepatuhan minum obat tuberkulosis dengan avatar ramah, jadwal obat, dan pengingat harian otomatis.",
    background: "Tackling the challenge of treatment dropout during long-term 6+ month TB therapy through gamified daily habit tracking.",
    background_id: "Mencegah putus obat pada pengobatan TB jangka panjang (6+ bulan) melalui pemantauan dan pengingat harian yang suportif.",
    projectFor: "KMIPN 2025 & Health Department Kabat, Banyuwangi",
    projectFor_id: "KMIPN 2025 & Dinas Kesehatan Kabat, Banyuwangi",
    image: "/images/projects/tbmate.webp",
    categories: ["Mobile", "Design"],
    tech: ["Flutter", "Dart", "Firebase", "Figma", "Google ML Kit"],
    role: "Mobile Developer, UI/UX Designer, & KMIPN 2025 Team Leader",
    role_id: "Mobile Developer, UI/UX Designer, & Ketua Tim KMIPN 2025",
    year: "2025-2026",
    status: "Completed",
    status_id: "Selesai",
    features: [{
      title: "Automated Medication Scheduling",
      description: "Automated medication scheduling to ensure patients take their pills on time.",
      image: "/images/projects/tbmate/feature1.webp",
    }, {
      title: "Real-time Reminder Alarm",
      description: "Real-time reminders to ensure patients take their medication on time.",
      image: "/images/projects/tbmate/feature2.webp",
    }, {
      title: "AI-based Pill Ingestion Verification",
      description: "AI-based pill ingestion verification to ensure patients take their medication correctly.",
      image: "/images/projects/tbmate/feature3.webp",
    }, {
      title: "Integration with Health Workers and Companions",
      description: "Integration with health workers and companions to provide support and monitoring for patients.",
      image: "/images/projects/tbmate/feature4.webp",
    }],
    demoLink: "https://tbmate.vercel.app/",
    prototypeLink: "https://www.figma.com/proto/2uouv7GYnoVqn3BQDBz9sK/TBMATE-KMIPN?node-id=807-59907&viewport=-3667%2C1185%2C0.16&t=VaIlyzd4BPv9OpFa-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=807%3A59907&page-id=806%3A29884&show-proto-sidebar=1",
  },
];
