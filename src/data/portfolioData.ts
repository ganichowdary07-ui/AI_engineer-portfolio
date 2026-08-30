import type { PersonalInfo, EducationItem, SkillCategory, ProjectItem, JourneyStep, ExperienceCard } from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: "Gurram Ganesh",
  professionalTitles: [
    "AI Engineer Learner",
    "Prompt Engineering Learner",
    "Analytical Skills Learner"
  ],
  typingTitles: [
    "AI Engineer Learner",
    "Prompt Engineering Learner",
    "Data & Analytics Learner",
    "Computer Science Engineering Student"
  ],
  location: "Bhimavaram, Andhra Pradesh, India",
  careerGoal: "AI Engineer",
  email: "ganichowdary07@gmail.com",
  phone: "+91 7396235685",
  currentStatus: "3rd Year B.Tech CSE Student | Fresher",
  college: "SRKR Engineering College",
  introText: "Building my skills in Artificial Intelligence, prompt engineering, and analytics to create intelligent solutions for real-world problems.",
  aboutBio: [
    "I am Gurram Ganesh, a third-year Computer Science Engineering student at SRKR Engineering College. I am passionate about Artificial Intelligence, prompt engineering, analytical problem-solving, and emerging technologies.",
    "Currently, I am developing my skills toward becoming an AI Engineer while strengthening my foundations as a prompt engineering learner and data analytics practitioner. I enjoy building practical projects that allow me to transform ideas into useful digital solutions.",
    "My goal is to continuously improve my programming, analytical, and problem-solving abilities and eventually build intelligent applications that solve meaningful real-world problems."
  ],
  socials: {
    github: "https://github.com/ganichowdary07-ui/ATS-Resume-Bilder",
    linkedin: "https://www.linkedin.com/in/ganesh-gurram-561a653a5",
    email: "mailto:ganichowdary07@gmail.com"
  },
  stats: [
    {
      label: "3rd Year",
      value: "B.Tech CSE",
      sublabel: "SRKR Engineering College",
      iconName: "GraduationCap"
    },
    {
      label: "7.4",
      value: "Current CGPA",
      sublabel: "Academic Performance",
      iconName: "Award"
    },
    {
      label: "92.4%",
      value: "Intermediate",
      sublabel: "Narayana Junior College",
      iconName: "BookOpen"
    },
    {
      label: "89.33%",
      value: "10th Class",
      sublabel: "Narayana School",
      iconName: "CheckCircle2"
    }
  ]
};

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    institution: "SRKR Engineering College",
    location: "Bhimavaram, Andhra Pradesh",
    degree: "B.Tech — Computer Science and Engineering",
    period: "2024–2028 (Expected)",
    status: "3rd Year",
    grade: "CGPA: 7.4",
    description: "Focusing on core Computer Science topics including Data Structures, Algorithms, Prompt Engineering, Database Systems, Artificial Intelligence, and Data Analytics.",
    icon: "GraduationCap"
  },
  {
    id: "edu-2",
    institution: "Narayana Junior College",
    location: "Vijayawada, Andhra Pradesh",
    degree: "Intermediate (MPC)",
    period: "2022–2024",
    status: "Completed",
    grade: "Score: 92.4%",
    description: "Built strong analytical foundations in Mathematics, Physics, and Chemistry.",
    icon: "School"
  },
  {
    id: "edu-3",
    institution: "Narayana School",
    location: "Guntur, Andhra Pradesh",
    degree: "10th Class (SSC)",
    period: "2021–2022",
    status: "Completed",
    grade: "Score: 89.33%",
    description: "Strong academic record with foundational problem-solving and science education.",
    icon: "BookMarked"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "prompt-eng",
    name: "Prompt Engineering",
    skills: [
      { name: "System & Custom Prompting", proficiency: 85, level: "Currently Learning" },
      { name: "Few-Shot & Chain-of-Thought", proficiency: 82, level: "Currently Learning" },
      { name: "LLM Context & Role Tuning", proficiency: 80, level: "Currently Learning" },
      { name: "Prompt Optimization & Evaluation", proficiency: 78, level: "Currently Learning" },
      { name: "AI Agent Instruction Engineering", proficiency: 75, level: "Currently Learning" }
    ]
  },
  {
    id: "prog",
    name: "Programming",
    skills: [
      { name: "Python", proficiency: 82, level: "Comfortable" },
      { name: "C", proficiency: 75, level: "Comfortable" }
    ]
  },
  {
    id: "backend",
    name: "Backend & Database",
    skills: [
      { name: "MySQL", proficiency: 75, level: "Comfortable" },
      { name: "SQL Database Management", proficiency: 70, level: "Currently Learning" }
    ]
  },
  {
    id: "ai-analytics",
    name: "AI & Analytics",
    skills: [
      { name: "Artificial Intelligence", proficiency: 60, level: "Currently Learning" },
      { name: "Machine Learning", proficiency: 58, level: "Currently Learning" },
      { name: "Data Analytics", proficiency: 70, level: "Currently Learning" },
      { name: "Data Visualization", proficiency: 72, level: "Comfortable" },
      { name: "Python for Data Analysis", proficiency: 75, level: "Comfortable" }
    ]
  },
  {
    id: "tools",
    name: "Tools & Workflow",
    skills: [
      { name: "Git", proficiency: 80, level: "Comfortable" },
      { name: "GitHub", proficiency: 82, level: "Comfortable" },
      { name: "VS Code", proficiency: 90, level: "Comfortable" },
      { name: "Firebase", proficiency: 60, level: "Currently Learning" }
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "ATS Resume Builder",
    description: "An intelligent ATS (Applicant Tracking System) Resume Builder application designed to help job seekers format, optimize, and evaluate resumes for automated hiring systems.",
    longDescription: "Built to streamline resume creation with ATS-friendly layouts, keyword optimization, and real-time structure validation for modern job applications.",
    category: ["Prompt Engineering", "AI"],
    technologies: ["Python", "Prompt Engineering", "Data Analytics"],
    githubUrl: "https://github.com/ganichowdary07-ui/ATS-Resume-Bilder",
    liveDemoUrl: "#",
    featured: true,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "ATS keyword optimization & formatting engine",
      "Real-time resume scoring and structure analysis",
      "Clean prompt & interface design for job application workflows"
    ]
  },
  {
    id: "proj-2",
    title: "Personal AI Portfolio Platform",
    description: "A modern, high-performance AI portfolio platform designed to showcase Ganesh's education, prompt engineering skills, projects, career goals, and professional profile.",
    longDescription: "Features an AI-inspired dark mode aesthetic, interactive Gani AI Assistant, GitHub integration, contact validation, and smooth responsive layout.",
    category: ["Prompt Engineering", "AI"],
    technologies: ["Prompt Engineering", "AI Assistant", "Data Analytics"],
    githubUrl: "https://github.com/ganichowdary07-ui/ATS-Resume-Bilder",
    liveDemoUrl: "#",
    featured: true,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Dynamic dark/light mode toggle with local storage persistence",
      "Interactive Gani AI Assistant bot with prompt engineering knowledge",
      "GitHub REST API integration for public repositories",
      "Full SEO optimization and automated PDF resume downloader"
    ]
  },
  {
    id: "proj-3",
    title: "Food Donation Trust Platform",
    description: "A social-impact platform created for a charitable food donation initiative, connecting donors with community welfare initiatives.",
    longDescription: "Focuses on showcasing food donation activities, community social service, donor outreach, and encouraging people to support food security and community welfare initiatives effectively.",
    category: ["Prompt Engineering", "Other"],
    technologies: ["Social Impact", "Prompt Tuning", "Community Welfare"],
    githubUrl: "https://github.com/ganichowdary07-ui/ATS-Resume-Bilder",
    liveDemoUrl: "#",
    featured: true,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Charitable donation activity timeline and impact counters",
      "Interactive food pickup & contribution request forms",
      "Responsive donor gallery and social welfare story showcases"
    ]
  }
];

