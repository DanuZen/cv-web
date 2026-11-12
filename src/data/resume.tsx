import { Icons } from "@/components/icons";
import { HomeIcon, Briefcase, Code2, Award, Mail } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Nuxt } from "@/components/ui/svgs/nuxt";
import { Flutter } from "@/components/ui/svgs/flutter";
import { Expo } from "@/components/ui/svgs/expo";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { GoFiber } from "@/components/ui/svgs/gofiber";
import { Laravel } from "@/components/ui/svgs/laravel";
import { FastAPI } from "@/components/ui/svgs/fastapi";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { NoSQL } from "@/components/ui/svgs/nosql";
import { ORM } from "@/components/ui/svgs/orm";
import { Linux } from "@/components/ui/svgs/linux";
import { Proxmox } from "@/components/ui/svgs/proxmox";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Grafana } from "@/components/ui/svgs/grafana";
import { Nginx } from "@/components/ui/svgs/nginx";
import { PM2 } from "@/components/ui/svgs/pm2";
import { CICD } from "@/components/ui/svgs/cicd";
import { GitHub } from "@/components/ui/svgs/github";
import { GitLab } from "@/components/ui/svgs/gitlab";
import { Aws } from "@/components/ui/svgs/aws";
import { Azure } from "@/components/ui/svgs/azure";
import { GoogleCloud } from "@/components/ui/svgs/googlecloud";
import { Jupyter } from "@/components/ui/svgs/jupyter";

