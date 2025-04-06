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
  google: {
    id: "google",
    name: "Google",
    industry: "Technology",
    resumePreferences: {
      sectionOrder: ["Skills", "Projects", "Experience", "Education", "Certifications"],
      tone: "technical",
      keywords: ["algorithms", "scalability", "data structures", "machine learning", "problem-solving"],
      format: "clean and focused",
      emphasisOn: ["technical projects", "coding skills", "quantifiable impact"],
      avoid: ["vague statements", "excessive personal interests", "unrelated experience"]
    },
    tips: [
      "Use metrics to show impact (e.g., 'Increased system performance by 35%')",
      "Highlight problem-solving abilities and technical challenges you've overcome",
      "Include personal projects that demonstrate coding ability and innovation",
      "Google looks for leadership even in technical roles - include team leadership examples",
      "Keep formatting simple and ensure your resume is ATS-friendly"
    ],
    sampleResume: {
      role: "Software Engineer Intern",
      result: "Selected",
      highlights: ["Emphasized algorithm optimization", "Listed competitive programming achievements", "Showed quantitative impact of projects", "Mentioned open-source contributions"]
    }
  },
  
  microsoft: {
    id: "microsoft",
    name: "Microsoft",
    industry: "Technology",
    resumePreferences: {
      sectionOrder: ["Experience", "Skills", "Projects", "Education", "Certifications"],
      tone: "professional",
      keywords: ["software development", "Azure", "cloud computing", "teamwork", "enterprise solutions"],
      format: "structured and detailed",
      emphasisOn: ["experience", "Microsoft technologies", "collaboration skills"],
      avoid: ["excessive jargon", "competing platform emphasis", "overly creative formatting"]
    },
    tips: [
      "Highlight experience with Microsoft technologies if applicable",
      "Emphasize teamwork and collaborative achievements",
      "Include examples of user-focused design or development",
      "Microsoft values learning and growth - mention upskilling activities",
      "Be specific about technical skills and programming languages"
    ],
    sampleResume: {
      role: "Software Developer",
      result: "Selected",
      highlights: ["Detailed experience with enterprise software", "Listed Microsoft certifications", "Included collaboration examples", "Highlighted user-focused achievements"]
    }
  },
  
  amazon: {
    id: "amazon",
    name: "Amazon",
    industry: "Technology/Retail",
    resumePreferences: {
      sectionOrder: ["Experience", "Leadership", "Projects", "Skills", "Education"],
      tone: "results-oriented",
      keywords: ["scalability", "customer obsession", "leadership principles", "ownership", "metrics"],
      format: "achievement-focused",
      emphasisOn: ["leadership principles", "quantified achievements", "ownership"],
      avoid: ["vague claims", "group accomplishments without individual contribution", "passive language"]
    },
    tips: [
      "Align achievements with Amazon's Leadership Principles",
      "Use metrics and numbers to quantify all achievements",
      "Demonstrate customer obsession in your work examples",
      "Show ownership and bias for action in your descriptions",
      "Focus on deliver results and dive deep aspects of your experience"
    ],
    sampleResume: {
      role: "Product Manager",
      result: "Selected",
      highlights: ["Structured around leadership principles", "Every bullet had quantifiable metrics", "Demonstrated customer obsession", "Highlighted scrappy solutions"]
    }
  },
  
  mckinsey: {
    id: "mckinsey",
    name: "McKinsey & Company",
    industry: "Consulting",
    resumePreferences: {
      sectionOrder: ["Leadership", "Experience", "Education", "Skills", "Projects"],
      tone: "analytical",
      keywords: ["leadership", "analysis", "problem-solving", "client impact", "strategy"],
      format: "structured and concise",
      emphasisOn: ["leadership experience", "academic excellence", "analytical abilities"],
      avoid: ["technical jargon", "vague impacts", "excessive detail on technical projects"]
    },
    tips: [
      "Highlight leadership experiences prominently",
      "Include academic achievements and GPA if strong",
      "Frame accomplishments in terms of impact and results",
      "Demonstrate structured problem solving approaches",
      "Show client or stakeholder management experience"
    ],
    sampleResume: {
      role: "Business Analyst",
      result: "Selected",
      highlights: ["Emphasized leadership positions", "Highlighted top-tier education", "Showed structured problem-solving examples", "Quantified business impact"]
    }
  },
  
  apple: {
    id: "apple",
    name: "Apple",
    industry: "Technology",
    resumePreferences: {
      sectionOrder: ["Experience", "Skills", "Projects", "Education", "Certifications"],
      tone: "clean and minimal",
      keywords: ["design thinking", "user experience", "innovation", "attention to detail", "quality"],
      format: "elegant and simple",
      emphasisOn: ["design sensibility", "user focus", "innovation", "attention to detail"],
      avoid: ["cluttered design", "excessive technical jargon", "unfocused achievements"]
    },
    tips: [
      "Keep your resume design clean and minimal - reflect Apple's aesthetic",
      "Focus on user-centered design principles in your achievements",
      "Highlight innovation and creative problem-solving",
      "Demonstrate attention to detail and quality focus",
      "Show cross-functional collaboration abilities"
    ],
    sampleResume: {
      role: "UX Designer",
      result: "Selected",
      highlights: ["Minimalist design", "Focus on user-centered projects", "Highlighted design innovation", "Showed cross-functional teamwork"]
    }
  },
  
  netflix: {
    id: "netflix",
    name: "Netflix",
    industry: "Entertainment/Technology",
    resumePreferences: {
      sectionOrder: ["Experience", "Projects", "Skills", "Education"],
      tone: "direct and impact-focused",
      keywords: ["innovation", "autonomy", "high performance", "ownership", "entertainment technology"],
      format: "concise and achievement-focused",
      emphasisOn: ["autonomy", "innovation", "technical depth", "impact"],
      avoid: ["micromanagement examples", "risk-averse language", "process-heavy approaches"]
    },
    tips: [
      "Demonstrate high ownership and autonomy in previous roles",
      "Highlight innovative approaches and solutions",
      "Show examples of high performance and excellence",
      "Keep language direct and concise - avoid fluff",
      "Include entertainment-related experience if applicable"
    ],
    sampleResume: {
      role: "Senior Software Engineer",
      result: "Selected",
      highlights: ["Demonstrated high autonomy", "Showed innovation in approach", "Included entertainment industry context", "Highlighted performance optimization"]
    }
  },
  
  tesla: {
    id: "tesla",
    name: "Tesla",
    industry: "Automotive/Technology",
    resumePreferences: {
      sectionOrder: ["Projects", "Experience", "Skills", "Education"],
      tone: "innovation-focused",
      keywords: ["innovation", "engineering excellence", "sustainability", "problem-solving", "rapid iteration"],
      format: "concise and technical",
      emphasisOn: ["technical achievement", "innovative solutions", "fast execution"],
      avoid: ["bureaucratic language", "slow processes", "conventional approaches"]
    },
    tips: [
      "Highlight innovative engineering solutions",
      "Demonstrate fast execution and rapid iteration",
      "Show examples of challenging conventional approaches",
      "Include sustainability-related projects if applicable",
      "Emphasize technical depth and breadth"
    ],
    sampleResume: {
      role: "Mechanical Engineer",
      result: "Selected",
      highlights: ["Emphasized rapid prototyping skills", "Showcased innovative designs", "Highlighted sustainability focus", "Demonstrated technical depth"]
    }
  },
  
  iitb: {
    id: "iitb",
    name: "IIT Bombay",
    industry: "Education",
    resumePreferences: {
      sectionOrder: ["Education", "Academic Achievements", "Projects", "Skills", "Extracurriculars"],
      tone: "academic",
      keywords: ["academic excellence", "research", "technical skills", "olympiads", "competitive exams"],
      format: "comprehensive and academic",
      emphasisOn: ["academic achievements", "test scores", "research potential"],
      avoid: ["irrelevant work experience", "informal language", "vague accomplishments"]
    },
    tips: [
      "Highlight academic achievements, competitions, and olympiads",
      "Include standardized test scores prominently (SAT, JEE, etc.)",
      "Show research potential through projects and exploration",
      "Demonstrate well-rounded interests with relevant extracurriculars",
      "Include any publications or technical papers if applicable"
    ],
    sampleResume: {
      role: "Undergraduate Admission",
      result: "Selected",
      highlights: ["Listed all academic competitions and rankings", "Emphasized JEE rank", "Included science projects", "Showed technical depth"]
    }
  },
  
  mit: {
    id: "mit",
    name: "MIT",
    industry: "Education",
    resumePreferences: {
      sectionOrder: ["Education", "Projects", "Research", "Technical Skills", "Extracurriculars"],
      tone: "technical and innovative",
      keywords: ["innovation", "research", "technical projects", "leadership", "problem-solving"],
      format: "achievement-focused and technical",
      emphasisOn: ["research potential", "technical innovation", "leadership"],
      avoid: ["generic extracurriculars", "unrelated work experience", "vague technical claims"]
    },
    tips: [
      "Emphasize hands-on technical projects that demonstrate innovation",
      "Include research experience or potential research interests",
      "Highlight leadership in technical or academic contexts",
      "Demonstrate interdisciplinary thinking and collaboration",
      "Include specific technical skills and proficiencies"
    ],
    sampleResume: {
      role: "CS Program Admission",
      result: "Selected",
      highlights: ["Focused on technical projects", "Included research experience", "Highlighted innovation in solutions", "Showed interdisciplinary thinking"]
    }
  }
};

