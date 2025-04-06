import { ResumeData } from "@/pages/ResumeBuilder";
import { CompanyPreference } from "@/data/companyPreferences";

// This is a placeholder for actual AI integration
// In a production app, this would call OpenAI or another AI service

export interface GenerateResumeContentParams {
  resumeData: ResumeData;
  companyPreference?: CompanyPreference;
  targetType?: 'college' | 'job' | 'creative' | 'tech';
  customPrompt?: string;
}

export interface EnhancedResumeContent {
  personalInfo: {
    summary: string;
  };
  skills: Array<{
    id: string;
    name: string;
    level: number;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    highlights: string[];
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    description: string;
    highlights: string[];
  }>;
}

// Mock function to simulate AI-generated content
export async function generateResumeContent({
  resumeData,
  companyPreference,
  targetType
}: GenerateResumeContentParams): Promise<EnhancedResumeContent> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Company or target specific content
  const companyName = companyPreference?.name || "";
  const isCompanySpecific = !!companyPreference;
  
  return {
    personalInfo: {
      summary: isCompanySpecific
        ? `Results-driven professional with expertise in ${companyPreference.resumePreferences.keywords.join(', ')}. Seeking to leverage skills at ${companyName} with focus on ${companyPreference.resumePreferences.emphasisOn.join(', ')}.`
        : `Professional with proven experience in ${targetType || 'various'} environments. Committed to delivering high-quality results through collaboration and continuous improvement.`
    },
    skills: [
      { id: "1", name: "Problem Solving", level: 5 },
      { id: "2", name: isCompanySpecific ? companyPreference.resumePreferences.keywords[0] : "Communication", level: 4 },
      { id: "3", name: isCompanySpecific ? companyPreference.resumePreferences.keywords[1] : "Team Collaboration", level: 4 },
      { id: "4", name: isCompanySpecific ? companyPreference.resumePreferences.keywords[2] : "Leadership", level: 3 },
      { id: "5", name: "Adaptability", level: 4 }
    ],
    projects: resumeData.projects.length > 0 
      ? resumeData.projects.map(project => ({
          ...project,
          description: isCompanySpecific 
            ? `Developed ${project.name} applying ${companyPreference.resumePreferences.keywords[0]} principles and focusing on ${companyPreference.resumePreferences.emphasisOn[0]}.`
            : `Successfully completed ${project.name} demonstrating strong skills and attention to detail.`,
          highlights: project.highlights.length > 0 ? project.highlights : [
            isCompanySpecific ? `Applied ${companyPreference.resumePreferences.keywords[0]} concepts` : "Completed project efficiently",
            "Implemented best practices",
            "Received positive feedback"
          ]
        }))
      : [
          {
            id: "1",
            name: "Professional Portfolio",
            description: isCompanySpecific 
              ? `Developed portfolio showcasing ${companyPreference.resumePreferences.keywords[0]} skills and ${companyPreference.resumePreferences.emphasisOn[0]} focus.`
              : "Created comprehensive portfolio highlighting professional skills and achievements.",
            url: "",
            highlights: [
              "Showcased key projects and achievements",
              "Implemented professional design principles",
              "Organized content for maximum impact"
            ]
          }
        ],
    experience: resumeData.experience.length > 0
      ? resumeData.experience.map(exp => ({
          ...exp,
          description: isCompanySpecific
            ? `Applied ${companyPreference.resumePreferences.keywords[0]} expertise at ${exp.company} with focus on ${companyPreference.resumePreferences.emphasisOn[0]}.`
            : `Performed various responsibilities at ${exp.company} as ${exp.position}.`,
          highlights: exp.highlights.length > 0 ? exp.highlights : [
            isCompanySpecific ? `Applied ${companyPreference.resumePreferences.emphasisOn[0]} approach to work` : "Collaborated with cross-functional teams",
            "Implemented process improvements",
            "Exceeded performance targets"
          ]
        }))
      : []
  };
}