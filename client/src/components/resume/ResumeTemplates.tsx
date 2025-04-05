import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type ResumeTemplatesProps = {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
};

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean, professional design with a touch of color",
    thumbnail: "modern-template.jpg"
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout perfect for conservative industries",
    thumbnail: "classic-template.jpg"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative professionals",
    thumbnail: "creative-template.jpg"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple, elegant layout focusing on content",
    thumbnail: "minimalist-template.jpg"
  }
];

const ResumeTemplates = ({ selectedTemplate, onSelectTemplate }: ResumeTemplatesProps) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Choose a Template</h2>
        <p className="text-gray-600">
          Select a professional template that best fits your target industry and personal style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary-600' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="relative aspect-[3/4] bg-gray-100 flex items-center justify-center">
              {/* In a real app, we would display actual thumbnails */}
              <div className="bg-white w-3/4 h-3/4 border shadow-sm flex flex-col p-2">
                <div className="w-full h-1/5 bg-gray-200 mb-2"></div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="w-full h-2 bg-gray-100"></div>
                  <div className="w-full h-2 bg-gray-100"></div>
                  <div className="w-4/5 h-2 bg-gray-100"></div>
                </div>
              </div>
              
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button 
          disabled={!selectedTemplate}
          onClick={() => onSelectTemplate(selectedTemplate)}
          className="px-8"
        >
          Continue with {templates.find(t => t.id === selectedTemplate)?.name || ''} Template
        </Button>
      </div>
    </div>
  );
};

export default ResumeTemplates;