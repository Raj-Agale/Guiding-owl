import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Link } from "lucide-react";

interface ShareResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareResumeDialog = ({ open, onOpenChange }: ShareResumeDialogProps) => {
  const [copied, setCopied] = useState(false);
  
  // Generate a shareable link (in a real app this would create a unique identifier)
  const shareableLink = `${window.location.origin}/resume?share=true`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Resume</DialogTitle>
          <DialogDescription>
            Share your resume with others using this link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <div className="flex items-center p-2 border rounded-md bg-background">
              <Link className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground truncate">
                {shareableLink}
              </span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Anyone with this link will be able to view your resume. 
            You can share it via email, messaging apps, or social media.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareResumeDialog;