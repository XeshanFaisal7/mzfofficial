const SOCIAL = {
  github: "https://github.com/XeshanFaisal7/",
  linkedin: "https://www.linkedin.com/in/muhammad-zeeshan-faisal-28300b2a2/",
  indeed: "https://profile.indeed.com/?hl=en_US&co=US&from=gnav-homepage",
  instagram: "https://www.instagram.com/xeshan_faisal7/",
  facebook: "https://www.facebook.com/ch.zeeshanfaisal/",
  x: "https://x.com/zeeshanfaisal69",
} as const;

export const SOCIAL_LINKS = [
  { key: "github", label: "GitHub", href: SOCIAL.github },
  { key: "linkedin", label: "LinkedIn", href: SOCIAL.linkedin },
  { key: "indeed", label: "Indeed", href: SOCIAL.indeed },
  { key: "instagram", label: "Instagram", href: SOCIAL.instagram },
  { key: "facebook", label: "Facebook", href: SOCIAL.facebook },
  { key: "x", label: "X", href: SOCIAL.x },
] as const;

export const QUICK_LINKS = [
  { label: "Home", hash: "#hero" },
  { label: "Projects", hash: "#projects" },
  { label: "About", hash: "#about" },
  { label: "Skills", hash: "#skills" },
  { label: "Experience", hash: "#experience" },
  { label: "Certifications", hash: "#certifications" },
  { label: "Services", hash: "#services" },
  { label: "Testimonials", hash: "#testimonials" },
  { label: "Contact", hash: "#contact" },
] as const;

/** Primary nav items (excludes Home + Contact — logo and CTA cover those). */
export const NAV_LINKS = QUICK_LINKS.filter(
  (link) => link.hash !== "#hero" && link.hash !== "#contact"
);

export const SITE = {
  name: "M.Zeeshan Faisal",
  role: "Software Engineer",
  tagline:
    "Full-stack software engineering with a focus on scalable backends, polished frontends, and user-centered design.",
  email: "zeeshanfaisal69@gmail.com",
  city: "Sargodha",
  country: "Pakistan",
  location: "Sargodha, Pakistan",
  phones: [
    { label: "Pakistan", number: "+923046888676", href: "tel:+923046888676" },
    { label: "UAE", number: "+971521715950", href: "tel:+971521715950" },
  ],
  whatsapp: "https://wa.me/923046888676",
  social: SOCIAL,
  availability: "Available for new projects",
};

export const HERO_ROLES = [
  "Full Stack Developer",
  "Laravel Expert",
  "React Developer",
  "AI Integration Specialist",
  "Software Engineer",
];

export const ABOUT_STATS = [
  { label: "Years of experience", value: "6", suffix: "+" },
  { label: "Projects delivered", value: "30", suffix: "+" },
  { label: "Full-stack capability", value: "End", suffix: "-to-end" },
];

export const ABOUT_HIGHLIGHTS = [
  {
    title: "Systems thinking",
    body: "I design scalable APIs and data models built for production environments.",
  },
  {
    title: "Frontend development",
    body: "Performance, accessibility, and usability are core priorities in every build.",
  },
  {
    title: "Partnership",
    body: "Clear communication, realistic timelines, and end-to-end project ownership.",
  },
];

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Databases"
  | "CMS"
  | "Cloud/Hosting"
  | "Payment Integrations"
  | "AI Tools";

export const SKILLS: Record<SkillCategory, string[]> = {
  Frontend: ["JavaScript", "React", "Tailwind", "Bootstrap", "jQuery"],
  Backend: ["PHP", "Laravel", "CodeIgniter", "Inertia.js", "Astro", "REST APIs"],
  Databases: ["MySQL", "SQLite"],
  CMS: ["WordPress", "Shopify", "Microsoft CRM", "Pixxi CRM"],
  "Cloud/Hosting": ["GitHub", "AWS", "Hostinger", "HostGator"],
  "Payment Integrations": ["Stripe", "Geidea"],
  "AI Tools": [
    "Codex",
    "OpenCode",
    "Antigravity",
    "Cursor",
    "Claude",
    "Kimi",
    "Windsurf",
    "GitHub Copilot",
  ],
};

export type Project = {
  title: string;
  role: string;
  description: string;
  responsibilities: string[];
  stack: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "Pulseberry eCompliance",
    role: "Senior Full Stack Developer",
    description:
      "A comprehensive multi-vendor compliance and learning management platform that provides e-learning, e-testing, e-books, e-shopping, and e-audit functionalities through a single system.",
    responsibilities: [
      "Developed complete backend architecture.",
      "Designed and implemented user, expert, and admin modules.",
      "Integrated shopping cart and checkout system.",
      "Developed order management and reporting modules.",
      "Implemented email notifications and subscription features.",
      "Integrated PDF generation and CSV exports.",
      "Added Google reCAPTCHA and security features.",
      "Optimized database and application performance.",
    ],
    stack: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "jQuery", "AJAX", "Bootstrap", "FPDF"],
    featured: true,
  },
  {
    title: "Pulseberry eAudit",
    role: "Senior Full Stack Developer",
    description:
      "Enterprise audit management platform that allows organizations to create templates, perform audits, manage auditors, upload evidence, track progress, and generate audit reports.",
    responsibilities: [
      "Developed audit creation and management workflows.",
      "Implemented dynamic questionnaire system.",
      "Developed auditor and site management modules.",
      "Created evidence upload functionality with AWS S3 integration.",
      "Developed audit scoring and progress tracking.",
      "Generated professional PDF reports.",
      "Implemented role-based permissions and access control.",
    ],
    stack: ["Laravel 11", "MySQL", "AWS S3", "JavaScript", "jQuery", "AJAX", "Bootstrap", "DomPDF"],
    featured: true,
  },
  {
    title: "Pulseberry eTest",
    role: "Senior Full Stack Developer",
    description:
      "Online examination and certification platform designed for employee training and assessment programs.",
    responsibilities: [
      "Developed examination engine.",
      "Created timer-based assessment functionality.",
      "Implemented auto-save and progress recovery.",
      "Developed certificate generation system.",
      "Built candidate management and reporting modules.",
      "Implemented result calculation and grading logic.",
    ],
    stack: ["CodeIgniter", "PHP", "MySQL", "JavaScript", "AJAX", "Bootstrap"],
    featured: true,
  },
  {
    title: "Adaptive AI",
    role: "Software Engineer",
    description:
      "AI-powered platform designed to automate business workflows using Artificial Intelligence and Large Language Models.",
    responsibilities: [
      "Developed Laravel and React-based application architecture.",
      "Integrated OpenAI APIs and AI services.",
      "Developed AI chatbot functionality.",
      "Created document enhancement and AI content generation modules.",
      "Implemented user authentication and subscription management.",
      "Developed API integrations and AI workflow automation.",
    ],
    stack: ["Laravel", "React.js", "Inertia.js", "OpenAI API", "MySQL", "Tailwind CSS"],
    featured: true,
  },
  {
    title: "Dania Property Management System",
    role: "Senior Full Stack Developer",
    description:
      "Property and tenant management platform designed for residential communities and property management companies.",
    responsibilities: [
      "Developed complaint management module.",
      "Implemented tenant portal and technician management.",
      "Created OTP-based authentication system.",
      "Developed complaint tracking and assignment workflows.",
      "Built PDF and Excel export functionality.",
      "Implemented media uploads and document management.",
    ],
    stack: ["CodeIgniter 4", "MySQL", "JavaScript", "AJAX", "Bootstrap", "DomPDF"],
  },
  {
    title: "VRON Real Estate Portal",
    role: "Senior Full Stack Developer",
    description:
      "Real estate listing platform integrated with Pixxi CRM for automated property synchronization.",
    responsibilities: [
      "Integrated Pixxi CRM APIs.",
      "Developed property listing and search functionality.",
      "Implemented advanced filtering system.",
      "Developed property detail pages.",
      "Managed amenities and property data mapping.",
    ],
    stack: ["PHP 8.1", "MySQL", "REST APIs", "JSON", "JavaScript", "jQuery"],
  },
  {
    title: "Bright Star Construction Materials LLC",
    role: "Senior Full Stack Developer",
    description:
      "Corporate product catalog and content management platform for a construction materials company.",
    responsibilities: [
      "Developed product catalog management system.",
      "Integrated AWS S3 storage.",
      "Created blog, news, gallery, and download modules.",
      "Implemented admin management system.",
      "Developed SEO-friendly page structure.",
    ],
    stack: ["PHP 8.1", "MySQL", "AWS S3 SDK", "CKEditor", "Bootstrap"],
  },
  {
    title: "Rak Machineries",
    role: "Senior Full Stack Developer",
    description:
      "Industrial machinery catalog website with advanced product categorization and inquiry management.",
    responsibilities: [
      "Developed category and subcategory management.",
      "Implemented advanced product search functionality.",
      "Developed inquiry management system.",
      "Created SEO-friendly dynamic URLs.",
      "Built product detail and administration modules.",
    ],
    stack: ["PHP 8.1", "MySQLi", "JavaScript", "Bootstrap", "CKEditor"],
  },
  {
    title: "Fennoune Epoxy",
    role: "Senior Full Stack Developer",
    description: "E-commerce platform for epoxy products and industrial solutions.",
    responsibilities: [
      "Developed complete e-commerce functionality.",
      "Implemented shopping cart and checkout process.",
      "Created order management system.",
      "Developed email notification workflows.",
      "Managed product inventory and customer orders.",
    ],
    stack: ["Core PHP 8.1", "MySQL", "AJAX", "Bootstrap"],
  },
  {
    title: "Raffle Contest Management System",
    role: "Senior Full Stack Developer",
    description:
      "Contest and raffle management platform for managing schemes, participants, and winner selection processes.",
    responsibilities: [
      "Developed participant registration workflows.",
      "Implemented winner selection logic.",
      "Created scheme and campaign management modules.",
      "Built reporting and analytics dashboards.",
      "Developed contestant tracking features.",
    ],
    stack: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
  },
  {
    title: "British Orchard Nursery",
    role: "Full Stack Developer",
    description: "Educational institution website with inquiry and lead management functionality.",
    responsibilities: [
      "Developed contact and inquiry modules.",
      "Integrated reCAPTCHA validation.",
      "Implemented email notification system.",
      "Created content management features.",
      "Optimized website performance and security.",
    ],
    stack: ["CodeIgniter", "PHP", "MySQL", "JavaScript"],
  },
  {
    title: "British Orchard Centre",
    role: "Full Stack Developer",
    description: "Corporate website for educational and training services.",
    responsibilities: [
      "Developed dynamic content pages.",
      "Implemented inquiry and subscription systems.",
      "Created admin management features.",
      "Developed email templates and notifications.",
    ],
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
  },
];

