import { ResumeData } from "@/pages/ResumeBuilder";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Mail,
  Phone,
  MapPin,
  Link,
  Calendar
} from "lucide-react";

type ResumePreviewProps = {
  resumeData: ResumeData;
  template: string;
};

const ResumePreview = ({ resumeData, template }: ResumePreviewProps) => {
  // Dynamic styling based on template
  const getTemplateStyles = () => {
    switch (template) {
      case "modern":
        return {
          main: "font-sans",
          header: "bg-primary-600 text-white p-6",
          section: "mb-6",
          sectionTitle: "text-primary-600 font-bold text-lg mb-2 flex items-center",
          subsection: "mb-4 last:mb-0",
          name: "text-3xl font-bold",
          title: "text-xl opacity-90 mt-1",
          contactInfo: "mt-4 flex flex-wrap gap-4 opacity-90",
          sectionIcon: "mr-2 h-5 w-5",
          skillBadge: "bg-primary-100 text-primary-800 font-normal",
        };
      case "classic":
        return {
          main: "font-serif",
          header: "border-b-2 border-gray-800 pb-4 mb-6",
          section: "mb-6",
          sectionTitle: "text-gray-800 font-bold text-lg mb-2 uppercase border-b border-gray-300 pb-1",
          subsection: "mb-4 last:mb-0",
          name: "text-3xl font-bold text-center",
          title: "text-xl text-center mt-1",
          contactInfo: "mt-4 text-center flex justify-center flex-wrap gap-x-4 gap-y-2",
          sectionIcon: "hidden",
          skillBadge: "bg-gray-100 text-gray-800 font-normal",
        };
      case "creative":
        return {
          main: "font-sans",
          header: "p-6 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-md",
          section: "mb-6",
          sectionTitle: "text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 font-bold text-lg mb-2 flex items-center",
          subsection: "mb-4 last:mb-0 border-l-2 border-gray-200 pl-4 hover:border-primary-500 transition-colors",
          name: "text-3xl font-bold",
          title: "text-xl opacity-90 mt-1",
          contactInfo: "mt-4 flex flex-wrap gap-4 opacity-90",
          sectionIcon: "mr-2 h-5 w-5",
          skillBadge: "bg-gradient-to-r from-primary-100 to-purple-100 text-primary-800 font-normal",
        };
      case "minimalist":
        return {
          main: "font-sans",
          header: "mb-6",
          section: "mb-6",
          sectionTitle: "text-gray-900 font-bold text-lg mb-2 border-b border-gray-200 pb-1",
          subsection: "mb-4 last:mb-0",
          name: "text-3xl font-bold",
          title: "text-xl text-gray-600 mt-1",
          contactInfo: "mt-4 flex flex-wrap gap-4 text-gray-600",
          sectionIcon: "hidden",
          skillBadge: "bg-gray-100 text-gray-800 font-normal",
        };
      default:
        return {
          main: "font-sans",
          header: "bg-primary-600 text-white p-6",
          section: "mb-6",
          sectionTitle: "text-primary-600 font-bold text-lg mb-2 flex items-center",
          subsection: "mb-4 last:mb-0",
          name: "text-3xl font-bold",
          title: "text-xl opacity-90 mt-1",
          contactInfo: "mt-4 flex flex-wrap gap-4 opacity-90",
          sectionIcon: "mr-2 h-5 w-5",
          skillBadge: "bg-primary-100 text-primary-800 font-normal",
        };
    }
  };

  const styles = getTemplateStyles();

  // Helper function to check if a section has content
  const hasContent = {
    personalInfo: () => 
      resumeData.personalInfo.name || 
      resumeData.personalInfo.title || 
      resumeData.personalInfo.summary,
    education: () => resumeData.education.length > 0,
    experience: () => resumeData.experience.length > 0,
    skills: () => resumeData.skills.length > 0,
    projects: () => resumeData.projects.length > 0,
    certifications: () => resumeData.certifications.length > 0,
  };

  return (
    <div className={`print:text-black ${styles.main}`}>
      {/* Header with personal info */}
      {hasContent.personalInfo() && (
        <header className={styles.header}>
          {resumeData.personalInfo.name && (
            <h1 className={styles.name}>{resumeData.personalInfo.name}</h1>
          )}
          {resumeData.personalInfo.title && (
            <p className={styles.title}>{resumeData.personalInfo.title}</p>
          )}
          
          <div className={styles.contactInfo}>
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </header>
      )}

      <div className="p-6">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FileText className={styles.sectionIcon} />
              Professional Summary
            </h2>
            <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {hasContent.experience() && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Briefcase className={styles.sectionIcon} />
              Work Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className={styles.subsection}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-600 md:text-right flex items-center gap-1.5 mt-1 md:mt-0">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                  </div>
                  
                  {exp.location && (
                    <div className="text-sm text-gray-600 mt-1 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                  
                  {exp.description && (
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  )}
                  
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>
                          {highlight.startsWith('•') ? highlight.substring(1).trim() : highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {hasContent.education() && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <GraduationCap className={styles.sectionIcon} />
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className={styles.subsection}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-gray-600 md:text-right flex items-center gap-1.5 mt-1 md:mt-0">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                  
                  {edu.location && (
                    <div className="text-sm text-gray-600 mt-1 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                  
                  {edu.description && (
                    <p className="mt-2 text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {hasContent.skills() && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Code className={styles.sectionIcon} />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <Badge key={skill.id} className={styles.skillBadge}>
                  {skill.name}
                  {template === "modern" || template === "creative" ? 
                    <span className="ml-1.5 text-xs opacity-80">
                      {skill.level === 1 && "(Beginner)"}
                      {skill.level === 2 && "(Elementary)"}
                      {skill.level === 3 && "(Intermediate)"}
                      {skill.level === 4 && "(Advanced)"}
                      {skill.level === 5 && "(Expert)"}
                    </span> : null
                  }
                </Badge>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {hasContent.projects() && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Code className={styles.sectionIcon} />
              Projects
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((project) => (
                <div key={project.id} className={styles.subsection}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 text-sm flex items-center gap-1">
                        <Link className="h-3.5 w-3.5" />
                        <span>Project Link</span>
                      </a>
                    )}
                  </div>
                  
                  {project.description && (
                    <p className="mt-1 text-gray-700">{project.description}</p>
                  )}
                  
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>
                          {highlight.startsWith('•') ? highlight.substring(1).trim() : highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Certifications */}
        {hasContent.certifications() && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Award className={styles.sectionIcon} />
              Certifications
            </h2>
            <div className="space-y-4">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className={styles.subsection}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-700">{cert.issuer}</p>
                    </div>
                    {cert.date && (
                      <div className="text-sm text-gray-600 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{cert.date}</span>
                      </div>
                    )}
                  </div>
                  
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 text-sm flex items-center gap-1 mt-1">
                      <Link className="h-3.5 w-3.5" />
                      <span>View Certificate</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;