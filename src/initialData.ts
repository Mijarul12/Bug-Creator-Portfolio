import { Profile, Project, Skill, Service, SocialLink, ContentItem } from './types';

export const initialProfile: Profile = {
  name: 'Mijarul Rahaman',
  tagline: 'I Build Apps, Websites & Digital Experiences.',
  bio: 'Passionate developer and content creator behind Bug Creator. I architect modern web applications, custom Android apps, and cloud-backed platforms that turn ambitious ideas into sleek, scalable digital realities.',
  location: 'Kolkata / West Bengal, India',
  email: 'mijarulkhkh@gmail.com',
  phone: '+91 98765 43210',
  availableForHire: true,
  yearsExperience: '3+ Years',
  completedProjects: '25+ Delivered',
  happyClients: '100% Satisfaction',
  avatarUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=600&q=80',
  cvUrl: '#',
  aboutStory: `I am Mijarul Rahaman, a developer passionate about building modern websites, applications, and digital experiences. 

Through Bug Creator, I merge rigorous engineering with creative design. Whether designing complex relational schemas, crafting responsive micro-animations in React and Tailwind, or engineering offline-first Android apps, I focus on performance, accessibility, and clean code.

Beyond client development, I document my journey across YouTube and Instagram—sharing tutorials, project breakdowns, and developer insights to empower fellow builders worldwide.`
};

