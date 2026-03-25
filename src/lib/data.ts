export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const typedPhrases = [
  "AI Agents",
  "Agentic Workflows",
  "RAG Pipelines",
  "Full Stack Apps",
  "Microservices",
  "LangGraph Systems",
];

export const experiences = [
  {
    company: "OneLab Ventures",
    role: "Software Development Engineer 1",
    location: "Pune",
    duration: "May 2025 – Present",
    type: "AI / GenAI",
    typeColor: "#8b5cf6",
    icon: "fa-brain",
    active: true,
    points: [
      "Architected a <strong>SDLC Automation Agent</strong> using LangChain & LangGraph, automating end-to-end development lifecycle phases — requirements, design, code generation, testing, and deployment — with <strong>human-in-the-loop</strong> checkpoints at critical stages.",
      "Implemented a <strong>vector-based context management layer</strong> (FAISS/ChromaDB) with semantic embeddings to maintain long-horizon project memory and enable accurate retrieval across multi-agent workflows.",
      "Built production-grade AI agents using <strong>LangChain, LangGraph, and CrewAI</strong> — including multi-agent collaboration pipelines actively used by real users for task automation, document analysis, and decision support.",
      "Applied <strong>Retrieval-Augmented Generation (RAG)</strong> to ground LLM responses in proprietary codebases and domain-specific documents, significantly reducing hallucinations.",
      "Engineered an <strong>AI-driven UI experimentation platform</strong> generating TSX/JSX variants with round-robin rollout & real-time engagement tracking; developed a cloud-native AI meeting notetaker on AWS.",
    ],
    tags: ["LangChain", "LangGraph", "CrewAI", "RAG", "FAISS", "ChromaDB", "AWS", "Python"],
  },
  {
    company: "Orange League Ventures",
    role: "Software Development Engineer 1",
    location: "Pune",
    duration: "Jan 2024 – May 2025",
    type: "Full Stack",
    typeColor: "#06b6d4",
    icon: "fa-code",
    active: false,
    points: [
      "Built and maintained <strong>microservices</strong> for the NSE website ecosystem using ReactJS, NodeJS, and FastAPI, applying RESTful API design principles to ensure scalability and maintainability.",
      "Led <strong>end-to-end data migration</strong> across MySQL, PostgreSQL, and Oracle databases, designing migration scripts that preserved data integrity with minimal downtime.",
      "Designed <strong>normalized database schemas</strong> for complex domain entities and managed collaborative development workflows using Git.",
    ],
    tags: ["ReactJS", "NodeJS", "FastAPI", "MySQL", "PostgreSQL", "Oracle", "Git"],
  },
  {
    company: "Cogoport",
    role: "Software Development Engineer 1",
    location: "Mumbai",
    duration: "Jan 2023 – Oct 2023",
    type: "Logistics Tech",
    typeColor: "#f59e0b",
    icon: "fa-ship",
    active: false,
    points: [
      "Built <strong>pricing frameworks</strong> for FCL and Air shipment rates, formulating algorithms factoring weight, volume, distance, and service tiers with dynamic pricing for market competitiveness.",
      "Spearheaded <strong>Air International Service</strong> operations contributing to <strong>30% of total company revenue</strong>, implementing optimizations that improved service quality and customer satisfaction.",
    ],
    tags: ["Python", "Pricing Algorithms", "RESTful APIs", "Logistics Tech"],
  },
];

export const skillCategories = [
  {
    title: "AI / GenAI",
    color: "#8b5cf6",
    icon: "fa-brain",
    skills: ["LangChain", "LangGraph", "CrewAI", "LlamaIndex", "RAG", "FAISS", "ChromaDB", "Prompt Engineering", "Agentic Workflows"],
  },
  {
    title: "Frontend & Backend",
    color: "#06b6d4",
    icon: "fa-layer-group",
    skills: ["ReactJS", "NodeJS", "FastAPI", "RESTful APIs", "Microservices"],
  },
  {
    title: "Languages",
    color: "#f59e0b",
    icon: "fa-code",
    skills: ["Python", "JavaScript", "TypeScript", "C/C++", "HTML + CSS"],
  },
  {
    title: "Databases",
    color: "#10b981",
    icon: "fa-database",
    skills: ["MySQL", "PostgreSQL", "Oracle", "ChromaDB", "FAISS"],
  },
  {
    title: "Cloud & DevOps",
    color: "#ef4444",
    icon: "fa-cloud",
    skills: ["AWS Lambda", "AWS S3", "AWS EC2", "Docker", "Git / GitHub"],
  },
];

export const proficiencies = [
  { label: "Generative AI & LLM Engineering", pct: 92, color: "#8b5cf6" },
  { label: "Python", pct: 90, color: "#8b5cf6" },
  { label: "Full Stack (React + Node + FastAPI)", pct: 85, color: "#06b6d4" },
  { label: "Databases & Data Engineering", pct: 82, color: "#10b981" },
  { label: "Cloud & DevOps (AWS + Docker)", pct: 75, color: "#f59e0b" },
];

export const achievements = [
  { icon: "fa-code-branch", color: "#8b5cf6", count: 500, suffix: "+", label: "DSA Problems Solved", sub: "LeetCode & HackerRank" },
  { icon: "fa-chart-line", color: "#06b6d4", count: 30, suffix: "%", label: "Revenue Impact at Cogoport", sub: "Air International Service Ops" },
  { icon: "fa-users", color: "#f59e0b", count: 3, suffix: "", label: "Companies", sub: "Production SDE experience" },
  { icon: "fa-robot", color: "#10b981", count: 5, suffix: "+", label: "AI Agents Deployed", sub: "Production multi-agent systems" },
];

export const education = [
  {
    degree: "B.Tech — Electronics & Communication Engineering",
    institution: "Sastra Deemed to be University, Thanjavur",
    duration: "2019 – 2023",
    cgpa: "7.734",
    color: "#8b5cf6",
    icon: "fa-university",
  },
  {
    degree: "Intermediate — Senior Secondary (10+2)",
    institution: "Narayana Jr College, Renigunta — Board of Intermediate, Andhra Pradesh",
    duration: "2017 – 2019",
    cgpa: "10.0",
    color: "#06b6d4",
    icon: "fa-school",
  },
];
