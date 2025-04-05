import { useState } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoadmapForm from "@/components/roadmap/RoadmapForm";
import RoadmapDisplay from "@/components/roadmap/RoadmapDisplay";
import GoalPlanner from "@/components/roadmap/GoalPlanner";
import { useQuery } from "@tanstack/react-query";
import { getCareerPathById } from "@/lib/data";

type RoadmapData = {
  milestones: Array<{ title: string; description: string }>;
  skills: Array<{ name: string; importance: number }>;
  timeline: Array<{ phase: string; duration: string; activities: string[] }>;
  pricing: Array<{ item: string; estimatedCost: string; notes: string }>;
};

const RoadmapBuilder = () => {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1]);
  const careerId = params.get("career") ? parseInt(params.get("career")!) : null;

  const [activeTab, setActiveTab] = useState("roadmap");
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: careerPath } = useQuery({
    queryKey: careerId ? [`/api/career-paths/${careerId}`] : null,
    queryFn: () => getCareerPathById(careerId!),
    enabled: !!careerId
  });

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {careerPath ? `${careerPath.title} Career Roadmap` : "Your Career Roadmap"}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Plan your career journey with personalized roadmaps and goal tracking
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="roadmap">Roadmap Generator</TabsTrigger>
            <TabsTrigger value="goals">Goal Planner</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-8">
            {!roadmapData ? (
              <div className="bg-white rounded-lg shadow-md p-8">
                <RoadmapForm 
                  onRoadmapGenerated={setRoadmapData} 
                  isGenerating={isGenerating}
                  setIsGenerating={setIsGenerating}
                  selectedCareer={careerPath?.title || ""}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8">
                <RoadmapDisplay 
                  roadmapData={roadmapData} 
                  onReset={() => setRoadmapData(null)}
                  careerTitle={careerPath?.title || "Your Selected Career"}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="goals" className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <GoalPlanner />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default RoadmapBuilder;