export function getCompanyPreferences(companyName: string): CompanyPreference | null {
  // Convert to lowercase and remove spaces for matching
  const normalizedInput = companyName.toLowerCase().replace(/\s+/g, '');
  
  // Try exact match first
  if (companyPreferences[normalizedInput]) {
    return companyPreferences[normalizedInput];
  }
  
  // Try partial matching
  for (const key in companyPreferences) {
    if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
      return companyPreferences[key];
    }
  }
  
  return null;
}

export const defaultResumePreferences = {
  sectionOrder: ["Experience", "Education", "Skills", "Projects", "Certifications"],
  tone: "professional",
  keywords: ["professional", "skilled", "experienced", "knowledgeable", "qualified"],
  format: "clean and professional",
  emphasisOn: ["relevant experience", "education", "skills"],
  avoid: ["irrelevant information", "personal details", "outdated experience"]
};

export const resumeTips = {
  college: [
    "Focus on academic achievements and relevant coursework",
    "Highlight standardized test scores if they're strong",
    "Include relevant projects that demonstrate academic potential",
    "Showcase extracurricular activities that demonstrate leadership",
    "Keep your resume to one page for undergraduate applications"
  ],
  job: [
    "Highlight relevant work experience and quantifiable achievements",
    "Match your skills to those mentioned in the job description",
    "Use action verbs to begin bullet points (e.g., 'Implemented', 'Developed')",
    "Include a tailored professional summary for each application",
    "Focus on achievements rather than responsibilities"
  ],
  creative: [
    "Consider a more visually engaging layout for creative industry applications",
    "Include a link to your portfolio or relevant work samples",
    "Showcase specific creative skills and software proficiencies",
    "Highlight collaborative creative projects and your specific contributions",
    "Demonstrate understanding of design principles or creative processes"
  ],
  tech: [
    "List relevant technical skills and programming languages prominently",
    "Include links to GitHub repositories or coding projects",
    "Highlight technical problem-solving abilities with specific examples",
    "Mention any contributions to open-source projects",
    "Include relevant certifications and technical training"
  ]
};