/**
 * Awards and Experiences Data
 * Data-driven entries for the flippable landscape book & magnifying glass showcase
 */

export interface AwardExperienceItem {
  id: string;
  category: 'award' | 'experience';
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  sortDate: string; // ISO format (YYYY-MM) for exact sorting
  endDate?: string; // For experience: end date used in sorting
  badge: string;
  sealJp: string;
  description: string;
  highlights: string[];
  image: string;
  imageCaption: string;
  link: string;
  linkText: string;
  quote?: string;
}

export const rawAwardsExperiences: AwardExperienceItem[] = [
  {
    id: "award-tb-mate",
    category: "award",
    title: "Juara 1 — Lomba Desain UI/UX Tingkat Nasional",
    subtitle: "Aplikasi Mobile Healthcare 'TBMATE' untuk Kepatuhan Pasien TBC",
    organization: "Politeknik Negeri Banyuwangi & Forum IT Nasional",
    date: "Oktober 2024",
    sortDate: "2024-10",
    badge: "JUARA 1 · TINGKAT NASIONAL",
    sealJp: "栄冠",
    description: "Meraih Juara 1 Nasional atas perancangan aplikasi mobile kesehatan 'TBMATE' yang membantu pengawasan minum obat pasien tuberkulosis secara human-centric. Dinilai unggul dalam pengujian prototipe interaktif beresolusi tinggi, penerapan design system Figma yang konsisten, dan pengujian kegunaan bersama tenaga kesehatan.",
    highlights: ["Figma Design System", "User Research & Testing", "Healthcare UX", "High-Fidelity Prototype"],
    image: "/images/projects/tbmate.webp",
    imageCaption: "Dokumentasi Prototipe Mobile Healthcare TBMATE",
    link: "https://www.instagram.com/poliwangi_official/",
    linkText: "Lihat Liputan Instagram ↗",
    quote: "“Kombinasi empati riset pengguna, visual presisi, dan aksesibilitas ramah pasien.”"
  },
  {
    id: "award-fluensy",
    category: "award",
    title: "Finalis Inovasi Terbaik — AI Solution Challenge",
    subtitle: "Platform Prediksi ROI & Penemu Influencer Cerdas 'Fluensy'",
    organization: "Youth Tech & Artificial Intelligence Summit Indonesia",
    date: "Juli 2024",
    sortDate: "2024-07",
    badge: "FINALIS INOVASI TERBAIK",
    sealJp: "革新",
    description: "Terpilih sebagai Finalis Inovasi Terbaik atas pengembangan konsep platform AI 'Fluensy' yang membantu UMKM mencocokkan influencer dengan akurasi tinggi serta menghitung proyeksi ROI kampanye promosi secara otomatis melalui algoritma prediktif.",
    highlights: ["AI Platform Design", "Predictive Analytics UX", "Figma Auto-Layout", "ROI Metrics Dashboard"],
    image: "/images/projects/fluensy.webp",
    imageCaption: "Dashboard Analitik & Smart Matching AI Fluensy",
    link: "https://www.instagram.com/",
    linkText: "Baca Artikel Inovasi ↗",
    quote: "“Menjembatani kecerdasan kalkulasi AI ke dalam visual antarmuka bisnis yang intuitif.”"
  },
  {
    id: "exp-dineqr",
    category: "experience",
    title: "Lead UI/UX Designer & Frontend Developer",
    subtitle: "DineQR — Sistem POS Kasir & Pemesanan Mandiri Meja Restoran",
    organization: "Project-Based Learning Initiative",
    date: "Maret 2024 – Juni 2024",
    sortDate: "2024-06",
    endDate: "2024-06",
    badge: "LEAD ARCHITECT & DEV",
    sealJp: "実務",
    description: "Memimpin perancangan UI/UX komprehensif dan frontend Next.js untuk DineQR, solusi end-to-end pemesanan QR dan POS kasir berbasis cloud. Menghadirkan pelacakan pesanan real-time, kitchen display workflow terintegrasi, dan antarmuka kasir cepat saji.",
    highlights: ["Next.js & Tailwind CSS", "QR Code Engine", "Kitchen Workflow UX", "State Management"],
    image: "/images/projects/dineqr.webp",
    imageCaption: "Antarmuka Meja Pelanggan & Dashboard Kasir DineQR",
    link: "https://github.com/",
    linkText: "Lihat Repositori & Demo ↗",
    quote: "“Meningkatkan efisiensi layanan restoran melalui pemesanan meja tanpa hambatan.”"
  },
  {
    id: "exp-satulangkah",
    category: "experience",
    title: "Full-Stack Engineer & Interaction Designer",
    subtitle: "SatuLangkah — Web App Pendamping Fokus & Micro-Task ADHD",
    organization: "Digital Wellbeing & Social Impact Project",
    date: "Januari 2024 – Mei 2024",
    sortDate: "2024-05",
    endDate: "2024-05",
    badge: "SOLO CREATOR & DEV",
    sealJp: "開発",
    description: "Mengembangkan SatuLangkah secara mandiri (Solo Project) untuk membantu individu neurodiverse yang sering mengalami overwhelm akibat daftar tugas yang menumpuk. Mengubah tugas besar menjadi langkah-langkah mikro terarah dengan visual gamifikasi sederhana.",
    highlights: ["React & Web App", "Behavioral Psychology UX", "Micro-Interactions", "Accessibility First"],
    image: "/images/projects/satulangkah.webp",
    imageCaption: "Aplikasi SatuLangkah Pemecah Tugas Mikro ADHD",
    link: "https://github.com/",
    linkText: "Buka Dokumentasi Proyek ↗",
    quote: "“Satu langkah kecil yang mindful menuju kejernihan fokus dan produktivitas.”"
  },
  {
    id: "exp-lab-poliwangi",
    category: "experience",
    title: "Asisten Laboratorium Informatika & Penerima Dean's List",
    subtitle: "Riset Rekayasa Perangkat Lunak & Bimbingan Praktikum Mahasiswa",
    organization: "Jurusan Bisnis & Informatika — Politeknik Negeri Banyuwangi",
    date: "September 2023 – Februari 2024",
    sortDate: "2024-02",
    endDate: "2024-02",
    badge: "DEAN'S LIST · IPK 3.71",
    sealJp: "優等",
    description: "Mempertahankan prestasi akademik IPK 3.71/4.00 serta dipercaya membimbing mahasiswa tingkat awal pada praktikum Pemrograman Berorientasi Objek dan Rekayasa Web. Turut berkontribusi dalam riset arsitektur frontend modern di laboratorium kampus.",
    highlights: ["Bimbingan Teknis Mahasiswa", "Arsitektur Pemrograman", "Dean's List IPK 3.71", "Lab Research"],
    image: "/images/arifah-photo.webp",
    imageCaption: "Dokumentasi Akademik & Asistensi Lab Informatika POLIWANGI",
    link: "https://poliwangi.ac.id/",
    linkText: "Kunjungi Situs Kampus ↗",
    quote: "“Berbagi ilmu teknis dan memupuk budaya rekayasa perangkat lunak yang kolaboratif.”"
  }
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
