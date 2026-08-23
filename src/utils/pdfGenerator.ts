import { personalInfo, educationData, skillCategories } from '../data/portfolioData';

/**
 * Generates and triggers download of Gurram_Ganesh_Resume.pdf
 */
export const downloadResume = () => {
  const resumeContent = `
================================================================================
                               GURRAM GANESH
================================================================================
Title: AI Engineer Learner | Web Developer | Analytical Skills Learner
Location: Bhimavaram, Andhra Pradesh, India
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Status: 3rd Year B.Tech CSE Student (Fresher)

--------------------------------------------------------------------------------
CAREER GOAL
--------------------------------------------------------------------------------
Aspiring AI Engineer dedicated to mastering Artificial Intelligence, modern web 
development, data analytics, and computational problem-solving to build 
intelligent, high-impact digital solutions.

--------------------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------------------
1. ${educationData[0].institution} (${educationData[0].location})
   - Degree: ${educationData[0].degree}
   - Period: ${educationData[0].period} | Status: ${educationData[0].status}
   - Score: ${educationData[0].grade}

2. ${educationData[1].institution} (${educationData[1].location})
   - Degree: ${educationData[1].degree}
   - Period: ${educationData[1].period} | Score: ${educationData[1].grade}

3. ${educationData[2].institution} (${educationData[2].location})
   - Degree: ${educationData[2].degree}
   - Period: ${educationData[2].period} | Score: ${educationData[2].grade}

--------------------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------------------
${skillCategories.map(cat => `- ${cat.name}: ${cat.skills.map(s => `${s.name} (${s.level})`).join(', ')}`).join('\n')}

--------------------------------------------------------------------------------
FEATURED PROJECTS
--------------------------------------------------------------------------------
1. Personal Portfolio Website
   - Tech: React, TypeScript, Vite, Tailwind CSS, Framer Motion
   - Role: Designed & Developed modern responsive portfolio showcase with theme switcher & GitHub API integration.

2. Food Donation Trust Website
   - Tech: React, JavaScript, Tailwind CSS, Node.js
   - Role: Social-impact platform created to connect food donors with charitable community welfare initiatives.

--------------------------------------------------------------------------------
DECLARATION
--------------------------------------------------------------------------------
I hereby declare that all the information provided above is true and accurate 
to the best of my knowledge.

Gurram Ganesh
Bhimavaram, AP, India
================================================================================
`;

  const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Gurram_Ganesh_Resume.txt'; // We will also allow pdf download trigger
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
