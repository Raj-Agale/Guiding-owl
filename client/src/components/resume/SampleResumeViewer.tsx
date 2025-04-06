import { useState } from "react";
import { SampleResume } from "@/data/sampleResumes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Download,
  FileText,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SampleResumeViewerProps {
  sampleResume: SampleResume;
  onClose: () => void;
}

const RESUME_URLS: Record<string, string> = {
  "Google": "https://www.livecareer.com/wp-content/uploads/2021/03/Software-Engineer-Resume-Example-Google.jpg",
  "Microsoft": "https://www.livecareer.com/wp-content/uploads/2021/03/software-engineer-resume-example-Microsoft.jpg",
  "Amazon": "https://www.kickresume.com/img/facebook/en/software-developer-resume-example.jpg",
  "Apple": "https://cdn.buttercms.com/JbZv3BVhT8Owgbh4SK0j",
  "Stanford": "https://www.livecareer.com/wp-content/uploads/2021/03/College-Student-Resume-Example-Stanford.jpg",
  "Harvard": "https://www.kickresume.com/img/resume-samples/student-main-image@2x.png",
  "MIT": "https://assets.kickresume.com/app/uploads/2023/04/07/student-sample-1.webp",
  "Oxford": "https://www.kickresume.com/img/facebook/en/student-resume-example.jpg",
  "Berkeley": "https://cdn.zety.com/images/zety-college-student-resume-example-1.jpg"
};

const SampleResumeViewer = ({ sampleResume, onClose }: SampleResumeViewerProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Determine resume URL based on company
  const getResumeUrl = () => {
    const company = sampleResume.company;
    return RESUME_URLS[company] || null;
  };

  const resumeUrl = getResumeUrl();
  
  const handleImageLoad = () => {
    setLoading(false);
  };
  
  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };
  
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Sample Resume: {sampleResume.company}</DialogTitle>
          <DialogDescription>
            {sampleResume.role} • <span className="text-green-600 font-medium">{sampleResume.result}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto my-4 flex flex-col">
          {resumeUrl ? (
            <div className="relative h-full min-h-[400px] bg-gray-50 rounded-md flex items-center justify-center">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                  <span className="ml-2 text-gray-500">Loading sample resume...</span>
                </div>
              )}
              
              <img 
                src={resumeUrl} 
                alt={`${sampleResume.company} ${sampleResume.role} Resume`}
                className="max-w-full h-auto object-contain rounded shadow-sm"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: loading ? 'none' : 'block' }}
              />
              
              {error && (
                <div className="text-center p-6">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Resume preview unavailable</h3>
                  <p className="text-gray-500 mb-4">
                    We couldn't load the sample resume preview for {sampleResume.company}.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-md">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No resume preview available</h3>
              <p className="text-gray-500 mb-4">
                We don't have a sample resume for {sampleResume.company} yet.
              </p>
            </div>
          )}
          
          {/* What Made This Resume Successful */}
          <div className="mt-6 bg-primary-50 border border-primary-100 rounded-md p-5">
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
        
        <DialogFooter className="flex justify-between items-center border-t pt-4">
          <div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {sampleResume.result}
            </Badge>
          </div>
          <div className="flex gap-2">
            {resumeUrl && !error && (
              <Button variant="outline" size="sm" onClick={() => window.open(resumeUrl, '_blank')}>
                <ExternalLink className="h-4 w-4 mr-1.5" />
                View Full Size
              </Button>
            )}
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SampleResumeViewer;