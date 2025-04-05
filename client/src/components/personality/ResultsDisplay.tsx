import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  UserCircle2, 
  ThumbsUp, 
  AlertTriangle, 
  Briefcase,
  Printer,
  RotateCcw 
} from "lucide-react";
import { Link } from "wouter";

type ResultsDisplayProps = {
  results: {
    personalityType: string;
    strengths: string[];
    weaknesses: string[];
    recommendedCareers: Array<{ name: string; description: string; fit: number }>;
  };
  onRetakeTest: () => void;
};

const ResultsDisplay = ({ results, onRetakeTest }: ResultsDisplayProps) => {
  const [activeTab, setActiveTab] = useState("summary");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <UserCircle2 className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold">Your Personality Results</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-1" />
            Print Results
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRetakeTest}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Retake Test
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="careers">Career Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle>Personality Profile</CardTitle>
                <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-100 text-sm py-1">
                  {results.personalityType.split(" ")[0]}
                </Badge>
              </div>
              <CardDescription>
                Based on your answers, we've analyzed your personality traits and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p>{results.personalityType}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-base">Your Strengths</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-5 w-5 flex items-center justify-center mt-0.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                          </div>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <CardTitle className="text-base">Areas for Growth</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-5 w-5 flex items-center justify-center mt-0.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-600"></div>
                          </div>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Based on your personality profile, we've identified several career paths that may be a good fit for you.
                </p>
                <Button onClick={() => setActiveTab("careers")}>
                  View Career Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attributes">
          <Card>
            <CardHeader>
              <CardTitle>Your Personality Attributes</CardTitle>
              <CardDescription>
                A deeper look at the key traits that make up your personality profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 max-w-xl mx-auto">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Introversion</span>
                    <span className="font-medium">Extraversion</span>
                  </div>
                  <Progress value={65} className="h-4" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Practical</span>
                    <span className="font-medium">Intuitive</span>
                  </div>
                  <Progress value={40} className="h-4" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Logical</span>
                    <span className="font-medium">Empathetic</span>
                  </div>
                  <Progress value={55} className="h-4" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Spontaneous</span>
                    <span className="font-medium">Structured</span>
                  </div>
                  <Progress value={75} className="h-4" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Traditional</span>
                    <span className="font-medium">Innovative</span>
                  </div>
                  <Progress value={60} className="h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="careers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Recommended Career Paths
              </CardTitle>
              <CardDescription>
                Career paths that match your personality type, interests, and strengths
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {results.recommendedCareers.map((career, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{career.name}</h3>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Compatibility:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`h-3 w-3 rounded-full mx-0.5 ${
                                i < career.fit 
                                  ? "bg-green-500" 
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{career.description}</p>
                    <div className="flex justify-end">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/explore?search=${encodeURIComponent(career.name)}`}>
                          Explore This Career
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Want to learn more about these career paths and create a personalized roadmap?
                </p>
                <Button asChild>
                  <Link href="/roadmap">
                    Create Career Roadmap
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