export const DATA = {
  name: "Rian Septiawan",
  initials: "RS",
  url: "https://github.com/Ryan-infitech",
  location: "Padang, Indonesia",
  locationLink: "https://www.google.com/maps/place/Padang",
  description:
    "Director at PT Mbois Solusi Global, Founder of Howarts Studio, & Full-Stack Cross-Platform Developer.",
  summary:
    "Full-Stack Cross-Platform Developer and Tech Leader with deep expertise in modern web ecosystems (Next.js, React, TypeScript, NestJS, Laravel, and Cloud architectures). Experienced in leading engineering teams and building 12+ enterprise-grade production applications, multi-tenant educational SaaS platforms, university academic portals, local government digital services, and AI & IoT-powered solutions.",
  avatarUrl: "/foto-profil.jpeg",
  skills: [
    // Frontend
    { name: "React", icon: ReactLight, category: "frontend" },
    { name: "Next.js", icon: NextjsIconDark, category: "frontend" },
    { name: "Nuxt", icon: Nuxt, category: "frontend" },
    { name: "Flutter", icon: Flutter, category: "frontend" },
    { name: "Expo", icon: Expo, category: "frontend" },

    // Backend
    { name: "Node.js", icon: Nodejs, category: "backend" },
    { name: "GoFiber", icon: GoFiber, category: "backend" },
    { name: "Laravel", icon: Laravel, category: "backend" },
    { name: "FastAPI", icon: FastAPI, category: "backend" },

    // Database
    { name: "PostgreSQL", icon: Postgresql, category: "database" },
    { name: "NoSQL", icon: NoSQL, category: "database" },
    { name: "ORM", icon: ORM, category: "database" },

    // DevOps
    { name: "Linux", icon: Linux, category: "devops" },
    { name: "Proxmox", icon: Proxmox, category: "devops" },
    { name: "Docker", icon: Docker, category: "devops" },
    { name: "Kubernetes", icon: Kubernetes, category: "devops" },
    { name: "Grafana", icon: Grafana, category: "devops" },
    { name: "Nginx", icon: Nginx, category: "devops" },
    { name: "PM2", icon: PM2, category: "devops" },
    { name: "CI/CD", icon: CICD, category: "devops" },

    // Tools
    { name: "GitHub", icon: GitHub, category: "tools" },
    { name: "GitLab", icon: GitLab, category: "tools" },
    { name: "AWS", icon: Aws, category: "tools" },
    { name: "Azure", icon: Azure, category: "tools" },
    { name: "Google Console", icon: GoogleCloud, category: "tools" },
    { name: "JupyterLab", icon: Jupyter, category: "tools" },
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
        url: "https://github.com/Ryan-infitech",
        icon: Icons.github,
        navbar: false,
      },
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/ryan.septiawan__",
        icon: Icons.instagram,
        navbar: false,
      },
      Email: {
        name: "Email",
        url: "mailto:rianseptiawan@student.unp.ac.id",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "PT Mbois Solusi Global",
      href: "#",
      badges: ["Director", "Leadership"],
      location: "Padang, Indonesia",
      title: "Director",
      logoUrl: "/pt-mbois-black.png",
      start: "2024",
      end: "Present",
      description:
        "Leading strategic vision, operational execution, and enterprise-grade software engineering for corporate clients, government agencies, and higher education institutions.",
    },
    {
      company: "Howarts Studio",
      href: "#",
      badges: ["Founder", "Product"],
      location: "Padang, Indonesia",
      title: "Founder & Lead Developer",
      logoUrl: "/howarts-studio.png",
      start: "2024",
      end: "Present",
      description:
        "Founded and scaled an independent software agency focused on digital product research & engineering, scalable SaaS platforms, and high-load modern web architectures.",
    },
    {
      company: "UK Infitech UNP",
      href: "https://uk-ormawa.unp.ac.id/",
      badges: ["Organization", "President"],
      location: "Universitas Negeri Padang",
      title: "President & Tech Lead",
      logoUrl: "/infinite-technologi.png",
      start: "2025",
      end: "2026",
      description:
        "Led the student research and IT innovation organization at Universitas Negeri Padang, coordinating digital talent incubation programs and accelerating student tech initiatives.",
    },
    {
      company: "Fullstack Cross Platform Developer (Production & Freelance)",
      href: "https://github.com/Ryan-infitech",
      badges: ["Fullstack", "Production"],
      location: "Padang, Indonesia",
      title: "Full-Stack Cross-Platform Developer",
      logoUrl: "",
      start: "2024",
      end: "Present",
      description:
        "Engineered and shipped 12+ production web and cross-platform applications leveraging Next.js 14/15, NestJS, Laravel 12, PostgreSQL, and Supabase. Experienced in large-scale multi-tenant architectures, AI integrations (GPT-4 / LangChain), Midtrans payment gateway, and Socket.IO real-time capabilities.",
    },
    {
      company: "Wali Nagari Guguak Malalo",
      href: "#",
      badges: ["Internship", "Government"],
      location: "Guguak Malalo, West Sumatra",
      title: "Intern Full-Stack Web Developer",
      logoUrl: "/kab-tanah-datar.png",
      start: "2025",
      end: "2025",
      description:
        "Spearheaded the development of a digital public services portal for the regional government. Built secure multi-role JWT authentication and interactive real-time notifications via Socket.IO.",
    },
  ],

  education: [
    {
      school: "Universitas Negeri Padang (UNP)",
      href: "https://unp.ac.id",
      degree: "Bachelor of Education in Informatics & Computer Engineering",
      logoUrl: "/universitas-negeri-padang.png",
      start: "2021",
      end: "2025",
    },
  ],

  projects: [
    {
      title: "SIAKAD ISI Padang Panjang",
      href: "https://siakad.isi-padangpanjang.ac.id/",
      dates: "2024 - Present",
      active: true,
      description:
        "Integrated Academic Information System for Institut Seni Indonesia (ISI) Padang Panjang, managing course scheduling, student registrations, study plans (KRS), grading, and unified campus administration.",
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
      dates: "2024 - Present",
      active: true,
      description:
        "Research & Community Service Management Information System (LPPM) for ISI Padang Panjang, facilitating research grant proposals, community service programs, and scientific publication tracking.",
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
        "Integrated intercity transportation and travel management platform featuring online ticket booking, fleet & route scheduling, interactive seat selection, and Midtrans payment gateway integration.",
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
      title: "SiCanting (Stunting Detection & Monitoring)",
      href: "https://sicanting.app/",
      dates: "2024 - Present",
      active: true,
      description:
        "Centralized healthcare platform for early stunting detection, infant anthropometric logging, and nutritional intervention tracking for community clinics and public healthcare centers.",
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
      dates: "2024 - Present",
      active: true,
      description:
        "Integrated SaaS project management platform featuring collaborative task tracking, sprint timelines, team workload balancing, and real-time productivity analytics.",
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
      title: "KATUMBA Early Childhood Education Portal",
      href: "https://katumbapaud.bukittinggikota.go.id/",
      dates: "2024",
      active: true,
      description:
        "Official digital monitoring and developmental tracking system for Early Childhood Education (PAUD) by the Bukittinggi City Government, tracking child milestones and nutritional history.",
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
      title: "Equivalency Master Register (Buku Induk)",
      href: "https://bukuinduk-kesetaraan.bukittinggikota.go.id/",
      dates: "2024 - Present",
      active: true,
      description:
        "School management SaaS platform for non-formal education centers (PKBM/SKB) across Bukittinggi City, utilized by 100+ institutions for student master records (Package A, B, C).",
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
        "Medical course management and exam preparation platform featuring interactive instructional videos, medical question banks, timed mock exams, and automated payment processing.",
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
        "Innovative IoT educational gamification platform combining 2D browser-based canvas rendering with real-time sensor telemetry from connected hardware devices.",
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
      title: "UK-ORMAWA Student Organization Portal",
      href: "https://uk-ormawa.unp.ac.id/",
      dates: "2024",
      active: true,
      description:
        "Official student affairs portal for Universitas Negeri Padang, facilitating organizational accreditation, activity proposals, event permits, and campus-wide governance.",
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
        "End-to-end event platform for the annual international animation and gaming expo in Padang, handling attendee registration, exhibit curation, ticketing, and scheduling.",
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
        "Integrated hotel and hospitality management solution featuring real-time room availability sync, online booking, guest administration, and point-of-sale (POS) cashier systems.",
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
        "Professional certification validating computer networking competence, RouterOS routing configurations, firewall filtering, bandwidth traffic shaping, and wireless networking.",
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
        "Technical validation of proficiency in architecting, developing, deploying, and maintaining cloud-native applications on AWS (Lambda, ECS, DynamoDB, API Gateway, S3, IAM).",
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