export const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Eastlancers",
    period: "April 2026 — Present",
    city: "Islamabad",
    country: "Pakistan",
    responsibilities: [
      "Develop modern web applications using Laravel, React.js, and Inertia.js.",
      "Build scalable backend systems and RESTful APIs.",
      "Integrate AI solutions using OpenAI APIs and Large Language Models (LLMs).",
      "Develop AI chatbots, automation workflows, and intelligent business solutions.",
      "Design responsive user interfaces using React.js and modern frontend technologies.",
      "Optimize database performance and application scalability.",
      "Implement third-party API integrations and cloud-based services.",
      "Collaborate with clients and internal teams to deliver high-quality software solutions.",
    ],
  },
  {
    role: "Senior Full Stack Developer (Remote)",
    company: "Sum Technologies",
    period: "August 2024 — Present",
    city: "Dubai",
    country: "United Arab Emirates",
    responsibilities: [
      "Develop and maintain enterprise web applications.",
      "Build custom modules using Laravel, CodeIgniter, and Core PHP.",
      "Design and integrate RESTful APIs.",
      "Manage AWS S3 integrations and cloud storage solutions.",
      "Optimize databases and application performance.",
      "Implement new business requirements and system enhancements.",
      "Coordinate with international clients and remote teams.",
      "Perform code reviews, debugging, testing, and deployments.",
    ],
  },
  {
    role: "Senior Full Stack Developer",
    company: "Dusky Solutions",
    period: "April 2024 — July 2024",
    city: "Karachi",
    country: "Pakistan",
    remote: true,
    responsibilities: [
      "Develop and maintain Laravel-based web applications.",
      "Implement custom business modules and backend functionalities.",
      "Integrate third-party APIs and external services.",
      "Optimize application performance and database queries.",
      "Collaborate with remote teams to deliver client projects.",
      "Troubleshoot and resolve technical issues.",
    ],
  },
  {
    role: "Senior Full Stack Developer (On-Site)",
    company: "Sum Technologies",
    period: "May 2022 — March 2024",
    city: "Dubai",
    country: "United Arab Emirates",
    responsibilities: [
      "Developed enterprise-level web applications and portals.",
      "Designed and implemented backend systems using Laravel, CodeIgniter, and PHP.",
      "Built CRM, LMS, Audit Management, and eCommerce solutions.",
      "Created APIs and integrated third-party services.",
      "Worked directly with stakeholders to gather and implement requirements.",
      "Optimized application security, performance, and database structures.",
      "Mentored junior developers and assisted in project planning.",
    ],
  },
  {
    role: "IT Manager",
    company: "Good Partner Food Pvt Ltd",
    period: "January 2021 — February 2022",
    city: "Lahore",
    country: "Pakistan",
    responsibilities: [
      "Managed company-wide IT infrastructure and operations.",
      "Maintained computer systems, networks, and software solutions.",
      "Provided technical support and troubleshooting.",
      "Implemented security and data management procedures.",
      "Coordinated with vendors and service providers.",
      "Supported business operations through technology solutions.",
    ],
  },
  {
    role: "Website Backend Developer",
    company: "Pixiders Software House",
    period: "April 2020 — December 2020",
    city: "Sargodha",
    country: "Pakistan",
    responsibilities: [
      "Developed dynamic web applications using Core PHP and CodeIgniter.",
      "Designed and maintained MySQL databases.",
      "Implemented backend modules and custom functionalities.",
      "Integrated APIs and third-party services.",
      "Optimized website performance and security.",
      "Provided maintenance and technical support.",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Foreign Edvisor Consultants",
    period: "June 2019 — December 2020",
    city: "Sargodha",
    country: "Pakistan",
    responsibilities: [
      "Designed social media creatives and marketing materials.",
      "Created branding assets and promotional content.",
      "Produced print and digital marketing designs.",
      "Assisted marketing teams with visual communication requirements.",
    ],
  },
  {
    role: "Graphic Designer",
    company: "SCA Consultants",
    period: "2018 — 2019",
    city: "Sargodha",
    country: "Pakistan",
    responsibilities: [
      "Designed promotional and branding materials.",
      "Created social media graphics and advertisements.",
      "Produced marketing and presentation designs.",
      "Supported corporate branding initiatives.",
    ],
  },
];

