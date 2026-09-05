import { prisma } from './config/db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  console.log('🌱 Starting portfolio database seeding...');

  // 1. Seed Admin User
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminEmail = process.env.ADMIN_EMAIL || 'ganichowdary07@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  await prisma.user.upsert({
    where: { username: adminUsername },
    update: { password: hashedPassword, email: adminEmail },
    create: {
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN'
    }
  });
  console.log(`✅ Admin user seeded: ${adminUsername} (${adminEmail})`);

  // 2. Seed Personal Info & Stats
  const personalInfoData = {
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
    github: "https://github.com/ganichowdary07-ui/ATS-Resume-Bilder",
    linkedin: "https://www.linkedin.com/in/ganesh-gurram-561a653a5",
    emailSocial: "mailto:ganichowdary07@gmail.com"
  };

  const existingInfo = await prisma.personalInfo.findFirst();
  let personalInfoId: string;

  if (existingInfo) {
    personalInfoId = existingInfo.id;
    await prisma.personalInfo.update({
      where: { id: personalInfoId },
      data: {
        name: personalInfoData.name,
        professionalTitles: JSON.stringify(personalInfoData.professionalTitles),
        typingTitles: JSON.stringify(personalInfoData.typingTitles),
        location: personalInfoData.location,
        careerGoal: personalInfoData.careerGoal,
        email: personalInfoData.email,
        phone: personalInfoData.phone,
        currentStatus: personalInfoData.currentStatus,
        college: personalInfoData.college,
        introText: personalInfoData.introText,
        aboutBio: JSON.stringify(personalInfoData.aboutBio),
        github: personalInfoData.github,
        linkedin: personalInfoData.linkedin,
        emailSocial: personalInfoData.emailSocial
      }
    });
  } else {
    const created = await prisma.personalInfo.create({
      data: {
        name: personalInfoData.name,
        professionalTitles: JSON.stringify(personalInfoData.professionalTitles),
        typingTitles: JSON.stringify(personalInfoData.typingTitles),
        location: personalInfoData.location,
        careerGoal: personalInfoData.careerGoal,
        email: personalInfoData.email,
        phone: personalInfoData.phone,
        currentStatus: personalInfoData.currentStatus,
        college: personalInfoData.college,
        introText: personalInfoData.introText,
        aboutBio: JSON.stringify(personalInfoData.aboutBio),
        github: personalInfoData.github,
        linkedin: personalInfoData.linkedin,
        emailSocial: personalInfoData.emailSocial
      }
    });
    personalInfoId = created.id;
  }

  // Stats
  await prisma.personalStat.deleteMany({ where: { personalInfoId } });
  const stats = [
    { label: "3rd Year", value: "B.Tech CSE", sublabel: "SRKR Engineering College", iconName: "GraduationCap", orderIndex: 0 },
    { label: "7.4", value: "Current CGPA", sublabel: "Academic Performance", iconName: "Award", orderIndex: 1 },
    { label: "92.4%", value: "Intermediate", sublabel: "Narayana Junior College", iconName: "BookOpen", orderIndex: 2 },
    { label: "89.33%", value: "10th Class", sublabel: "Narayana School", iconName: "CheckCircle2", orderIndex: 3 }
  ];
  for (const s of stats) {
    await prisma.personalStat.create({
      data: {
        personalInfoId,
        ...s
      }
    });
  }
  console.log('✅ Personal info and statistics seeded');

  // 3. Seed Education
  await prisma.education.deleteMany();
  const educationData = [
    {
      id: "edu-1",
      institution: "SRKR Engineering College",
      location: "Bhimavaram, Andhra Pradesh",
      degree: "B.Tech — Computer Science and Engineering",
      period: "2024–2028 (Expected)",
      status: "3rd Year",
      grade: "CGPA: 7.4",
      description: "Focusing on core Computer Science topics including Data Structures, Algorithms, Prompt Engineering, Database Systems, Artificial Intelligence, and Data Analytics.",
      icon: "GraduationCap",
      orderIndex: 0
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
      icon: "School",
      orderIndex: 1
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
      icon: "BookMarked",
      orderIndex: 2
    }
  ];

  for (const edu of educationData) {
    await prisma.education.create({ data: edu });
  }
  console.log(`✅ Education history seeded (${educationData.length} records)`);

  // 4. Seed Skill Categories and Skills
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();

  const skillCategories = [
    {
      id: "prompt-eng",
      name: "Prompt Engineering",
      orderIndex: 0,
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
      orderIndex: 1,
      skills: [
        { name: "Python", proficiency: 82, level: "Comfortable" },
        { name: "C", proficiency: 75, level: "Comfortable" }
      ]
    },
    {
      id: "backend",
      name: "Backend & Database",
      orderIndex: 2,
      skills: [
        { name: "MySQL", proficiency: 75, level: "Comfortable" },
        { name: "SQL Database Management", proficiency: 70, level: "Currently Learning" }
      ]
    },
    {
      id: "ai-analytics",
      name: "AI & Analytics",
      orderIndex: 3,
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
      orderIndex: 4,
      skills: [
        { name: "Git", proficiency: 80, level: "Comfortable" },
        { name: "GitHub", proficiency: 82, level: "Comfortable" },
        { name: "VS Code", proficiency: 90, level: "Comfortable" },
        { name: "Firebase", proficiency: 60, level: "Currently Learning" }
      ]
    }
  ];

  for (const cat of skillCategories) {
    const createdCat = await prisma.skillCategory.create({
      data: {
        id: cat.id,
        name: cat.name,
        orderIndex: cat.orderIndex
      }
    });

    for (let i = 0; i < cat.skills.length; i++) {
      const s = cat.skills[i];
      await prisma.skill.create({
        data: {
          categoryId: createdCat.id,
          name: s.name,
          proficiency: s.proficiency,
          level: s.level,
          orderIndex: i
        }
      });
    }
  }
  console.log(`✅ Skill categories and skills seeded (${skillCategories.length} categories)`);

  // 5. Seed Projects
  await prisma.project.deleteMany();
  const projectsData = [
    {
      id: "proj-1",
      title: "ATS Resume Builder",
      description: "An intelligent ATS (Applicant Tracking System) Resume Builder application designed to help job seekers format, optimize, and evaluate resumes for automated hiring systems.",
      longDescription: "Built to streamline resume creation with ATS-friendly layouts, keyword optimization, and real-time structure validation for modern job applications.",
      category: JSON.stringify(["Prompt Engineering", "AI"]),
      technologies: JSON.stringify(["Python", "Prompt Engineering", "Data Analytics"]),
      githubUrl: "https://github.com/ganichowdary07-ui/ATS-Resume-Bilder",
      liveDemoUrl: "#",
      featured: true,
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      highlights: JSON.stringify([
        "ATS keyword optimization & formatting engine",
        "Real-time resume scoring and structure analysis",
        "Clean prompt & interface design for job application workflows"
      ]),
      orderIndex: 0
    },
    {
      id: "proj-2",
      title: "Personal AI Portfolio Platform",
      description: "A modern, high-performance AI portfolio platform designed to showcase Ganesh's education, prompt engineering skills, projects, career goals, and professional profile.",
      longDescription: "Features an AI-inspired dark mode aesthetic, interactive Gani AI Assistant, GitHub integration, contact validation, and smooth responsive layout.",
      category: JSON.stringify(["Prompt Engineering", "AI"]),
      technologies: JSON.stringify(["Prompt Engineering", "AI Assistant", "Data Analytics"]),
      githubUrl: "https://github.com/ganichowdary07-ui/ATS-Resume-Bilder",
      liveDemoUrl: "#",
      featured: true,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      highlights: JSON.stringify([
        "Dynamic dark/light mode toggle with local storage persistence",
        "Interactive Gani AI Assistant bot with prompt engineering knowledge",
        "GitHub REST API integration for public repositories",
        "Full SEO optimization and automated PDF resume downloader"
      ]),
      orderIndex: 1
    },
    {
      id: "proj-3",
      title: "Food Donation Trust Platform",
      description: "A social-impact platform created for a charitable food donation initiative, connecting donors with community welfare initiatives.",
      longDescription: "Focuses on showcasing food donation activities, community social service, donor outreach, and encouraging people to support food security and community welfare initiatives effectively.",
      category: JSON.stringify(["Prompt Engineering", "Other"]),
      technologies: JSON.stringify(["Social Impact", "Prompt Tuning", "Community Welfare"]),
      githubUrl: "https://github.com/ganichowdary07-ui/ATS-Resume-Bilder",
      liveDemoUrl: "#",
      featured: true,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      highlights: JSON.stringify([
        "Charitable donation activity timeline and impact counters",
        "Interactive food pickup & contribution request forms",
        "Responsive donor gallery and social welfare story showcases"
      ]),
      orderIndex: 2
    }
  ];

  for (const proj of projectsData) {
    await prisma.project.create({ data: proj });
  }
  console.log(`✅ Projects seeded (${projectsData.length} records)`);

  // 6. Seed Journey Steps
  await prisma.journeyStep.deleteMany();
  const journeySteps = [
    {
      step: 1,
      title: "Computer Science Fundamentals",
      description: "Enrolled in B.Tech CSE at SRKR Engineering College. Building foundational knowledge in Data Structures, Algorithms, Computer Organization, and Software Concepts.",
      status: "Completed",
      technologies: JSON.stringify(["C", "C++", "Data Structures", "Computer Architecture"]),
      icon: "Code2"
    },
    {
      step: 2,
      title: "Programming Proficiency",
      description: "Strengthening core programming languages with a heavy focus on Python for scientific computing and software problem solving.",
      status: "Completed",
      technologies: JSON.stringify(["Python", "OOP", "Problem Solving"]),
      icon: "Terminal"
    },
    {
      step: 3,
      title: "Prompt Engineering",
      description: "Learning to design and engineer effective LLM prompts, persona instruction tuning, few-shot techniques, and chain-of-thought workflows for AI models.",
      status: "In Progress",
      technologies: JSON.stringify(["System Prompts", "Few-Shot Prompting", "Chain-of-Thought", "Context Tuning"]),
      icon: "Sparkles"
    },
    {
      step: 4,
      title: "Data & Analytics",
      description: "Exploring data analytics, visualization techniques, NumPy, Pandas, Matplotlib, and SQL database querying to derive actionable insights from complex datasets.",
      status: "In Progress",
      technologies: JSON.stringify(["Python Data Stack", "Pandas", "Matplotlib", "SQL", "Data Viz"]),
      icon: "BarChart3"
    },
    {
      step: 5,
      title: "Artificial Intelligence & Machine Learning",
      description: "Diving into machine learning algorithms, Neural Networks, Deep Learning concepts, Scikit-Learn, and AI application workflows.",
      status: "In Progress",
      technologies: JSON.stringify(["Scikit-Learn", "Machine Learning", "Neural Nets", "AI Models"]),
      icon: "Brain"
    },
    {
      step: 6,
      title: "AI Engineer",
      description: "Ultimate career goal: Building intelligent, scalable, real-world AI applications and multi-modal systems that solve complex societal and business challenges.",
      status: "Upcoming Goal",
      technologies: JSON.stringify(["LLMs", "Autonomous Agents", "Deep Learning", "AI Architecture"]),
      icon: "Sparkles"
    }
  ];

  for (const js of journeySteps) {
    await prisma.journeyStep.create({ data: js });
  }
  console.log(`✅ Journey steps seeded (${journeySteps.length} records)`);

  // 7. Seed Experience
  await prisma.experience.deleteMany();
  await prisma.experience.create({
    data: {
      title: "Fresher & Motivated Technical Learner",
      status: "Fresher",
      description: "Currently building practical experience through academic learning, self-learning, personal projects, and continuous technical development.",
      highlights: JSON.stringify([
        "Academic Projects at SRKR Engineering College (3rd Year B.Tech CSE)",
        "Hands-on AI prompt engineering learning & LLM instruction optimization",
        "Self-directed learning in Artificial Intelligence, Python data analysis, & Machine Learning",
        "Continuous problem-solving and active participation in coding exercises"
      ])
    }
  });
  console.log('✅ Experience card seeded');

  // 8. Seed Visitor Stat
  await prisma.visitorStat.upsert({
    where: { page: 'home' },
    update: {},
    create: {
      page: 'home',
      visitCount: 142
    }
  });
  console.log('✅ Visitor stats initialized');

  console.log('🎉 Database seeding completed successfully!');
}

seed()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