export const initialProjects: Project[] = [
  {
    id: 'al-quran-app',
    title: 'Al Quran Digital App',
    description: 'A comprehensive spiritual recitation and study platform featuring high-fidelity audio, multiple translations, and search.',
    fullDescription: 'Al Quran is a modern cross-platform application developed for seamless Quranic reading, audio streaming with renowned reciters, verse-by-verse translation in multiple languages, and verse bookmarking. Designed with high contrast Arabic typography and zero lag.',
    category: 'Android Apps',
    technologies: 'Android, Kotlin, Firebase, Audio Player API, SQLite',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://github.com/mijarulrahaman',
    githubUrl: 'https://github.com/mijarulrahaman/al-quran-app',
    status: 'Completed',
    features: 'Crystal clear Quranic audio recitation, Offline verse caching, Multilingual translations (English, Bengali, Urdu), Dark & Sepia reading modes, Precise search by Surah and Ayah.',
    problemStatement: 'Many Quran apps are bloated with intrusive ads, sluggish navigation, or clunky audio caching.',
    solution: 'Engineered a lightweight, battery-efficient architecture with smooth gesture navigation and offline recitation downloads.',
    isPublished: true,
    displayOrder: 1,
    createdAt: '2026-01-15',
    updatedAt: '2026-03-01'
  },
  {
    id: 'namaz-time-app',
    title: 'Namaz Time & Qibla Compass',
    description: 'Dynamic GPS-based prayer schedule app with athan audio alerts, Qibla direction finder, and Hijri calendar.',
    fullDescription: 'An essential utility for Muslims worldwide that computes precise prayer timings based on user coordinates and calculation method standards. Features automated athan notifications, sensor-fused Qibla compass, and local mosque timings.',
    category: 'Android Apps',
    technologies: 'Android, Java/Kotlin, Geolocation API, Compass Sensors, WorkManager',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://github.com/mijarulrahaman',
    githubUrl: 'https://github.com/mijarulrahaman/namaz-time-app',
    status: 'Completed',
    features: 'Automated GPS and manual city prayer calculation, Adhan notifications with custom voice packs, Sensor-calibrated 3D Qibla compass, Ramadan Sehri & Iftar timetable countdown.',
    problemStatement: 'Inconsistent calculation methods and missed notifications in standard alarms due to aggressive Android battery savers.',
    solution: 'Leveraged Android foreground services and exact alarm APIs to ensure 100% reliable athan reminders without draining battery.',
    isPublished: true,
    displayOrder: 2,
    createdAt: '2026-02-10',
    updatedAt: '2026-04-05'
  },
  {
    id: 'puzzal-game',
    title: 'Puzzal - Physics Mind Challenge',
    description: 'Interactive browser-based logic and physics puzzle game featuring responsive touch mechanics and leaderboard.',
    fullDescription: 'Puzzal is a fast-paced interactive web game that challenges players spatial awareness and logical problem-solving. Built with React and HTML5 Canvas, providing fluid animations and immediate tactile feedback.',
    category: 'Web Applications',
    technologies: 'React, TypeScript, HTML5 Canvas, Tailwind CSS, Web Audio API',
    imageUrl: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://puzzal-demo.web.app',
    githubUrl: 'https://github.com/mijarulrahaman/puzzal',
    status: 'Completed',
    features: '50+ brain teaser puzzle stages, Real-time score calculation and timer, Responsive touch and keyboard drag controls, Haptic sound synthesis.',
    problemStatement: 'Creating responsive 60fps canvas physics that runs equally smooth on low-end smartphones and high-refresh desktop monitors.',
    solution: 'Implemented delta-time physics loop and offscreen canvas buffering with minimal bundle size.',
    isPublished: true,
    displayOrder: 3,
    createdAt: '2026-03-20',
    updatedAt: '2026-06-12'
  },
  {
    id: 'narayanpur-social',
    title: 'Narayanpur Social Community Hub',
    description: 'Hyperlocal community networking and public notice platform with real-time updates and verified directory.',
    fullDescription: 'A dedicated civic and community social portal connecting local residents, businesses, and youth in Narayanpur. Includes community bulletins, blood donor directory, emergency contacts, local marketplace, and event calendar.',
    category: 'Firebase Applications',
    technologies: 'React, Vite, Firebase Firestore, Firebase Auth, Cloud Storage, Tailwind CSS',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://narayanpur-social.web.app',
    githubUrl: 'https://github.com/mijarulrahaman/narayanpur-social',
    status: 'Completed',
    features: 'Real-time neighborhood message boards, Verified blood donor & medical helpline registry, Local business listings, Role-based moderation system.',
    problemStatement: 'Local news and urgent community notices got lost in unmoderated WhatsApp groups with no searchability.',
    solution: 'Built a structured, authenticated web platform with Firestore real-time listeners and categorized notification channels.',
    isPublished: true,
    displayOrder: 4,
    createdAt: '2026-05-18',
    updatedAt: '2026-08-20'
  },
  {
    id: 'bug-creator-portfolio',
    title: 'Bug Creator - Developer Platform',
    description: 'Personal developer branding platform with live project showcase, client intake system, and dynamic CMS dashboard.',
    fullDescription: 'The current flagship portal you are viewing. Engineered as an all-in-one developer brand ecosystem featuring an animated hero canvas, comprehensive skill matrix, client request pipeline, video tutorial gallery, and secure Firebase-backed admin management.',
    category: 'Websites',
    technologies: 'React 19, Tailwind CSS, TypeScript, Firebase Auth & Firestore, Motion',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
    demoUrl: '#',
    githubUrl: 'https://github.com/mijarulrahaman/bug-creator',
    status: 'Completed',
    features: 'Real-time Firestore sync, Protected Admin Dashboard, Interactive client quote request pipeline, Glassmorphism cyber-developer UI, Responsive touch optimization.',
    problemStatement: 'Developers often maintain static portfolios that require code edits and redeployments just to add a new project or update a skill.',
    solution: 'Created a dual-sided architecture: a public showcase and an intuitive authenticated dashboard where content updates in real time without touching source code.',
    isPublished: true,
    displayOrder: 5,
    createdAt: '2026-07-01',
    updatedAt: '2026-10-05'
  },
  {
    id: 'ai-creative-studio',
    title: 'AI Prompt & Code Studio',
    description: 'Smart developer assistant for generative design, automated boilerplate generation, and API testing.',
    fullDescription: 'An AI-augmented web workbench that accelerates developer workflows by transforming high-level natural language specifications into structured code snippets, API mocks, and UI components.',
    category: 'AI Applications',
    technologies: 'React, Google GenAI SDK, Node.js, Tailwind CSS, Highlight.js',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://github.com/mijarulrahaman',
    githubUrl: 'https://github.com/mijarulrahaman/ai-studio-assist',
    status: 'In Progress',
    features: 'One-click code snippet generation, Architecture diagram synthesis, JSON Schema generator, Live code preview environment.',
    problemStatement: 'Switching between external AI chat tools and coding environments disrupts developer flow state.',
    solution: 'Built a contextual in-browser workbench with instant markdown copy and syntax highlighting.',
    isPublished: true,
    displayOrder: 6,
    createdAt: '2026-08-15',
    updatedAt: '2026-09-30'
  }
];

