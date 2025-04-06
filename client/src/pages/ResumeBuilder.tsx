import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
  Link2,
  Search,
  Check,
  Building,
  Lightbulb,
  Info,
  Star,
  BookOpen,
  MessageSquare,
  PenTool
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ResumeTemplates from "@/components/resume/ResumeTemplates";
import SampleResumeViewer from "@/components/resume/SampleResumeViewer";
import { companyPreferences, getCompanyPreferences, resumeTips } from "@/data/companyPreferences";
import { sampleResumes, SampleResume } from "@/data/sampleResumes";
import { generateResumeContent } from "@/utils/generateResumeContent";

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

type ResumeType = 'college' | 'job' | 'creative' | 'tech' | 'company';

type ResumeIntent = {
  type: ResumeType;
  target?: string;
};

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
  },
  company: {
    icon: <Building className="h-5 w-5" />,
    label: 'Company-Specific',
    description: 'Targeted for a specific company',
    color: 'bg-indigo-500'
  }
};

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeIntent, setResumeIntent] = useState<ResumeIntent>({
    type: 'job',
    target: ''
  });
  const [intentInput, setIntentInput] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [targetCompany, setTargetCompany] = useState<string>("");
  const [companyPreference, setCompanyPreference] = useState<any>(null);
  const [showSampleResumes, setShowSampleResumes] = useState(false);
  const [activeSampleResume, setActiveSampleResume] = useState<string | null>(null);
  const [selectedResumeForViewing, setSelectedResumeForViewing] = useState<SampleResume | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "Professional summary goes here. Describe your experience, skills, and career goals."
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    extracurriculars: [],
    achievements: []
  });

  // Parse intent input to determine resume type and target
  const parseIntent = (input: string) => {
    // Reset first
    let newIntent: ResumeIntent = {
      type: 'job',
      target: ''
    };

    const inputLower = input.toLowerCase();
    
    // Check for educational institutions
    if (inputLower.includes('college') || 
        inputLower.includes('university') || 
        inputLower.includes('admission') || 
        inputLower.includes('iit') || 
        inputLower.includes('mit')) {
      newIntent.type = 'college';
      
      // Extract target institution if present
      const eduKeywords = ['iit', 'mit', 'harvard', 'stanford', 'university', 'college', 'school'];
      for (const keyword of eduKeywords) {
        if (inputLower.includes(keyword)) {
          const regex = new RegExp(`(\\w+\\s+)?${keyword}(\\s+\\w+)?`, 'i');
          const match = input.match(regex);
          if (match) {
            newIntent.target = match[0].trim();
            break;
          }
        }
      }
    } 
    // Check for creative industries
    else if (inputLower.includes('design') || 
             inputLower.includes('art') || 
             inputLower.includes('photo') || 
             inputLower.includes('creative')) {
      newIntent.type = 'creative';
    } 
    // Check for tech-specific
    else if (inputLower.includes('software') || 
             inputLower.includes('developer') || 
             inputLower.includes('coding') || 
             inputLower.includes('engineer') || 
             inputLower.includes('programmer')) {
      newIntent.type = 'tech';
    }
    // Check for specific company
    else {
      // Check against our company database
      const normalizedInput = inputLower.replace(/\s+/g, '');
      
      for (const key in companyPreferences) {
        const companyName = companyPreferences[key].name.toLowerCase();
        if (normalizedInput.includes(key) || 
            normalizedInput.includes(companyName.toLowerCase().replace(/\s+/g, ''))) {
          newIntent.type = 'company';
          newIntent.target = companyPreferences[key].name;
          setTargetCompany(companyPreferences[key].name);
          setCompanyPreference(companyPreferences[key]);
          break;
        }
      }
    }
    
    setResumeIntent(newIntent);
  };

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
    if (type === 'company') {
      // Keep the company info if switching to company type
      setResumeIntent({
        type: 'company',
        target: resumeIntent.type === 'company' ? resumeIntent.target : ''
      });
    } else {
      // Reset company info when switching to other types
      setResumeIntent({
        type: type,
        target: ''
      });
      setTargetCompany("");
      setCompanyPreference(null);
    }
  };

  const handleCompanySearch = () => {
    if (intentInput.trim() === '') return;
    
    // Try to find matching company
    const companyInfo = getCompanyPreferences(intentInput);
    
    if (companyInfo) {
      setTargetCompany(companyInfo.name);
      setCompanyPreference(companyInfo);
      setResumeIntent({
        type: 'company',
        target: companyInfo.name
      });
    } else {
      // No specific company match, use general parsing
      parseIntent(intentInput);
    }
  };

  const handleIntentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCompanySearch();
  };

  const handleIntentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCompanySearch();
    }
  };

  const handleGenerateWithAI = async () => {
    setIsAiGenerating(true);
    
    try {
      // Call our utility to generate AI-enhanced content
      const enhancedContent = await generateResumeContent({
        resumeData,
        companyPreference: resumeIntent.type === 'company' ? companyPreference : undefined,
        targetType: resumeIntent.type === 'company' ? undefined : resumeIntent.type as any
      });
      
      // Update resume data with AI-generated content
      setResumeData({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary: enhancedContent.personalInfo.summary
        },
        skills: enhancedContent.skills.length > 0 ? enhancedContent.skills : resumeData.skills,
        projects: enhancedContent.projects.length > 0 ? enhancedContent.projects : resumeData.projects,
        experience: resumeData.experience.map((exp, index) => {
          if (index < enhancedContent.experience.length) {
            return {
              ...exp,
              description: enhancedContent.experience[index].description,
              highlights: enhancedContent.experience[index].highlights
            };
          }
          return exp;
        })
      });
      
      // Switch to preview tab
      setActiveTab("preview");
    } catch (error) {
      console.error("Error generating resume content:", error);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Get relevant tips based on intent
  const getTips = () => {
    if (resumeIntent.type === 'company' && companyPreference) {
      return companyPreference.tips;
    } else {
      return resumeTips[resumeIntent.type as keyof typeof resumeTips] || resumeTips.job;
    }
  };

  // Get relevant sample resumes
  const getSampleResumes = () => {
    if (resumeIntent.type === 'company' && companyPreference) {
      return sampleResumes.filter(resume => 
        resume.company.toLowerCase() === companyPreference.name.toLowerCase());
    } else {
      // Filter by type - this is placeholder logic, would need actual type data in sampleResumes
      return sampleResumes.slice(0, 3);
    }
  };

  // Toggle the sample resume display
  const toggleSampleResume = (id: string) => {
    if (activeSampleResume === id) {
      setActiveSampleResume(null);
    } else {
      setActiveSampleResume(id);
    }
  };
  
  // View detailed sample resume
  const viewSampleResume = (resume: SampleResume) => {
    setSelectedResumeForViewing(resume);
  };

  return (
    <>
      <main className="min-h-screen py-8 bg-gradient-to-b from-gray-50 to-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-purple-700">
            OwlPath Resume Builder
          </h1>
          <p className="mt-3 text-gray-600 text-center max-w-2xl">
            Create targeted, optimized resumes for specific companies or career paths with AI assistance
          </p>
        </div>

        {/* Resume Intent Selector (Search box for company or type) */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
            <Search className="h-5 w-5 text-primary-600 mr-2" />
            Resume Intent
          </h2>
          
          <form onSubmit={handleIntentSubmit}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Enter company name or goal (e.g., 'Google SWE', 'McKinsey', or 'MIT Admission')"
                  value={intentInput}
                  onChange={(e) => setIntentInput(e.target.value)}
                  onKeyDown={handleIntentKeyDown}
                  className="pr-10 h-12 text-lg"
                />
                {intentInput && (
                  <button 
                    type="button"
                    onClick={() => setIntentInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
              <Button 
                type="submit"
                size="lg" 
                className="bg-primary-600 hover:bg-primary-700 text-white min-w-[120px]"
              >
                Set Target
              </Button>
            </div>
          </form>
          
          {/* Current intent display */}
          {(resumeIntent.type || resumeIntent.target) && (
            <div className="mt-4 flex items-center">
              <div className="bg-primary-50 text-primary-700 px-3 py-2 rounded-lg flex items-center">
                <span className="mr-2">Current target:</span>
                
                {resumeIntent.type === 'company' ? (
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 mr-2">
                    <Building className="h-3.5 w-3.5 mr-1" />
                    Company
                  </Badge>
                ) : (
                  <Badge className={`mr-2 ${
                    resumeIntent.type === 'college' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    resumeIntent.type === 'creative' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                    resumeIntent.type === 'tech' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                    'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {resumeTypeInfo[resumeIntent.type].icon}
                    <span className="ml-1">{resumeTypeInfo[resumeIntent.type].label}</span>
                  </Badge>
                )}
                
                {resumeIntent.target && (
                  <span className="font-medium">{resumeIntent.target}</span>
                )}
              </div>
            </div>
          )}
          
          {/* Type buttons - default options */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Or select a resume type:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {(Object.keys(resumeTypeInfo) as ResumeType[]).map((type) => (
                <div 
                  key={type}
                  className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-all hover:border-primary-300 hover:shadow-sm ${
                    resumeIntent.type === type 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleResumeTypeSelect(type)}
                >
                  <div className={`rounded-full p-1.5 ${resumeTypeInfo[type].color} text-white mb-1.5`}>
                    {resumeTypeInfo[type].icon}
                  </div>
                  <span className="font-medium text-xs">{resumeTypeInfo[type].label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area - split into column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Editor and AI Generator */}
          <div className="lg:w-3/5">
            {/* Sample Resumes Section - Moved to the very top of content as requested */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center text-gray-900">
                  <BookOpen className="h-5 w-5 text-emerald-500 mr-2" />
                  Previously Accepted Resumes
                  {resumeIntent.type === 'company' && companyPreference && (
                    <Badge className="ml-2 bg-indigo-100 text-indigo-800 border-indigo-200">
                      From {companyPreference.name}
                    </Badge>
                  )}
                </h3>
              </div>
              
              {/* Always show samples by default */}
              <div className="space-y-4">
                {getSampleResumes().map((resume) => (
                  <div 
                    key={resume.id} 
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSampleResume(resume.id)}
                    >
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{resume.role}</span>
                          <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                            {resume.result}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">{resume.company}</div>
                      </div>
                      <div className="flex items-center text-gray-400">
                        {activeSampleResume === resume.id ? "Hide" : "View"} 
                        <svg 
                          className={`h-5 w-5 ml-1 transition-transform ${activeSampleResume === resume.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {activeSampleResume === resume.id && (
                      <div className="p-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Key Resume Highlights:</h4>
                        <ul className="space-y-2 ml-2">
                          {resume.highlights.map((highlight: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Star className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                              <span className="text-sm text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {resume.resumeContent && (
                          <div className="mt-4 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-sm border-primary-200 text-primary-700 hover:bg-primary-50 flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                viewSampleResume(resume);
                              }}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View Full Resume
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Resume Tips Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                Resume Tips
                {resumeIntent.type === 'company' && companyPreference && (
                  <Badge className="ml-2 bg-indigo-100 text-indigo-800 border-indigo-200">
                    {companyPreference.name} Specific
                  </Badge>
                )}
              </h3>
              
              <ul className="space-y-3 pl-2">
                {getTips().map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-amber-100 text-amber-800 rounded-full p-0.5 mr-2 mt-1">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
              
              {/* Extra context for company specific resume */}
              {resumeIntent.type === 'company' && companyPreference && (
                <div className="mt-6 bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-indigo-900 mb-1">About {companyPreference.name}</h4>
                      <p className="text-sm text-indigo-800 mb-2">
                        Industry: {companyPreference.industry}
                      </p>
                      <div className="mb-2">
                        <span className="text-xs font-medium text-indigo-900 block mb-1.5">Resume Format Preferences:</span>
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant="outline" className="bg-white/80 text-xs">
                            {companyPreference.resumePreferences.format}
                          </Badge>
                          <Badge variant="outline" className="bg-white/80 text-xs">
                            {companyPreference.resumePreferences.tone} tone
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-indigo-900 block mb-1.5">Key Focus Areas:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {companyPreference.resumePreferences.emphasisOn.map((emphasis: string, i: number) => (
                            <Badge key={i} variant="outline" className="bg-white/80 text-xs">
                              {emphasis}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Resume Creation Options */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold mb-5 flex items-center text-gray-900">
                <FileStack className="h-5 w-5 text-primary-600 mr-2" />
                Resume Creation Options
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Option 1: AI-Generated Resume */}
                <div className="border border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-full p-3">
                      <Sparkles className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-center mb-2">AI-Generated</h4>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Let AI create your entire resume with minimal input from you
                  </p>
                  <Button 
                    className="w-full bg-primary-600 hover:bg-primary-700"
                    onClick={handleGenerateWithAI}
                    disabled={isAiGenerating}
                  >
                    {isAiGenerating ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>Create AI Resume</>
                    )}
                  </Button>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 text-center">Best for: Quick creation with professional results</p>
                  </div>
                </div>
                
                {/* Option 2: Enhanced Resume */}
                <div className="border border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-full p-3">
                      <PenTool className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-center mb-2">AI-Enhanced</h4>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Create your resume first, then enhance with AI suggestions
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => {
                      // First navigate to the form, then later enhance
                      setActiveTab("create");
                    }}
                  >
                    Start With This Option
                  </Button>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 text-center">Best for: Balance of personalization and optimization</p>
                  </div>
                </div>
                
                {/* Option 3: User-Made Resume */}
                <div className="border border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-full p-3">
                      <Pencil className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-center mb-2">Step-by-Step</h4>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Build your resume manually with guidance from templates
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full border-amber-200 text-amber-700 hover:bg-amber-50"
                    onClick={() => {
                      setActiveTab("create");
                    }}
                  >
                    Create From Scratch
                  </Button>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 text-center">Best for: Maximum control over your content</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resume Editor - Moved down as requested */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="border-b border-gray-100 p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <Pencil className="h-5 w-5 text-primary-600 mr-2" />
                  Resume Content
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab("templates")}
                  >
                    Templates
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
          </div>
          
          {/* Right column - Preview and actions */}
          <div className="lg:w-2/5">
            {/* Smart suggestions based on company or type */}
            {resumeIntent.type === 'company' && companyPreference && (
              <div className="bg-indigo-50 rounded-xl p-5 mb-8 border border-indigo-100">
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-1">Smart Suggestions for {companyPreference.name}</h3>
                    <p className="text-sm text-indigo-800 mb-3">
                      After generating your resume, you can use these options to fine-tune it:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="bg-white">
                        <PenTool className="h-3.5 w-3.5 mr-1.5" />
                        Highlight Technical Skills
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white">
                        <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                        More Corporate Tone
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white">
                        <Star className="h-3.5 w-3.5 mr-1.5" />
                        Add Quantifiable Results
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Resume Preview */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="border-b border-gray-100 p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileText className="h-5 w-5 text-primary-600 mr-2" />
                  Resume Preview
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">Template:</span>
                  <span className="font-medium capitalize">{selectedTemplate}</span>
                </div>
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
                
                {/* Action buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full bg-primary-600 hover:bg-primary-700" onClick={handleDownloadPDF}>
                      <Download className="h-4 w-4 mr-1.5" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handlePrint}>
                      <Printer className="h-4 w-4 mr-1.5" />
                      Print
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-start" onClick={handleSaveResume}>
                      <Save className="h-4 w-4 mr-1.5" />
                      Save Resume
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Share2 className="h-4 w-4 mr-1.5" />
                      Share Resume
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Template Selection */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="border-b border-gray-100 p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileStack className="h-5 w-5 text-primary-600 mr-2" />
                  Template
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
                  Browse All Templates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
      
      {/* Sample Resume Viewer Modal */}
      {selectedResumeForViewing && (
        <SampleResumeViewer
          sampleResume={selectedResumeForViewing}
          onClose={() => setSelectedResumeForViewing(null)}
        />
      )}
    </>
  );
};

export default ResumeBuilder;