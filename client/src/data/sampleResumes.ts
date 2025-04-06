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
    role: "Software Engineer",
    result: "Accepted",
    highlights: [
      "Highlighted problem-solving skills with specific examples",
      "Quantified impact with metrics and percentages",
      "Emphasized technical depth with side projects",
      "Used clean, minimal formatting focusing on content over style",
      "Listed specific project contributions and team impact"
    ]
  },
  {
    id: "2",
    company: "Microsoft",
    role: "Product Manager",
    result: "Interview",
    highlights: [
      "Demonstrated familiarity with Microsoft ecosystem and tools",
      "Emphasized collaborative achievements across teams",
      "Showcased customer-focused approach with examples",
      "Included metrics demonstrating product success",
      "Used clear, structured formatting with distinct sections"
    ]
  },
  {
    id: "3",
    company: "Amazon",
    role: "Software Development Engineer",
    result: "Accepted",
    highlights: [
      "Structured bullets as 'Accomplished X by implementing Y which led to Z'",
      "Connected achievements to Amazon's leadership principles",
      "Used metrics to quantify impact throughout",
      "Demonstrated ownership with end-to-end project examples",
      "Focused on customer-centric outcomes"
    ]
  },
  {
    id: "4",
    company: "MIT",
    role: "Graduate Program",
    result: "Accepted",
    highlights: [
      "Emphasized research experience and methodologies",
      "Highlighted interdisciplinary projects and approaches",
      "Listed relevant publications and academic achievements",
      "Showcased technical innovation with specific projects",
      "Focused on academic excellence with GPA and honors"
    ]
  }
];