export type Certification = {
  title: string;
  organization: string;
  organizationLabel: "Institution" | "Provider";
  duration: string;
  location: string;
  status: "Completed" | "Ongoing";
  skills: string[];
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Web Development (PHP)",
    organization: "Infosys College Of Technologies",
    organizationLabel: "Institution",
    duration: "6 Months",
    location: "Sargodha, Pakistan",
    status: "Completed",
    skills: [
      "PHP Development",
      "MySQL Database Management",
      "HTML, CSS, JavaScript",
      "Dynamic Website Development",
    ],
  },
  {
    title: "Advanced Web Development (CodeIgniter)",
    organization: "Infosys College Of Technologies",
    organizationLabel: "Institution",
    duration: "6 Months",
    location: "Sargodha, Pakistan",
    status: "Completed",
    skills: [
      "CodeIgniter Framework",
      "MVC Architecture",
      "Database Management",
      "Web Application Development",
    ],
  },
  {
    title: "Laravel Course",
    organization: "Laracasts",
    organizationLabel: "Provider",
    duration: "1 Month",
    location: "Online",
    status: "Completed",
    skills: [
      "Laravel Framework",
      "Eloquent ORM",
      "Authentication & Authorization",
      "REST API Development",
    ],
  },
  {
    title: "React Course",
    organization: "SuperSimpleDev",
    organizationLabel: "Provider",
    duration: "1 Month",
    location: "Online",
    status: "Completed",
    skills: ["React.js Fundamentals", "Components & State Management", "Hooks", "Frontend Development"],
  },
  {
    title: "Graphic Designing",
    organization: "Logix College",
    organizationLabel: "Institution",
    duration: "6 Months",
    location: "Sargodha, Pakistan",
    status: "Completed",
    skills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Branding & Marketing Design",
      "Social Media Design",
    ],
  },
  {
    title:
      "Complete AI Engineer Training: Python, NLP, Transformers, LLMs, LangChain, Hugging Face, APIs",
    organization: "365 Careers via Udemy",
    organizationLabel: "Provider",
    duration: "30 Hours",
    location: "Online",
    status: "Ongoing",
    skills: [
      "Python Programming",
      "Natural Language Processing (NLP)",
      "Transformers & Large Language Models (LLMs)",
      "LangChain",
      "Hugging Face",
      "OpenAI & AI APIs",
      "AI Application Development",
    ],
  },
];

