import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  Download, 
  FileText, 
  Pencil, 
  Printer, 
  GraduationCap, 
  Briefcase, 
  Camera, 
  Code, 
  Brain, 
  Sparkles, 
  FileStack,
  Save,
  Share2,
  Link2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ResumeTemplates from "@/components/resume/ResumeTemplates";

export type ResumeData = {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    goal?: string;
    academicFocus?: string;
    testScores?: {
      sat?: string;
      act?: string;
      gre?: string;
      ielts?: string;
      toefl?: string;
      other?: string;
    };
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    highlights: string[];
  }>;
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
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
  }>;
  extracurriculars?: Array<{
    id: string;
    activity: string;
    role: string;
    organization: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  achievements?: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
  }>;
};

type ResumeType = 'college' | 'job' | 'creative' | 'tech';

const resumeTypeInfo = {
  college: {
    icon: <GraduationCap className="h-5 w-5" />,
    label: 'College Resume',
    description: 'For SAT/abroad applications',
    color: 'bg-blue-500'
  },
  job: {
    icon: <Briefcase className="h-5 w-5" />,
    label: 'Internship/Job Resume',
    description: 'For professional opportunities',
    color: 'bg-emerald-500'
  },
  creative: {
    icon: <Camera className="h-5 w-5" />,
    label: 'Creative Resume',
    description: 'For photographers/designers',
    color: 'bg-purple-500'
  },
  tech: {
    icon: <Code className="h-5 w-5" />,
    label: 'Tech Resume',
    description: 'For coders/projects',
    color: 'bg-amber-500'
  }
};

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeType, setResumeType] = useState<ResumeType>('college');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "Aarav Singh",
      title: "Computer Science Student",
      email: "aarav.singh@example.com",
      phone: "+91 98765 43210",
      location: "Bangalore, India",
      summary: "Motivated Computer Science student with a passion for AI and machine learning. Seeking opportunities to apply technical skills in a practical environment.",
      goal: "Get into MIT (CS)",
      academicFocus: "SAT + AI Projects",
      testScores: {
        sat: "1520/1600"
      }
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    extracurriculars: [],
    achievements: []
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setActiveTab("create");
  };

  const handleSaveResume = () => {
    // In a real application, we would save this to the backend
    alert("Resume saved successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real application, this would generate a PDF file
    alert("PDF download functionality would be implemented here");
  };

  const handleResumeTypeSelect = (type: ResumeType) => {
    setResumeType(type);
  };

  const handleGenerateWithAI = () => {
    setIsAiGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      // In a real application, this would call OpenAI to enhance the resume
      const enhancedResume = {
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary: "Driven Computer Science student with demonstrated proficiency in AI and machine learning. Experienced in developing Python-based applications integrating custom NLP modules and seeking to leverage technical expertise to drive innovation in computational problem-solving."
        },
        skills: [
          { id: "1", name: "Python Programming", level: 4 },
          { id: "2", name: "Machine Learning", level: 3 },
          { id: "3", name: "Data Structures", level: 4 },
          { id: "4", name: "Natural Language Processing", level: 3 },
          { id: "5", name: "Problem Solving", level: 5 }
        ],
        projects: [
          { 
            id: "1", 
            name: "Voice Assistant with NLP", 
            description: "Developed a Python-based voice assistant, integrating custom NLP modules for task automation and contextual understanding of user commands.", 
            url: "github.com/aarav/voice-assistant", 
            highlights: ["Implemented speech recognition with 95% accuracy", "Designed modular architecture for extensibility", "Integrated with multiple APIs for enhanced functionality"]
          }
        ]
      };
      setResumeData(enhancedResume);
      setIsAiGenerating(false);
      setActiveTab("preview");
    }, 3000);
  };

  return (
    <main className="min-h-screen py-10 bg-gradient-to-b from-gray-50 to-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: User Info Summary (Top Banner) */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-primary-100 rounded-full p-3 mr-4">
              <Brain className="h-7 w-7 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{resumeData.personalInfo.name || "User"}</h2>
              <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1">
                <span className="flex items-center">
                  <span className="font-medium">Goal:</span>
                  <span className="ml-1">{resumeData.personalInfo.goal || "Not set"}</span>
                </span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="flex items-center">
                  <span className="font-medium">Focus:</span>
                  <span className="ml-1">{resumeData.personalInfo.academicFocus || "Not set"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveResume}>
              <Save className="h-4 w-4 mr-1.5" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1.5" />
              Print
            </Button>
            <Button className="bg-primary-600 hover:bg-primary-700" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-1.5" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Main content area - split into two columns on desktop */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 order-2 lg:order-1">
            {/* Section 2: Resume Type Selector */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <FileStack className="h-5 w-5 text-primary-600 mr-2" />
                Resume Type
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(resumeTypeInfo) as ResumeType[]).map((type) => (
                  <div 
                    key={type}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary-300 hover:shadow-md ${
                      resumeType === type 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => handleResumeTypeSelect(type)}
                  >
                    <div className={`rounded-full p-2 ${resumeTypeInfo[type].color} text-white mb-2`}>
                      {resumeTypeInfo[type].icon}
                    </div>
                    <span className="font-medium text-sm">{resumeTypeInfo[type].label}</span>
                    <span className="text-xs text-gray-500 text-center mt-1">{resumeTypeInfo[type].description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Editable Resume Form */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="border-b border-gray-100 p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <Pencil className="h-5 w-5 text-primary-600 mr-2" />
                  Resume Content
                </h3>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab("templates")}
                    className="mr-2"
                  >
                    Change Template
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setActiveTab("preview")}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Preview
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <ResumeForm 
                  resumeData={resumeData} 
                  setResumeData={setResumeData} 
                />
              </div>
            </div>

            {/* Section 4: Smart Resume Generator (AI) */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl shadow-sm p-6 text-white">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">AI Resume Enhancement</h3>
                  <p className="text-white/80 mb-4">
                    Let our AI analyze your resume content and suggest professional improvements that align with your career goals.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="bg-white/20 rounded-full p-1 mr-2 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm">Professionally rewrite your summary and descriptions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-white/20 rounded-full p-1 mr-2 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm">Adapt content tone for your selected resume type</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-white/20 rounded-full p-1 mr-2 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm">Highlight relevant skills and achievements</span>
                    </li>
                  </ul>
                  <Button 
                    className="bg-white text-primary-600 hover:bg-white/90"
                    onClick={handleGenerateWithAI}
                    disabled={isAiGenerating}
                  >
                    {isAiGenerating ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                        Enhancing Resume...
                      </>
                    ) : (
                      <>
                        Generate using AI
                      </>
                    )}
                  </Button>
                  <div className="mt-4 flex items-center">
                    <span className="mr-2 text-xs opacity-75">Powered by OpenAI</span>
                    <Badge className="bg-white/20 text-white text-xs hover:bg-white/30">
                      Beta Feature
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Live Preview + Template Selection */}
          <div className="lg:w-1/3 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="border-b border-gray-100 p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileText className="h-5 w-5 text-primary-600 mr-2" />
                  Resume Preview
                </h3>
              </div>
              <div className="p-4">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="aspect-[8.5/11] bg-white rounded-md border shadow-sm overflow-hidden">
                    <ResumePreview 
                      resumeData={resumeData} 
                      template={selectedTemplate} 
                    />
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" className="w-full" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-1.5" />
                    Print
                  </Button>
                  <Button className="w-full bg-primary-600 hover:bg-primary-700" size="sm" onClick={handleDownloadPDF}>
                    <Download className="h-4 w-4 mr-1.5" />
                    Download
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="justify-start text-gray-600">
                    <Save className="h-4 w-4 mr-1.5" />
                    Save to Profile
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start text-gray-600">
                    <Share2 className="h-4 w-4 mr-1.5" />
                    Share Resume
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start text-gray-600">
                    <Link2 className="h-4 w-4 mr-1.5" />
                    Get Shareable Link
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileStack className="h-5 w-5 text-primary-600 mr-2" />
                  Template Style
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {["modern", "classic", "creative", "minimalist"].map((template) => (
                    <div 
                      key={template} 
                      className={`rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                        selectedTemplate === template 
                          ? 'border-primary-500' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="aspect-[4/5] bg-gray-50 relative">
                        {/* Simplified template preview */}
                        <div className="absolute inset-2 bg-white rounded border shadow-sm p-1.5">
                          {/* Header */}
                          <div className="w-full h-3 bg-gray-300 rounded-sm mb-1.5"></div>
                          {/* Content */}
                          <div className="flex gap-1">
                            {template === "modern" || template === "minimalist" ? (
                              <>
                                <div className="w-1/3 h-12 bg-gray-100 rounded-sm"></div>
                                <div className="w-2/3 space-y-1">
                                  <div className="w-full h-1.5 bg-gray-200 rounded-sm"></div>
                                  <div className="w-full h-1.5 bg-gray-200 rounded-sm"></div>
                                  <div className="w-2/3 h-1.5 bg-gray-200 rounded-sm"></div>
                                </div>
                              </>
                            ) : (
                              <div className="w-full space-y-1">
                                <div className="w-1/2 h-2 bg-gray-300 rounded-sm"></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-sm"></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-sm"></div>
                                <div className="w-3/4 h-1.5 bg-gray-200 rounded-sm"></div>
                              </div>
                            )}
                          </div>
                        </div>
                        {selectedTemplate === template && (
                          <div className="absolute top-1 right-1 bg-primary-500 rounded-full p-0.5">
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-2 text-center">
                        <span className="text-xs font-medium capitalize">{template}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-center text-primary-600"
                  onClick={() => setActiveTab("templates")}
                >
                  View All Templates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;