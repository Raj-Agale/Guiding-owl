import { useState } from "react";
import { SampleResume } from "@/data/sampleResumes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Briefcase,
  GraduationCap,
  User,
  Star,
  Code,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Award,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SampleResumeViewerProps {
  sampleResume: SampleResume;
  onClose: () => void;
}

const SampleResumeViewer = ({ sampleResume, onClose }: SampleResumeViewerProps) => {
  const { resumeContent } = sampleResume;
  
  if (!resumeContent) {
    return (
      <Dialog open={true} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Sample Resume</DialogTitle>
            <DialogDescription>
              Detailed resume content not available.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center">
            <Button onClick={onClose} className="mt-4">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="py-2 border-b">
          <DialogTitle>Sample Resume: {sampleResume.company}</DialogTitle>
          <DialogDescription className="text-sm">
            {sampleResume.role} • {sampleResume.result}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-1">
        
      
      <div className="p-6 bg-gray-50">
        {/* Resume Header */}
        <div className="bg-white border rounded-md shadow-sm mb-6 p-6">
          <h1 className="text-2xl font-bold text-gray-900">{resumeContent.personalInfo.name}</h1>
          <p className="text-lg text-gray-700 mt-1">{resumeContent.personalInfo.title}</p>
          
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
            {resumeContent.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-primary-500" />
                <span>{resumeContent.personalInfo.email}</span>
              </div>
            )}
            {resumeContent.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-primary-500" />
                <span>{resumeContent.personalInfo.phone}</span>
              </div>
            )}
            {resumeContent.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span>{resumeContent.personalInfo.location}</span>
              </div>
            )}
          </div>
          
          {resumeContent.personalInfo.summary && (
            <div className="mt-4">
              <p className="text-gray-700">{resumeContent.personalInfo.summary}</p>
            </div>
          )}
        </div>
        
        {/* Resume Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Experience Section */}
            {resumeContent.experience && resumeContent.experience.length > 0 && (
              <section className="bg-white border rounded-md shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 text-primary-500 mr-2" />
                  Experience
                </h2>
                
                <div className="space-y-5">
                  {resumeContent.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4 hover:border-primary-500 transition-colors">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-gray-700">{exp.company}</p>
                        </div>
                        <div className="text-sm text-gray-600 md:text-right flex items-center gap-1.5 mt-1 md:mt-0">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{exp.dates}</span>
                        </div>
                      </div>
                      
                      {exp.description && (
                        <p className="mt-2 text-gray-700">{exp.description}</p>
                      )}
                      
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1 text-gray-700">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Projects Section */}
            {resumeContent.projects && resumeContent.projects.length > 0 && (
              <section className="bg-white border rounded-md shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Code className="h-5 w-5 text-primary-500 mr-2" />
                  Projects
                </h2>
                
                <div className="space-y-5">
                  {resumeContent.projects.map((project, index) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4 hover:border-primary-500 transition-colors">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      
                      {project.description && (
                        <p className="mt-1 text-gray-700">{project.description}</p>
                      )}
                      
                      {project.highlights && project.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1 text-gray-700">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Education Section */}
            {resumeContent.education && resumeContent.education.length > 0 && (
              <section className="bg-white border rounded-md shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 text-primary-500 mr-2" />
                  Education
                </h2>
                
                <div className="space-y-4">
                  {resumeContent.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{edu.dates}</span>
                      </p>
                      {edu.field && <p className="text-gray-700 mt-1">{edu.field}</p>}
                      {edu.gpa && <p className="text-gray-700 mt-1">GPA: {edu.gpa}</p>}
                      
                      {edu.achievements && edu.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1 text-gray-700">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Skills Section */}
            {resumeContent.skills && resumeContent.skills.length > 0 && (
              <section className="bg-white border rounded-md shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 text-primary-500 mr-2" />
                  Skills
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  {resumeContent.skills.map((skill, index) => (
                    <Badge key={index} className="bg-primary-100 text-primary-800 border-primary-200 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
            
            {/* Achievements Section */}
            {resumeContent.achievements && resumeContent.achievements.length > 0 && (
              <section className="bg-white border rounded-md shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 text-primary-500 mr-2" />
                  Achievements
                </h2>
                
                <ul className="space-y-2 text-gray-700">
                  {resumeContent.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
        
        {/* What Made This Resume Successful */}
        <div className="mt-8 bg-primary-50 border border-primary-100 rounded-md p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <FileText className="h-5 w-5 text-primary-600 mr-2" />
            Why This Resume Was Successful
          </h2>
          
          <ul className="space-y-2">
            {sampleResume.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SampleResumeViewer;