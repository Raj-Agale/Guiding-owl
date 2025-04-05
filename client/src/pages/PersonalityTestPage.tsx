import { useState } from "react";
import PersonalityForm from "@/components/personality/PersonalityForm";
import ResultsDisplay from "@/components/personality/ResultsDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzePersonalityTest } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

type PersonalityResult = {
  personalityType: string;
  strengths: string[];
  weaknesses: string[];
  recommendedCareers: Array<{ name: string; description: string; fit: number }>;
};

const PersonalityTestPage = () => {
  const [activeTab, setActiveTab] = useState("test");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<PersonalityResult | null>(null);
  const { toast } = useToast();

  const handleSubmitTest = async (answers: Record<string, number>) => {
    setIsSubmitting(true);
    try {
      const results = await analyzePersonalityTest(answers);
      setResults(results);
      setActiveTab("results");
      
      // In a real app, we would save the results to the database here
      // using something like:
      // await createPersonalityResult({
      //   userId: currentUser.id,
      //   personalityType: results.personalityType,
      //   strengths: results.strengths,
      //   weaknesses: results.weaknesses,
      //   recommendedCareers: results.recommendedCareers
      // });
    } catch (error) {
      console.error("Error analyzing personality test:", error);
      toast({
        title: "Error",
        description: "Failed to analyze your test results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetakeTest = () => {
    setResults(null);
    setActiveTab("test");
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Career Personality Assessment
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover careers that align with your unique personality traits, interests, and strengths
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="test" disabled={isSubmitting}>
              Take Assessment
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!results}>
              View Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="test" className="mt-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <PersonalityForm 
                onSubmit={handleSubmitTest} 
                isSubmitting={isSubmitting} 
              />
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            {results && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <ResultsDisplay 
                  results={results}
                  onRetakeTest={handleRetakeTest}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default PersonalityTestPage;