export const journeySteps: JourneyStep[] = [
  {
    step: 1,
    title: "Computer Science Fundamentals",
    description: "Enrolled in B.Tech CSE at SRKR Engineering College. Building foundational knowledge in Data Structures, Algorithms, Computer Organization, and Software Concepts.",
    status: "Completed",
    technologies: ["C", "C++", "Data Structures", "Computer Architecture"],
    icon: "Code2"
  },
  {
    step: 2,
    title: "Programming Proficiency",
    description: "Strengthening core programming languages with a heavy focus on Python for scientific computing and software problem solving.",
    status: "Completed",
    technologies: ["Python", "OOP", "Problem Solving"],
    icon: "Terminal"
  },
  {
    step: 3,
    title: "Prompt Engineering",
    description: "Learning to design and engineer effective LLM prompts, persona instruction tuning, few-shot techniques, and chain-of-thought workflows for AI models.",
    status: "In Progress",
    technologies: ["System Prompts", "Few-Shot Prompting", "Chain-of-Thought", "Context Tuning"],
    icon: "Sparkles"
  },
  {
    step: 4,
    title: "Data & Analytics",
    description: "Exploring data analytics, visualization techniques, NumPy, Pandas, Matplotlib, and SQL database querying to derive actionable insights from complex datasets.",
    status: "In Progress",
    technologies: ["Python Data Stack", "Pandas", "Matplotlib", "SQL", "Data Viz"],
    icon: "BarChart3"
  },
  {
    step: 5,
    title: "Artificial Intelligence & Machine Learning",
    description: "Diving into machine learning algorithms, Neural Networks, Deep Learning concepts, Scikit-Learn, and AI application workflows.",
    status: "In Progress",
    technologies: ["Scikit-Learn", "Machine Learning", "Neural Nets", "AI Models"],
    icon: "Brain"
  },
  {
    step: 6,
    title: "AI Engineer",
    description: "Ultimate career goal: Building intelligent, scalable, real-world AI applications and multi-modal systems that solve complex societal and business challenges.",
    status: "Upcoming Goal",
    technologies: ["LLMs", "Autonomous Agents", "Deep Learning", "AI Architecture"],
    icon: "Sparkles"
  }
];

export const experienceData: ExperienceCard = {
  title: "Fresher & Motivated Technical Learner",
  status: "Fresher",
  description: "Currently building practical experience through academic learning, self-learning, personal projects, and continuous technical development.",
  highlights: [
    "Academic Projects at SRKR Engineering College (3rd Year B.Tech CSE)",
    "Hands-on AI prompt engineering learning & LLM instruction optimization",
    "Self-directed learning in Artificial Intelligence, Python data analysis, & Machine Learning",
    "Continuous problem-solving and active participation in coding exercises"
  ]
};

export const githubConfig = {
  username: "ganichowdary07-ui",
  placeholderText: "GitHub Repositories will load dynamically from your account (ganichowdary07-ui). You can update your username in src/data/portfolioData.ts anytime."
};
