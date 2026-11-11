import { Icons } from "@/components/icons";
import { HomeIcon, Briefcase, Code2, Award, Mail } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Nestjs } from "@/components/ui/svgs/nestjs";
import { Express } from "@/components/ui/svgs/express";
import { Laravel } from "@/components/ui/svgs/laravel";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Mysql } from "@/components/ui/svgs/mysql";
import { Mongodb } from "@/components/ui/svgs/mongodb";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Redis } from "@/components/ui/svgs/redis";
import { Docker } from "@/components/ui/svgs/docker";
import { Aws } from "@/components/ui/svgs/aws";
import { Vercel } from "@/components/ui/svgs/vercel";
import { Git } from "@/components/ui/svgs/git";
import { Socketio } from "@/components/ui/svgs/socketio";
import { Midtrans } from "@/components/ui/svgs/midtrans";
import { RestApi } from "@/components/ui/svgs/restapi";

export const DATA = {
  name: "Rian Septiawan",
  initials: "RS",
  url: "https://github.com/DanuZen",
  location: "Padang, Indonesia",
  locationLink: "https://www.google.com/maps/place/Padang",
  description:
    "Direktur PT Mbois Solusi Global, Founder Howarts Studio, & Fullstack Cross Platform Developer.",
  summary:
    "Seorang Fullstack Cross Platform Developer dan Tech Leader dengan keahlian mendalam dalam ekosistem web modern (Next.js, React, TypeScript, NestJS, Laravel, dan arsitektur Cloud). Berpengalaman memimpin tim teknologi dan membangun 12+ aplikasi production berskala enterprise, platform SaaS multi-tenant pendidikan, portal akademik universitas, sistem pemerintahan daerah, dan platform berbasis AI & IoT.",
  avatarUrl: "/foto-profil.jpeg",
  skills: [
    { name: "React", icon: ReactLight, category: "frontend" },
    { name: "Next.js", icon: NextjsIconDark, category: "frontend" },
    { name: "TypeScript", icon: Typescript, category: "frontend" },
    { name: "Node.js", icon: Nodejs, category: "backend" },
    { name: "NestJS", icon: Nestjs, category: "backend" },
    { name: "Express.js", icon: Express, category: "backend" },
    { name: "Laravel", icon: Laravel, category: "backend" },
    { name: "Tailwind CSS", icon: Tailwindcss, category: "frontend" },
    { name: "PostgreSQL", icon: Postgresql, category: "database" },
    { name: "MySQL", icon: Mysql, category: "database" },
    { name: "MongoDB", icon: Mongodb, category: "database" },
    { name: "Supabase", icon: Supabase, category: "database" },
    { name: "Redis", icon: Redis, category: "database" },
    { name: "Docker", icon: Docker, category: "cloud" },
    { name: "AWS", icon: Aws, category: "cloud" },
    { name: "Vercel", icon: Vercel, category: "cloud" },
    { name: "Git", icon: Git, category: "cloud" },
    { name: "Socket.IO", icon: Socketio, category: "backend" },
    { name: "Midtrans", icon: Midtrans, category: "backend" },
    { name: "REST API", icon: RestApi, category: "backend" },
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
      company: "PT Mbois Solusi Global",
      href: "#",
      badges: ["Director", "Leadership"],
      location: "Padang, Indonesia",
      title: "Direktur",
      logoUrl: "",
      start: "2024",
      end: "Present",
      description:
        "Memimpin visi strategis, manajemen operasional, dan pengembangan solusi teknologi perangkat lunak berstandar enterprise untuk berbagai klien korporat, instansi pemerintah, dan institusi pendidikan tinggi.",
    },
    {
      company: "Howarts Studio",
      href: "#",
      badges: ["Founder", "Product"],
      location: "Padang, Indonesia",
      title: "Founder & Lead Developer",
      logoUrl: "",
      start: "2024",
      end: "Present",
      description:
        "Mendirikan dan mengembangkan software house independen yang berfokus pada riset dan perancangan produk digital, platform SaaS, serta arsitektur web modern skala tinggi.",
    },
    {
      company: "UK Infitech UNP",
      href: "https://uk-ormawa.unp.ac.id/",
      badges: ["Organization", "President"],
      location: "Universitas Negeri Padang",
      title: "Ketua Umum",
      logoUrl: "",
      start: "2025",
      end: "2026",
      description:
        "Memimpin organisasi kemahasiswaan riset dan inovasi teknologi informasi di Universitas Negeri Padang, mengoordinasikan program pengembangan talenta digital, serta memfasilitasi inkubasi karya teknologi mahasiswa.",
    },
    {
      company: "Fullstack Cross Platform Developer (Production & Freelance)",
      href: "https://github.com/DanuZen",
      badges: ["Fullstack", "Production"],
      location: "Padang, Indonesia",
      title: "Fullstack Cross Platform Developer",
      logoUrl: "",
      start: "2024",
      end: "Present",
      description:
        "Mengembangkan 12+ aplikasi web dan cross-platform level produksi dengan teknologi mutakhir (Next.js 14/15, NestJS, Laravel 12, PostgreSQL, Supabase). Berpengalaman dalam implementasi sistem multi-tenant skala besar, integrasi AI (GPT-4/LangChain), payment gateway Midtrans, dan fitur real-time Socket.IO.",
    },
    {
      company: "Wali Nagari Guguak Malalo",
      href: "#",
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
      title: "SIAKAD ISI Padang Panjang",
      href: "https://siakad.isi-padangpanjang.ac.id/",
      dates: "2024 - Sekarang",
      active: true,
      description:
        "Sistem Informasi Akademik Institut Seni Indonesia (ISI) Padang Panjang untuk pengelolaan perkuliahan, registrasi mahasiswa, KRS, penilaian dosen, dan administrasi akademik terpadu.",
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Tailwind CSS", "REST API"],
      links: [
        {
          type: "Website",
          href: "https://siakad.isi-padangpanjang.ac.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "SINERGIS LPPM ISI Padang Panjang",
      href: "https://sinergis.isi-padangpanjang.ac.id/",
      dates: "2024 - Sekarang",
      active: true,
      description:
        "Sistem Informasi Manajemen Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) ISI Padang Panjang untuk pengelolaan proposal hibah riset, pengabdian masyarakat, dan publikasi ilmiah.",
      technologies: ["Laravel", "PHP", "PostgreSQL", "REST API", "Tailwind CSS", "Bootstrap"],
      links: [
        {
          type: "Website",
          href: "https://sinergis.isi-padangpanjang.ac.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Sumatrans Travel",
      href: "https://sumatrans.co.id/",
      dates: "2024",
      active: true,
      description:
        "Sistem manajemen travel dan transportasi antarkota terintegrasi dengan pemesanan tiket online, manajemen armada/jadwal, pemilihan kursi interaktif, dan integrasi payment gateway Midtrans.",
      technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Midtrans", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://sumatrans.co.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "SiCanting (Deteksi & Pemantauan Stunting)",
      href: "https://sicanting.app/",
      dates: "2024 - Sekarang",
      active: true,
      description:
        "Platform terintegrasi untuk deteksi dini, pencatatan antropometri balita, dan pemantauan intervensi stunting bagi tenaga kesehatan posyandu dan puskesmas secara terpusat.",
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "PWA"],
      links: [
        {
          type: "Website",
          href: "https://sicanting.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Replan Works",
      href: "https://replan.works/",
      dates: "2024 - Sekarang",
      active: true,
      description:
        "Platform SaaS terintegrasi manajemen proyek modern dengan pelacakan tugas kolaboratif, timeline sprint, alokasi beban kerja tim, dan pelaporan produktivitas real-time.",
      technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "TypeScript", "Socket.IO"],
      links: [
        {
          type: "Website",
          href: "https://replan.works/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "KATUMBA PAUD Kota Bukittinggi",
      href: "https://katumbapaud.bukittinggikota.go.id/",
      dates: "2024",
      active: true,
      description:
        "Sistem digital monitoring dan pencatatan perkembangan anak-anak Pendidikan Anak Usia Dini (PAUD) resmi Pemerintah Kota Bukittinggi untuk pemantauan tumbuh kembang dan riwayat gizi.",
      technologies: ["Next.js", "NestJS", "PostgreSQL", "Supabase", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://katumbapaud.bukittinggikota.go.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Buku Induk Kesetaraan",
      href: "https://bukuinduk-kesetaraan.bukittinggikota.go.id/",
      dates: "2024 - Sekarang",
      active: true,
      description:
        "Platform SaaS manajemen sekolah untuk pendidikan non-formal (PKBM/SKB) Kota Bukittinggi yang digunakan oleh 100+ lembaga untuk pengelolaan data induk peserta didik (Paket A, B, C).",
      technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "TypeScript", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://bukuinduk-kesetaraan.bukittinggikota.go.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "MedClass",
      href: "https://medclass.id/",
      dates: "2024",
      active: true,
      description:
        "Platform manajemen medical course for students dan persiapan UKMPPD dengan video pembelajaran interaktif, bank soal medis, simulasi ujian, dan pembayaran otomatis.",
      technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Midtrans", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://medclass.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Phyxel Games",
      href: "https://phyxel.games/",
      dates: "2024",
      active: true,
      description:
        "Platform gamifikasi edukasi IoT inovatif yang memadukan visualisasi game 2D berbasis web dengan transmisi data sensor perangkat keras IoT secara real-time.",
      technologies: ["Next.js", "Phaser.js", "Socket.IO", "TypeScript", "Node.js", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://phyxel.games/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "UK-ORMAWA UNP",
      href: "https://uk-ormawa.unp.ac.id/",
      dates: "2024",
      active: true,
      description:
        "Portal resmi Organisasi Mahasiswa Universitas Negeri Padang untuk memfasilitasi legalitas ormawa, pengajuan proposal kegiatan, perizinan, dan koordinasi kemahasiswaan terpadu.",
      technologies: ["Laravel 12", "PHP 8.2", "MySQL", "REST API", "Bootstrap"],
      links: [
        {
          type: "Website",
          href: "https://uk-ormawa.unp.ac.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "PIAGEX (Padang Int. Animation & Game EXPO)",
      href: "https://piagex.id/",
      dates: "2024",
      active: true,
      description:
        "Platform event end-to-end expo internasional animasi dan game tahunan di Padang, mencakup registrasi peserta, kurasi karya pameran, ticketing, dan jadwal expo.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma ORM"],
      links: [
        {
          type: "Website",
          href: "https://piagex.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "HotelHub",
      href: "https://hotelhub.social/",
      dates: "2024",
      active: true,
      description:
        "Platform manajemen hotel dan hospitality terintegrasi untuk reservasi kamar online, sinkronisasi ketersediaan kamar real-time, manajemen tamu, dan sistem kasir/POS.",
      technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://hotelhub.social/",
          icon: <Icons.globe className="size-3" />,
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