export const initialSkills: Skill[] = [
  {
    id: 'skill-react',
    name: 'React & Next.js',
    category: 'Frontend',
    level: 92,
    icon: 'Atom',
    description: 'Modern component-driven architecture, custom hooks, SSR, state management, and performance tuning.',
    displayOrder: 1
  },
  {
    id: 'skill-js-ts',
    name: 'JavaScript & TypeScript',
    category: 'Frontend',
    level: 94,
    icon: 'Code2',
    description: 'ESNext features, strict type safety, asynchronous programming, Web APIs, and functional paradigms.',
    displayOrder: 2
  },
  {
    id: 'skill-html-css',
    name: 'HTML5 & Modern CSS / Tailwind',
    category: 'Frontend',
    level: 95,
    icon: 'Palette',
    description: 'Semantic markup, accessibility (a11y), responsive fluid design, micro-interactions, and design systems.',
    displayOrder: 3
  },
  {
    id: 'skill-android',
    name: 'Android Development',
    category: 'Mobile & Apps',
    level: 86,
    icon: 'Smartphone',
    description: 'Native mobile app development using Kotlin/Java, Jetpack architecture, background workers, and Play Store release.',
    displayOrder: 4
  },
  {
    id: 'skill-nodejs',
    name: 'Node.js & Express',
    category: 'Backend & DB',
    level: 88,
    icon: 'Server',
    description: 'RESTful API engineering, middleware pipelines, authentication, server-side data validation, and microservices.',
    displayOrder: 5
  },
  {
    id: 'skill-firebase',
    name: 'Firebase & Cloud Firestore',
    category: 'Backend & DB',
    level: 90,
    icon: 'Flame',
    description: 'Firestore NoSQL design, Firebase Authentication, Cloud Storage, Security Rules auditing, and real-time sockets.',
    displayOrder: 6
  },
  {
    id: 'skill-database',
    name: 'Database Management (SQL & NoSQL)',
    category: 'Backend & DB',
    level: 84,
    icon: 'Database',
    description: 'Relational data modeling, indexing, query optimization, PostgreSQL, MongoDB, and Firestore structures.',
    displayOrder: 7
  },
  {
    id: 'skill-api-integration',
    name: 'API Integration & Webhooks',
    category: 'Core & Tools',
    level: 90,
    icon: 'PlugZap',
    description: 'Third-party REST, GraphQL, payment gateways, Google Maps, OAuth 2.0 flows, and webhook event consumers.',
    displayOrder: 8
  },
  {
    id: 'skill-ui-ux',
    name: 'UI/UX Design & Prototyping',
    category: 'Core & Tools',
    level: 85,
    icon: 'Layout',
    description: 'Figma wireframing, interactive prototyping, user journey mapping, typography scales, and dark mode systems.',
    displayOrder: 9
  },
  {
    id: 'skill-ai-assist',
    name: 'AI-Assisted Development',
    category: 'Core & Tools',
    level: 92,
    icon: 'Bot',
    description: 'Leveraging Gemini API, prompt engineering, LLM workflow automation, and intelligent generative features.',
    displayOrder: 10
  }
];

export const initialServices: Service[] = [
  {
    id: 'service-portfolio',
    title: 'Personal Portfolio Websites',
    description: 'Distinctive, fast-loading personal portfolios for developers, engineers, creatives, and executives to stand out and attract high-paying opportunities.',
    icon: 'UserCheck',
    features: 'Custom Dark/Light Themes\nInteractive Project Showcases\nCMS/Admin Control Panel\nSEO & OpenGraph Cards\nFast Responsive Delivery',
    turnaround: '3 - 5 Days',
    displayOrder: 1
  },
  {
    id: 'service-business',
    title: 'Business & Corporate Websites',
    description: 'Clean, modern digital storefronts designed to convert visitors into paying clients, boost brand authority, and showcase your services.',
    icon: 'Building2',
    features: 'Lead Generation Forms\nGoogle Analytics & Maps\nMobile-First Responsive Layout\nFast CDN Hosting\nSecurity Hardened',
    turnaround: '1 - 2 Weeks',
    displayOrder: 2
  },
  {
    id: 'service-ecommerce',
    title: 'E-commerce & Store Solutions',
    description: 'Seamless online shopping experiences with product catalogs, shopping carts, secure checkout flows, and order management.',
    icon: 'ShoppingBag',
    features: 'Product Catalog & Filters\nSecure Payment Gateway\nInventory & Order Tracking\nCustomer Accounts\nAutomated Email Receipts',
    turnaround: '2 - 3 Weeks',
    displayOrder: 3
  },
  {
    id: 'service-landing',
    title: 'High-Converting Landing Pages',
    description: 'Hyper-focused campaign landing pages built for product launches, marketing funnels, and app pre-orders with optimal conversion rate design.',
    icon: 'Flame',
    features: 'A/B Test Ready\nSub-second Load Times\nEngaging Call to Actions\nInteractive Hero Demos\nCRM Form Integration',
    turnaround: '2 - 4 Days',
    displayOrder: 4
  },
  {
    id: 'service-web-apps',
    title: 'Responsive Web Applications',
    description: 'Dynamic, database-driven web applications with real-time updates, user authentication, role-based dashboards, and intuitive workflows.',
    icon: 'Globe',
    features: 'Single Page Apps (React/Vite)\nReal-time Data Sync\nRole-Based Access Control\nInteractive Charts & Tables\nCross-Device Optimization',
    turnaround: '2 - 4 Weeks',
    displayOrder: 5
  },
  {
    id: 'service-android',
    title: 'Custom Android Applications',
    description: 'Native and hybrid mobile applications tailored to your business requirements with fluid touch navigation and offline support.',
    icon: 'Smartphone',
    features: 'Intuitive Material Design\nOffline Data Caching\nPush Notifications\nCamera & GPS Sensors\nGoogle Play Store Publishing',
    turnaround: '3 - 5 Weeks',
    displayOrder: 6
  },
  {
    id: 'service-firebase',
    title: 'Firebase Fullstack Systems',
    description: 'End-to-end backend setups using Google Cloud Firebase, Firestore databases, Auth, Cloud Functions, and zero-trust security rules.',
    icon: 'Layers',
    features: 'Firestore Data Modeling\nGoogle / Social Sign-In\nCloud Storage Integration\nStrict Security Rules\nServerless Scalability',
    turnaround: '1 - 2 Weeks',
    displayOrder: 7
  },
  {
    id: 'service-custom',
    title: 'Bespoke Custom Development',
    description: 'Unique technical requirements, third-party API orchestrations, automation scripts, and legacy code refactoring built to exact specs.',
    icon: 'Wrench',
    features: 'Tailored Architecture Plan\nClean Code & Documentation\nCustom Third-Party APIs\nDedicated Testing & QA\nPost-Launch Maintenance Support',
    turnaround: 'Flexible Timeline',
    displayOrder: 8
  }
];

export const initialSocialLinks: SocialLink[] = [
  {
    id: 'social-youtube',
    platform: 'YouTube',
    url: 'https://youtube.com/@bugcreator',
    handle: '@BugCreator',
    displayOrder: 1,
    isPrimary: true
  },
  {
    id: 'social-instagram',
    platform: 'Instagram',
    url: 'https://instagram.com/bugcreator_dev',
    handle: '@bugcreator_dev',
    displayOrder: 2,
    isPrimary: true
  },
  {
    id: 'social-github',
    platform: 'GitHub',
    url: 'https://github.com/mijarulrahaman',
    handle: 'mijarulrahaman',
    displayOrder: 3,
    isPrimary: true
  },
  {
    id: 'social-linkedin',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/mijarul-rahaman',
    handle: 'Mijarul Rahaman',
    displayOrder: 4,
    isPrimary: false
  }
];

export const initialContentItems: ContentItem[] = [
  {
    id: 'content-1',
    title: 'Building a Fullstack Mobile App with Android & Firebase',
    platform: 'YouTube',
    url: 'https://youtube.com/@bugcreator',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'App Development',
    description: 'Full step-by-step masterclass on architecting Android apps connected to Firestore real-time database with Google Auth.',
    displayOrder: 1
  },
  {
    id: 'content-2',
    title: 'Modern UI Secrets: Designing Dark Mode Glassmorphism in 2026',
    platform: 'YouTube',
    url: 'https://youtube.com/@bugcreator',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    category: 'UI/UX & Web',
    description: 'Learn how to create cyber-developer aesthetic interfaces with Tailwind CSS and responsive micro-animations.',
    displayOrder: 2
  },
  {
    id: 'content-3',
    title: 'Day in the Life of a Self-Taught Indian Developer & YouTuber',
    platform: 'Instagram',
    url: 'https://instagram.com/bugcreator_dev',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    category: 'Reels / Shorts',
    description: 'Coding desk setup, daily workflow with VS Code, debugging sessions, and video editing behind the scenes.',
    displayOrder: 3
  },
  {
    id: 'content-4',
    title: '5 Firebase Security Mistakes Every Beginner Makes (And How to Fix)',
    platform: 'YouTube',
    url: 'https://youtube.com/@bugcreator',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    category: 'Security & Cloud',
    description: 'Avoid accidental data leaks and huge billing surprises by locking down your Firestore rules effectively.',
    displayOrder: 4
  }
];
