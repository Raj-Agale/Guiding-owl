import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Trash2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  UserCircle 
} from "lucide-react";
import { ResumeData } from "@/pages/ResumeBuilder";

type ResumeFormProps = {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
};

const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Professional title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().default(""),
  location: z.string().default(""),
  summary: z.string().min(20, "Summary should be at least 20 characters"),
});

const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const [activeSection, setActiveSection] = useState<string>("personal-info");
  
  // Personal info form
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: resumeData.personalInfo,
  });

  const onPersonalInfoSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        name: values.name,
        title: values.title,
        email: values.email,
        phone: values.phone || "",
        location: values.location || "",
        summary: values.summary,
      },
    });
    // Move to the next section
    setActiveSection("education");
  };

  // Helper functions for array fields
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: uuidv4(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: uuidv4(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
          highlights: [],
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: uuidv4(),
          name: "",
          level: 3,
        },
      ],
    });
  };

  const updateSkill = (index: number, field: string, value: string | number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          id: uuidv4(),
          name: "",
          description: "",
          url: "",
          highlights: [],
        },
      ],
    });
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        {
          id: uuidv4(),
          name: "",
          issuer: "",
          date: "",
          url: "",
        },
      ],
    });
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications.splice(index, 1);
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        value={activeSection}
        onValueChange={setActiveSection}
        className="space-y-5"
      >
        <AccordionItem value="personal-info" className="border border-gray-200/70 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline bg-gray-50/80 hover:bg-gray-50/90 transition-colors">
            <div className="flex items-center gap-3">
              <UserCircle className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Personal Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 py-6">
            <Form {...personalInfoForm}>
              <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={personalInfoForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={personalInfoForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={personalInfoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={personalInfoForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={personalInfoForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={personalInfoForm.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Summary*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly introduce yourself and highlight your professional strengths and career goals..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-2">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Save & Continue
                  </Button>
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="border border-gray-200/70 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline bg-gray-50/80 hover:bg-gray-50/90 transition-colors">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 py-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-6 last:mb-0">
                {index > 0 && <Separator className="mb-6" />}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg">Education #{index + 1}</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Institution*
                    </label>
                    <Input 
                      placeholder="University or School Name" 
                      value={edu.institution} 
                      onChange={(e) => updateEducation(index, "institution", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Degree*
                    </label>
                    <Input 
                      placeholder="Bachelor's, Master's, etc." 
                      value={edu.degree} 
                      onChange={(e) => updateEducation(index, "degree", e.target.value)} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Field of Study*
                    </label>
                    <Input 
                      placeholder="Computer Science, Business, etc." 
                      value={edu.field} 
                      onChange={(e) => updateEducation(index, "field", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Location
                    </label>
                    <Input 
                      placeholder="City, State, Country" 
                      value={edu.location} 
                      onChange={(e) => updateEducation(index, "location", e.target.value)} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Start Date
                    </label>
                    <Input 
                      placeholder="MM/YYYY" 
                      value={edu.startDate} 
                      onChange={(e) => updateEducation(index, "startDate", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      End Date (or Expected)
                    </label>
                    <Input 
                      placeholder="MM/YYYY or 'Present'" 
                      value={edu.endDate} 
                      onChange={(e) => updateEducation(index, "endDate", e.target.value)} 
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Description (optional)
                  </label>
                  <Textarea 
                    placeholder="Notable achievements, GPA, relevant coursework, etc." 
                    value={edu.description} 
                    onChange={(e) => updateEducation(index, "description", e.target.value)} 
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Button 
                type="button" 
                variant="outline"
                className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                onClick={addEducation}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
              <Button 
                type="button"
                className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => setActiveSection("experience")}
              >
                Continue to Experience
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="border border-gray-200/70 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline bg-gray-50/80 hover:bg-gray-50/90 transition-colors">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Work Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 py-6">
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                {index > 0 && <Separator className="mb-6" />}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg">Experience #{index + 1}</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Company/Organization*
                    </label>
                    <Input 
                      placeholder="Company Name" 
                      value={exp.company} 
                      onChange={(e) => updateExperience(index, "company", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Position/Title*
                    </label>
                    <Input 
                      placeholder="Job Title" 
                      value={exp.position} 
                      onChange={(e) => updateExperience(index, "position", e.target.value)} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Start Date
                    </label>
                    <Input 
                      placeholder="MM/YYYY" 
                      value={exp.startDate} 
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      End Date
                    </label>
                    <Input 
                      placeholder="MM/YYYY or 'Present'" 
                      value={exp.endDate} 
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)} 
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Location
                  </label>
                  <Input 
                    placeholder="City, State, Country or Remote" 
                    value={exp.location} 
                    onChange={(e) => updateExperience(index, "location", e.target.value)} 
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Description*
                  </label>
                  <Textarea 
                    placeholder="Brief overview of your role and responsibilities" 
                    value={exp.description} 
                    onChange={(e) => updateExperience(index, "description", e.target.value)} 
                    className="min-h-[80px]"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Key Achievements (one per line)
                  </label>
                  <Textarea 
                    placeholder="• Increased sales by 20%
• Led a team of 5 developers
• Implemented new system that reduced costs by 15%" 
                    value={exp.highlights.join("\n")} 
                    onChange={(e) => {
                      const highlights = e.target.value
                        .split("\n")
                        .map(line => line.trim())
                        .filter(line => line.length > 0);
                      updateExperience(index, "highlights", highlights);
                    }} 
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Start each achievement with a bullet point (•) or write one per line</p>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Button 
                type="button" 
                variant="outline"
                className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                onClick={addExperience}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Experience
              </Button>
              <Button 
                type="button"
                className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => setActiveSection("skills")}
              >
                Continue to Skills
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border border-gray-200/70 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline bg-gray-50/80 hover:bg-gray-50/90 transition-colors">
            <div className="flex items-center gap-3">
              <Code className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Skills</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 py-6">
            <div className="space-y-4">
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center space-x-4">
                  <div className="flex-grow">
                    <Input 
                      placeholder="Skill name (e.g., JavaScript, Project Management, etc.)" 
                      value={skill.name} 
                      onChange={(e) => updateSkill(index, "name", e.target.value)} 
                    />
                  </div>
                  <div className="w-32">
                    <select 
                      className="w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={skill.level}
                      onChange={(e) => updateSkill(index, "level", parseInt(e.target.value))}
                    >
                      <option value={1}>Beginner</option>
                      <option value={2}>Elementary</option>
                      <option value={3}>Intermediate</option>
                      <option value={4}>Advanced</option>
                      <option value={5}>Expert</option>
                    </select>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700 px-2"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Button 
                type="button" 
                variant="outline"
                className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                onClick={addSkill}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
              <Button 
                type="button"
                className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => setActiveSection("projects")}
              >
                Continue to Projects
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects" className="border border-gray-200/70 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline bg-gray-50/80 hover:bg-gray-50/90 transition-colors">
            <div className="flex items-center gap-3">
              <Code className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Projects</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 py-6">
            {resumeData.projects.map((project, index) => (
              <div key={project.id} className="mb-6 last:mb-0">
                {index > 0 && <Separator className="mb-6" />}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg">Project #{index + 1}</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Project Name*
                    </label>
                    <Input 
                      placeholder="Project Name" 
                      value={project.name} 
                      onChange={(e) => updateProject(index, "name", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Project URL (optional)
                    </label>
                    <Input 
                      placeholder="https://..." 
                      value={project.url} 
                      onChange={(e) => updateProject(index, "url", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Description*
                    </label>
                    <Textarea 
                      placeholder="Brief description of the project" 
                      value={project.description} 
                      onChange={(e) => updateProject(index, "description", e.target.value)} 
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Key Highlights (one per line)
                    </label>
                    <Textarea 
                      placeholder="• Built using React and Node.js
• Implemented responsive design
• Integrated payment processing" 
                      value={project.highlights.join("\n")} 
                      onChange={(e) => {
                        const highlights = e.target.value
                          .split("\n")
                          .map(line => line.trim())
                          .filter(line => line.length > 0);
                        updateProject(index, "highlights", highlights);
                      }} 
                      className="min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Start each highlight with a bullet point (•) or write one per line</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Button 
                type="button" 
                variant="outline"
                className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                onClick={addProject}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Project
              </Button>
              <Button 
                type="button"
                className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => setActiveSection("certifications")}
              >
                Continue to Certifications
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certifications" className="border border-gray-200/70 rounded-lg shadow-sm bg-white/90 backdrop-blur-sm overflow-hidden">
          <AccordionTrigger className="px-5 py-4 hover:no-underline bg-gray-50/80 hover:bg-gray-50/90 transition-colors">
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Certifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 py-6">
            {resumeData.certifications.map((cert, index) => (
              <div key={cert.id} className="mb-6 last:mb-0">
                {index > 0 && <Separator className="mb-6" />}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg">Certification #{index + 1}</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => removeCertification(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Certification Name*
                    </label>
                    <Input 
                      placeholder="Certification or License Name" 
                      value={cert.name} 
                      onChange={(e) => updateCertification(index, "name", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Issuing Organization*
                    </label>
                    <Input 
                      placeholder="Organization Name" 
                      value={cert.issuer} 
                      onChange={(e) => updateCertification(index, "issuer", e.target.value)} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Date Issued
                    </label>
                    <Input 
                      placeholder="MM/YYYY" 
                      value={cert.date} 
                      onChange={(e) => updateCertification(index, "date", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      URL (optional)
                    </label>
                    <Input 
                      placeholder="Link to credential" 
                      value={cert.url} 
                      onChange={(e) => updateCertification(index, "url", e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Button 
                type="button" 
                variant="outline"
                className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                onClick={addCertification}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Certification
              </Button>
              <Button 
                type="button"
                className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => alert("Resume data updated. You can now preview your resume.")}
              >
                Finish Resume
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResumeForm;