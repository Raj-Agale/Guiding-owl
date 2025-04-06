import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Star, CheckCircle2, PanelLeft, Users, LayoutGrid, Palette, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    color: "from-[#a48b7b] to-[#8d7a6a]",
    rating: 4.9,
    ideal: "Tech & Business Professionals",
    features: [
      "Clean sidebar layout", 
      "Skills visualization",
      "Professional headers"
    ],
    previewStyle: {
      header: true,
      sidebar: true,
      skills: true, 
      contact: true
    }
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout perfect for conservative industries",
    popular: false,
    color: "from-[#9f9081] to-[#7d7266]",
    rating: 4.7,
    ideal: "Legal, Finance & Medical",
    features: [
      "Conservative layout", 
      "Chronological format",
      "Emphasis on experience"
    ],
    previewStyle: {
      header: false,
      sidebar: false,
      skills: false,
      contact: false
    }
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative professionals",
    popular: true,
    color: "from-[#b79a83] to-[#96826e]",
    rating: 4.8,
    ideal: "Design, Marketing & Arts",
    features: [
      "Eye-catching headers", 
      "Portfolio highlights",
      "Creative skills display"
    ],
    previewStyle: {
      header: true,
      sidebar: false,
      skills: true,
      contact: true
    }
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple, elegant layout focusing on content",
    popular: false,
    color: "from-[#a59888] to-[#887b6c]",
    rating: 4.6,
    ideal: "Academic & Research",
    features: [
      "Clean whitespace", 
      "Content-focused layout",
      "Subtle formatting"
    ],
    previewStyle: {
      header: false,
      sidebar: true,
      skills: false,
      contact: true
    }
  }
];

const ResumeTemplates = ({ selectedTemplate, onSelectTemplate }: ResumeTemplatesProps) => {
  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">Choose Your Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a professional template that best fits your target industry and personal style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              <div className={`aspect-[1.4/1] bg-gradient-to-br ${template.color} flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-10"></div>
                
                {/* Resume mockup */}
                <div className="bg-white w-3/4 h-3/4 border shadow-md rounded flex overflow-hidden transform rotate-1 relative z-10">
                  {/* Sidebar if applicable */}
                  {template.previewStyle.sidebar && (
                    <div className="w-1/3 h-full bg-gray-100 p-3 flex flex-col">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mb-2"></div>
                      <div className="w-2/3 h-2 bg-gray-200 rounded-full mb-3"></div>
                      
                      <div className="mt-2">
                        <div className="w-full h-2.5 bg-gray-200 rounded-full mb-1.5"></div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full mb-1.5"></div>
                        <div className="w-2/3 h-2.5 bg-gray-200 rounded-full"></div>
                      </div>
                      
                      {template.previewStyle.skills && (
                        <div className="mt-auto">
                          <div className="w-full h-3 bg-gray-200 rounded-full mb-1.5"></div>
                          <div className="w-2/3 h-2 bg-gray-300 rounded-full mb-1"></div>
                          <div className="w-full h-3 bg-gray-200 rounded-full mb-1.5"></div>
                          <div className="w-1/2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  )}
                
                  {/* Main content */}
                  <div className={`${template.previewStyle.sidebar ? 'w-2/3' : 'w-full'} h-full p-3 flex flex-col`}>
                    {/* Header style */}
                    {template.previewStyle.header ? (
                      <div className="w-full h-8 bg-gray-200 mb-3 rounded flex items-center px-2">
                        <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <div className="w-1/2 h-4 bg-gray-800 mb-1 rounded"></div>
                        <div className="w-1/3 h-3 bg-gray-400 rounded"></div>
                      </div>
                    )}
                    
                    {/* Content blocks */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="w-1/3 h-3 bg-gray-700 rounded mb-1"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                      <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
                      
                      <div className="mt-2">
                        <div className="w-1/3 h-3 bg-gray-700 rounded mb-1"></div>
                        <div className="flex justify-between mb-1">
                          <div className="w-1/3 h-2.5 bg-gray-400 rounded"></div>
                          <div className="w-1/4 h-2.5 bg-gray-400 rounded"></div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      
                      {!template.previewStyle.sidebar && template.previewStyle.skills && (
                        <div className="mt-2">
                          <div className="w-1/3 h-3 bg-gray-700 rounded mb-1"></div>
                          <div className="flex gap-2 flex-wrap">
                            <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                            <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
                            <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 bg-white text-primary-600 rounded-full p-1.5 shadow-md">
                  <Check className="h-5 w-5" />
                </div>
              )}
              
              {/* Popular tag */}
              {template.popular && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-[#a97e58] to-[#8a6845] text-white text-xs px-3 py-1.5 rounded-full shadow-md flex items-center">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  <span>Popular Choice</span>
                </div>
              )}
              
              {/* Rating */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-md shadow-sm flex items-center">
                <Star className="h-3.5 w-3.5 text-amber-500 mr-1 fill-amber-500" />
                <span>{template.rating}/5</span>
              </div>
            </div>
            
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
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
              
              <Badge variant="outline" className="bg-[#f8f5f0] text-[#9a7c5c] border-[#e9e2d8] mb-3">
                Ideal for: {template.ideal}
              </Badge>
              
              <div className="space-y-2">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#9a7c5c] mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button 
          disabled={!selectedTemplate}
          onClick={() => onSelectTemplate(selectedTemplate)}
          className="px-8 py-6 bg-gradient-to-r from-[#9a7c5c] to-[#7d6c57] hover:from-[#8a6c4c] hover:to-[#6d5c47] text-white text-lg shadow-md hover:shadow-lg transition-all"
        >
          Continue with {templates.find(t => t.id === selectedTemplate)?.name || ''} Template
        </Button>
      </div>
    </div>
  );
};

export default ResumeTemplates;