export const SERVICES = [
  {
    title: "Full Stack Development",
    desc: "End-to-end builds with pragmatic architecture.",
    icon: "layers" as const,
  },
  {
    title: "Custom Web Applications",
    desc: "SPAs, dashboards, and portals tailored to workflows.",
    icon: "monitor" as const,
  },
  {
    title: "Laravel Development",
    desc: "APIs, packages, multi-tenant patterns, queue workers.",
    icon: "server" as const,
  },
  {
    title: "API Integrations",
    desc: "Payments, CRMs, webhooks, idempotent pipelines.",
    icon: "plug" as const,
  },
  {
    title: "WordPress Solutions",
    desc: "Custom blocks, headless, performance and security.",
    icon: "layout" as const,
  },
  {
    title: "AI Integration",
    desc: "Assistants, embeddings, guardrails, human-in-the-loop UX.",
    icon: "sparkles" as const,
  },
  {
    title: "UI/UX Frontend",
    desc: "Design systems, motion, and accessible components.",
    icon: "palette" as const,
  },
  {
    title: "E-commerce Solutions",
    desc: "Shopify, custom carts, conversion-focused flows.",
    icon: "shopping-bag" as const,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Our project was delivered exactly as required, with quality and responsiveness that exceeded expectations. Strong PHP, Laravel, and custom web development expertise helped us launch a stable, user-friendly platform. Communication remained clear and consistent throughout.",
    name: "Ali Danish Manesh",
    role: "CEO, Pulseberry Consulting",
  },
  {
    quote:
      "A straightforward collaboration from start to finish. Requirements were understood quickly, practical solutions were proposed, and development was completed within the agreed timeline. Attention to detail and problem-solving stood out at every stage.",
    name: "Venessa",
    role: "Manager, British Orchard Nursery",
  },
  {
    quote:
      "Our ideas were translated into a fully functional web application with equal care on database design and front-end implementation. We particularly valued the commitment to clean, maintainable code and a professional delivery process.",
    name: "Tabassum Afsar",
    role: "CEO & Founder, Sum Technologies",
  },
  {
    quote:
      "Technical expertise and dedication were central to the success of our project. The engagement was proactive, communicative, and consistently focused on the best possible outcome. We look forward to working together again.",
    name: "Donia Belghith",
    role: "Admin Assistant, Dania Property Management & Consultancy",
  },
  {
    quote:
      "An outstanding result on our industrial machinery website—a well-structured product catalog, advanced category management, SEO-friendly URLs, and a smooth experience across all devices. Business requirements were understood clearly, and the entire process was seamless. We are highly satisfied and would recommend this work without hesitation.",
    name: "Management Team",
    role: "Rak Machineries",
  },
  {
    quote:
      "A crucial contribution to our corporate website and product management system: structured catalog, secure document management, AWS S3 integration, and an intuitive administration panel that made content updates simple and efficient. Professional standards, strong technical knowledge, and consistent quality were evident throughout.",
    name: "Management Team",
    role: "Management, Bright Star Construction Materials LLC",
  },
];
