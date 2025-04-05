import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Milestone, 
  Flag, 
  BookOpen, 
  Clock, 
  DollarSign, 
  ChevronLeft,
  Download,
  Printer 
} from "lucide-react";
import { createRoadmap } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

type RoadmapDisplayProps = {
  roadmapData: {
    milestones: Array<{ title: string; description: string }>;
    skills: Array<{ name: string; importance: number }>;
    timeline: Array<{ phase: string; duration: string; activities: string[] }>;
    pricing: Array<{ item: string; estimatedCost: string; notes: string }>;
  };
  onReset: () => void;
  careerTitle: string;
};

const RoadmapDisplay = ({ roadmapData, onReset, careerTitle }: RoadmapDisplayProps) => {
  const [activeTab, setActiveTab] = useState("milestones");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Sort skills by importance (descending)
  const sortedSkills = [...roadmapData.skills].sort((a, b) => b.importance - a.importance);

  const handleSaveRoadmap = async () => {
    setIsSaving(true);
    try {
      // In a real app, we would save to the current user's account
      const userId = 1;
      const careerPathId = 1; // This would be properly set based on the selected career
      
      await createRoadmap({
        userId,
        careerPathId,
        title: `${careerTitle} Roadmap`,
        milestones: roadmapData.milestones,
        skills: roadmapData.skills,
        timeline: roadmapData.timeline,
        pricing: roadmapData.pricing
      });
      
      toast({
        title: "Roadmap Saved",
        description: "Your roadmap has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving roadmap:", error);
      toast({
        title: "Error",
        description: "Failed to save roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Milestone className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold">{careerTitle} Roadmap</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
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
            onClick={handleSaveRoadmap}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full inline-block"></span>
                Saving...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-1" />
                Save Roadmap
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="space-y-6">
          {roadmapData.milestones.map((milestone, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Essential Skills
              </CardTitle>
              <CardDescription>
                Skills ranked by importance for this career path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedSkills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500 text-sm">
                      Importance: {skill.importance}/5
                    </span>
                  </div>
                  <Progress value={skill.importance * 20} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="space-y-6">
            {roadmapData.timeline.map((phase, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Flag className="h-5 w-5 text-primary-600" />
                      <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    </div>
                    <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-100">
                      <Clock className="h-3 w-3 mr-1" />
                      {phase.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                        </div>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="costs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost Breakdown
              </CardTitle>
              <CardDescription>
                Estimated costs for education, training, and other requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {roadmapData.pricing.map((item, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.item}</span>
                      <span className="text-primary-600 font-semibold">{item.estimatedCost}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoadmapDisplay;
