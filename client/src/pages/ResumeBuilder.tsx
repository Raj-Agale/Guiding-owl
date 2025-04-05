import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Download, FileText, Pencil, Printer } from "lucide-react";
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
};

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
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

  return (
    <main className="min-h-screen py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">
            Resume Builder
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Create a professional resume tailored to your target career path
          </p>
        </div>

        <div className="relative mb-8 mx-auto max-w-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-purple-100 blur rounded-lg"></div>
          <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-gray-100/80">
                <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm">Templates</TabsTrigger>
                <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm">Create</TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="space-y-4">
                <ResumeTemplates 
                  selectedTemplate={selectedTemplate} 
                  onSelectTemplate={handleTemplateSelect} 
                />
              </TabsContent>

              <TabsContent value="create" className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Pencil className="h-5 w-5 text-primary-600" />
                    <h2 className="text-xl font-semibold">Edit Your Resume</h2>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab("templates")}
                    >
                      Change Template
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab("preview")}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
                
                <ResumeForm 
                  resumeData={resumeData} 
                  setResumeData={setResumeData} 
                />
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary-600" />
                    <h2 className="text-xl font-semibold">Resume Preview</h2>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("create")}
                    >
                      Back to Editor
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                    >
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
                    </Button>
                  </div>
                </div>
                
                <Card className="print:shadow-none">
                  <CardContent className="p-6">
                    <ResumePreview 
                      resumeData={resumeData} 
                      template={selectedTemplate} 
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-center mt-6">
                  <Button onClick={handleSaveResume}>
                    Save Resume
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;