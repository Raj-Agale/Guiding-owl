export interface SampleResume {
  id: string;
  company: string;
  role: string;
  result: string;
  image?: string;
  highlights: string[];
  link?: string;
}

export const sampleResumes: SampleResume[] = [
  {
    id: "1",
    company: "Google",
    role: "Software Engineer Intern",
    result: "Accepted",
    highlights: [
      "Used clean one-page format with focused bullet points",
      "Emphasized algorithm optimization projects",
      "Listed competitive programming achievements",
      "Highlighted open-source contributions",
      "Quantified impact of technical projects"
    ]
  },
  {
    id: "2",
    company: "Microsoft",
    role: "Software Developer",
    result: "Accepted",
    highlights: [
      "Showcased experience with Azure and cloud technologies",
      "Highlighted team collaboration achievements",
      "Included Microsoft certifications",
      "Emphasized user-focused development approach",
      "Used clean, structured format"
    ]
  },
  {
    id: "3",
    company: "Amazon",
    role: "Product Manager",
    result: "Accepted",
    highlights: [
      "Each bullet point aligned with Amazon Leadership Principles",
      "Every achievement included quantifiable metrics",
      "Emphasized customer-obsessed approaches",
      "Highlighted ownership of projects from concept to launch",
      "Used clear, results-oriented language"
    ]
  },
  {
    id: "4",
    company: "Apple",
    role: "UX Designer",
    result: "Accepted",
    highlights: [
      "Used minimalist, elegant resume design",
      "Focused on user-centered design projects",
      "Highlighted design innovation examples",
      "Demonstrated cross-functional collaboration",
      "Included portfolio link with matching aesthetic"
    ]
  },
  {
    id: "5",
    company: "McKinsey",
    role: "Business Analyst",
    result: "Accepted",
    highlights: [
      "Placed education (top school) and leadership positions first",
      "Included high GPA and academic achievements",
      "Emphasized analytical problem-solving examples",
      "Quantified business impact of previous work",
      "Used professional, concise language"
    ]
  },
  {
    id: "6",
    company: "Tesla",
    role: "Mechanical Engineer",
    result: "Accepted",
    highlights: [
      "Highlighted rapid prototyping and iteration projects",
      "Showcased innovative design solutions",
      "Included sustainability-focused achievements",
      "Demonstrated technical depth in relevant areas",
      "Used concise, impact-focused descriptions"
    ]
  },
  {
    id: "7",
    company: "Netflix",
    role: "Senior Software Engineer",
    result: "Accepted",
    highlights: [
      "Emphasized high autonomy in previous roles",
      "Highlighted innovative technical approaches",
      "Demonstrated performance optimization achievements",
      "Included relevant entertainment technology experience",
      "Used direct, concise language"
    ]
  },
  {
    id: "8",
    company: "MIT",
    role: "CS Program Admission",
    result: "Accepted",
    highlights: [
      "Highlighted technical projects showing innovation",
      "Included research experience with professors",
      "Emphasized interdisciplinary approach to problem-solving",
      "Listed specific technical proficiencies",
      "Included leadership in technical communities"
    ]
  },
  {
    id: "9",
    company: "IIT Bombay",
    role: "Undergraduate Admission",
    result: "Accepted",
    highlights: [
      "Showcased JEE rank prominently",
      "Listed academic competitions and olympiads",
      "Emphasized science and engineering projects",
      "Included extracurriculars showing well-rounded interests",
      "Highlighted technical aptitude across subjects"
    ]
  }
];