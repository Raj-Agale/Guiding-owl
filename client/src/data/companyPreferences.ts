export interface CompanyPreference {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  resumePreferences: {
    sectionOrder: string[];
    tone: string;
    keywords: string[];
    format: string;
    emphasisOn: string[];
    avoid: string[];
  };
  tips: string[];
  sampleResume?: {
    role: string;
    result: string;
    highlights: string[];
    link?: string;
  };
}

export const companyPreferences: Record<string, CompanyPreference> = {
  "google": {
    id: "google",
    name: "Google",
    industry: "Technology",
    resumePreferences: {
      sectionOrder: ["summary", "experience", "skills", "projects", "education", "certifications"],
      tone: "technical",
      keywords: ["algorithms", "scalability", "innovation", "machine learning", "data structures"],
      format: "clean and focused",
      emphasisOn: ["technical skills", "problem-solving", "impact"],
      avoid: ["vague statements", "responsibilities without results", "outdated technologies"],
    },
    tips: [
      "Highlight your problem-solving abilities with concrete examples",
      "Quantify your impact with specific metrics whenever possible",
      "Include side projects that demonstrate technical depth",
      "Keep formatting clean and minimalist - Google values substance over style",
      "Emphasize teamwork and collaborative contributions"
    ]
  },
  "microsoft": {
    id: "microsoft",
    name: "Microsoft",
    industry: "Technology",
    resumePreferences: {
      sectionOrder: ["summary", "skills", "experience", "education", "projects", "certifications"],
      tone: "professional",
      keywords: ["collaboration", "cloud", "enterprise", "scale", "innovation"],
      format: "structured and clean",
      emphasisOn: ["team contributions", "customer focus", "technical skills"],
      avoid: ["competitor product names", "vague achievements", "overly casual language"],
    },
    tips: [
      "Highlight Microsoft technologies you have worked with",
      "Emphasize collaborative achievements and team contributions",
      "Showcase your ability to learn and adapt to new technologies",
      "Include customer or user-focused results and impact",
      "Mention experience with cloud technologies, particularly Azure"
    ]
  },
  "amazon": {
    id: "amazon",
    name: "Amazon",
    industry: "Technology/Retail",
    resumePreferences: {
      sectionOrder: ["summary", "experience", "skills", "education", "projects", "certifications"],
      tone: "results-oriented",
      keywords: ["ownership", "customer obsession", "scale", "optimization", "efficiency"],
      format: "data-driven",
      emphasisOn: ["measurable impact", "leadership principles", "technical depth"],
      avoid: ["subjective claims", "team projects without individual contribution details", "vague statements"],
    },
    tips: [
      "Structure your experience bullets as Accomplished X by implementing Y which led to Z",
      "Align your achievements with Amazon's leadership principles",
      "Quantify your impact with specific metrics and percentages",
      "Focus on customer impact and business outcomes",
      "Demonstrate ownership by highlighting projects you led from start to finish"
    ]
  },
  "mit": {
    id: "mit",
    name: "MIT",
    industry: "Education",
    resumePreferences: {
      sectionOrder: ["education", "research", "projects", "experience", "skills", "achievements"],
      tone: "academic",
      keywords: ["innovation", "research", "interdisciplinary", "technical excellence", "hands-on"],
      format: "research and project-focused",
      emphasisOn: ["technical innovation", "research potential", "practical application"],
      avoid: ["vague academic claims", "unrelated experiences", "generic statements"],
    },
    tips: [
      "Focus on projects that demonstrate hands-on technical ability",
      "Highlight interdisciplinary approaches and cross-domain thinking",
      "Include any research experience, even if informal or self-directed",
      "Emphasize innovation and novel approaches to problem-solving",
      "Showcase collaborative projects and teamwork capabilities"
    ]
  }
};

export function getCompanyPreferences(companyName: string): CompanyPreference | null {
  const normalizedName = companyName.toLowerCase().replace(/\s+/g, "");
  
  // Direct match with company ID
  if (normalizedName in companyPreferences) {
    return companyPreferences[normalizedName];
  }
  
  // Search for partial matches
  for (const key in companyPreferences) {
    const company = companyPreferences[key];
    if (normalizedName.includes(key) || 
        key.includes(normalizedName) || 
        normalizedName.includes(company.name.toLowerCase().replace(/\s+/g, ""))) {
      return company;
    }
  }
  
  return null;
}

export const defaultResumePreferences = {
  sectionOrder: ["summary", "experience", "education", "skills", "projects", "certifications"],
  tone: "professional",
  keywords: ["professional", "experienced", "skilled", "effective", "reliable"],
  format: "standard",
  emphasisOn: ["experience", "skills", "achievements"],
  avoid: ["irrelevant information", "personal details", "spelling errors"]
};

export const resumeTips = {
  "college": [
    "Emphasize academic achievements, GPA, and relevant coursework",
    "Include projects that demonstrate skills relevant to your target program",
    "Highlight extracurricular activities that show leadership and initiative",
    "Focus on research experience, publications, or academic competitions",
    "Include standardized test scores (SAT, ACT, GRE, etc.) if they are strong"
  ],
  "job": [
    "Tailor your resume to each job application by matching keywords from the job description",
    "Quantify your achievements with specific metrics and results",
    "Use action verbs to start each bullet point in your experience section",
    "Keep formatting clean and consistent for easy readability",
    "Include relevant skills and certifications that match job requirements"
  ],
  "creative": [
    "Consider alternative formats that showcase your creative abilities",
    "Include a link to your portfolio or samples of your work",
    "Highlight creative problem-solving abilities with specific examples",
    "Demonstrate versatility across different creative mediums or tools",
    "Balance unique design with readability and professional presentation"
  ],
  "tech": [
    "List specific technical skills, languages, frameworks, and tools",
    "Include links to GitHub repositories or technical projects",
    "Demonstrate problem-solving abilities through technical challenges",
    "Highlight experience with relevant technologies and methodologies",
    "Include quantifiable results and improvements from your technical work"
  ]
};