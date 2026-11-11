import { Icons } from "@/components/icons";
import { HomeIcon, Briefcase, Code2, Award, Mail } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Rian Septiawan",
  initials: "RS",
  url: "https://github.com/DanuZen",
  location: "Padang, Indonesia",
  locationLink: "https://www.google.com/maps/place/Padang",
  description:
    "Full Stack Web Developer dengan keahlian dalam pengembangan aplikasi web modern (Next.js, React, TypeScript, NestJS, Laravel).",
  summary:
    "Seorang Full Stack Web Developer dengan keahlian dalam pengembangan aplikasi web modern menggunakan Next.js, React, TypeScript, NestJS, Express.js, dan Laravel. Berpengalaman dalam membangun 11+ proyek production termasuk portal pemerintahan, platform SaaS pendidikan, e-commerce, dan aplikasi berbasis AI. Terampil dalam implementasi sistem multi-tenant, real-time features dengan Socket.IO, dan integrasi payment gateway.",
  avatarUrl: "/foto-profil.jpeg",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "NestJS" },
    { name: "Express.js" },
    { name: "Laravel" },
    { name: "Tailwind CSS" },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MySQL" },
    { name: "MongoDB" },
    { name: "Supabase" },
    { name: "Redis" },
    { name: "Docker", icon: Docker },
    { name: "AWS" },
    { name: "Vercel" },
    { name: "Git" },
    { name: "Socket.IO" },
    { name: "Midtrans" },
    { name: "REST API" },
  ],
  navbar: [
    { href: "/#hero", icon: HomeIcon, label: "Home" },
    { href: "/#work", icon: Briefcase, label: "Experience" },
    { href: "/#projects", icon: Code2, label: "Projects" },
    { href: "/#certifications", icon: Award, label: "Certifications" },
    { href: "/#contact", icon: Mail, label: "Contact" },
  ],
  contact: {
    email: "rianseptiawan@student.unp.ac.id",
    tel: "+6285157617798",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/DanuZen",
        icon: Icons.github,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/ryan.septiawan__",
        icon: Icons.instagram,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:rianseptiawan@student.unp.ac.id",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Full Stack Web Developer (Production & Freelance)",
      href: "https://github.com/DanuZen",
      badges: ["Production", "Remote"],
      location: "Padang, Indonesia",
      title: "Full Stack Web Developer",
      logoUrl: "",
      start: "2024",
      end: "Present",
      description:
        "Mengembangkan 11+ aplikasi web production dengan teknologi modern (Next.js 14/15, NestJS, PostgreSQL, Supabase). Membangun platform SaaS multi-tenant (Buku Induk Kesetaraan) untuk 100+ lembaga pendidikan. Mengimplementasikan AI Integration dengan GPT-4 & Langchain.js (Fintar), serta integrasi payment gateway Midtrans (Hostpro, TokoTech).",
    },
    {
      company: "Wali Nagari Guguak Malalo",
      href: "https://github.com/DanuZen",
      badges: ["Internship", "Government"],
      location: "Guguak Malalo, Sumatera Barat",
      title: "Intern Full Stack Web Developer",
      logoUrl: "",
      start: "2025",
      end: "2025",
      description:
        "Memimpin pengembangan portal layanan publik digital untuk pemerintahan daerah. Membangun sistem autentikasi multi-role aman dengan JWT serta mengimplementasikan fitur notifikasi real-time interaktif menggunakan Socket.IO.",
    },
  ],

  education: [
    {
      school: "Universitas Negeri Padang (UNP)",
      href: "https://unp.ac.id",
      degree: "S1 Pendidikan Teknik Informatika",
      logoUrl: "",
      start: "2021",
      end: "2025",
    },
  ],

  projects: [
    {
      title: "Buku Induk Kesetaraan",
      href: "https://github.com/DanuZen",
      dates: "2024 - Sekarang",
      active: true,
      description:
        "Platform SaaS multi-tenant manajemen sekolah untuk PKBM/SKB yang digunakan oleh 100+ lembaga pendidikan untuk mengelola administrasi, kurikulum, dan data siswa secara terpusat.",
      technologies: [
        "Next.js",
        "NestJS",
        "PostgreSQL",
        "Redis",
        "TypeScript",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/DanuZen",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "ORMAWA UNP",
      href: "https://github.com/DanuZen",
      dates: "2024",
      active: true,
      description:
        "Portal terpadu organisasi mahasiswa Universitas Negeri Padang untuk memfasilitasi pengajuan kegiatan, surat-menyurat, serta koordinasi antar lembaga kemahasiswaan.",
      technologies: ["Laravel 12", "PHP 8.2", "MySQL", "Bootstrap", "REST API"],
      links: [
        {
          type: "Source",
          href: "https://github.com/DanuZen",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Physet",
      href: "https://github.com/DanuZen",
      dates: "2024",
      active: true,
      description:
        "Platform gamifikasi pembelajaran IoT interaktif yang menggabungkan visualisasi game 2D dengan komunikasi data perangkat IoT secara real-time.",
      technologies: [
        "Next.js",
        "Phaser.js",
        "Socket.IO",
        "TypeScript",
        "Node.js",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/DanuZen",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Fintar",
      href: "https://github.com/DanuZen",
      dates: "2024",
      active: true,
      description:
        "Platform manajemen keuangan cerdas berbasis Artificial Intelligence yang memanfaatkan model GPT-4 dan LangChain.js untuk analisis pengeluaran otomatis dan rekomendasi finansial.",
      technologies: [
        "Next.js",
        "NestJS",
        "GPT-4",
        "LangChain.js",
        "MongoDB",
        "TypeScript",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/DanuZen",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "KATUMBA PAUD",
      href: "https://github.com/DanuZen",
      dates: "2024",
      active: true,
      description:
        "Sistem digital monitoring tumbuh kembang anak untuk pendidikan anak usia dini (PAUD), memungkinkan guru dan orang tua memantau riwayat nutrisi, kesehatan, dan perkembangan motorik.",
      technologies: [
        "Next.js",
        "NestJS",
        "Supabase",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/DanuZen",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Hostpro",
      href: "https://github.com/DanuZen",
      dates: "2024",
      active: true,
      description:
        "Platform e-learning dan booking profesional lengkap dengan integrasi payment gateway Midtrans untuk transaksi kursus dan sesi konsultasi instan.",
      technologies: [
        "Next.js",
        "Express.js",
        "Midtrans",
        "Node.js",
        "PostgreSQL",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/DanuZen",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],

  certifications: [
    {
      title: "MikroTik Certified Network Associate (MTCNA)",
      issuer: "MikroTik",
      dates: "2025",
      location: "Network Engineering",
      description:
        "Validasi kompetensi profesional dalam konfigurasi jaringan komputer, routing RouterOS, firewall filtering, bandwidth management, dan wireless networking.",
      image: "",
      links: [
        {
          title: "Verify",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://mikrotik.com",
        },
      ],
    },
    {
      title: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services (AWS)",
      dates: "2024",
      location: "Cloud Architecture",
      description:
        "Validasi kemampuan teknis dalam mengembangkan, menguji, men-deploy, dan mengoptimalkan aplikasi cloud-native menggunakan layanan AWS (Lambda, ECS, DynamoDB, API Gateway, S3, IAM).",
      image: "",
      links: [
        {
          title: "Verify",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://aws.amazon.com/certification",
        },
      ],
    },
  ],
  hackathons: [],
} as const;
