import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

type ResumeTemplatesProps = {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
};

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean, professional design with a touch of color",
    popular: true,
    color: "from-[#a48b7b] to-[#8d7a6a]"
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout perfect for conservative industries",
    popular: false,
    color: "from-[#9f9081] to-[#7d7266]"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative professionals",
    popular: true,
    color: "from-[#b79a83] to-[#96826e]"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple, elegant layout focusing on content",
    popular: false,
    color: "from-[#a59888] to-[#887b6c]"
  }
];

const ResumeTemplates = ({ selectedTemplate, onSelectTemplate }: ResumeTemplatesProps) => {
  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">Choose Your Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a professional template that best fits your target industry and personal style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary-600 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="relative">
              {/* Template preview with gradient background */}
              <div className={`aspect-[1.4/1] bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                {/* Resume mockup */}
                <div className="bg-white w-3/4 h-3/4 border shadow-md rounded flex flex-col p-3 transform rotate-1">
                  <div className="w-1/2 h-4 bg-gray-200 mb-3 rounded"></div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="w-full h-2 bg-gray-100 rounded-full"></div>
                    <div className="w-full h-2 bg-gray-100 rounded-full"></div>
                    <div className="w-3/4 h-2 bg-gray-100 rounded-full"></div>
                    <div className="mt-2 w-full h-6 bg-gray-100 rounded"></div>
                    <div className="flex gap-1 mt-1">
                      <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
                      <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 bg-white text-primary-600 rounded-full p-1 shadow-md">
                  <Check className="h-5 w-5" />
                </div>
              )}
              
              {/* Popular tag */}
              {template.popular && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-[#a97e58] to-[#8a6845] text-white text-xs px-2 py-1 rounded-full shadow-md flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  <span>Popular</span>
                </div>
              )}
            </div>
            
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </div>
                
                {selectedTemplate === template.id ? (
                  <Button 
                    size="sm" 
                    className="bg-[#9a7c5c] hover:bg-[#8a6c4c] text-white"
                  >
                    Selected
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-[#e9e2d8] hover:bg-[#f8f5f0] hover:text-[#9a7c5c]"
                    onClick={() => onSelectTemplate(template.id)}
                  >
                    Select
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button 
          disabled={!selectedTemplate}
          onClick={() => onSelectTemplate(selectedTemplate)}
          className="px-8 bg-gradient-to-r from-[#9a7c5c] to-[#7d6c57] hover:from-[#8a6c4c] hover:to-[#6d5c47] text-white shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          Continue with {templates.find(t => t.id === selectedTemplate)?.name || ''} Template
        </Button>
      </div>
    </div>
  );
};

export default ResumeTemplates;