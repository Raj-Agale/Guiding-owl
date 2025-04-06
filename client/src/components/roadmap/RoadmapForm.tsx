import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { generateRoadmap } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { MapPin, AlertCircle, BookOpenCheck, Clock, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCareerPaths } from "@/lib/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type RoadmapFormProps = {
  onRoadmapGenerated: (roadmapData: any) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  selectedCareer: string;
};

const formSchema = z.object({
  career: z.string().min(1, "Please select a career path"),
  skills: z.string(),
  goals: z.string().min(10, "Please describe your goals in more detail"),
  education: z.string().default(""),
  experience: z.string().default(""),
  timeframe: z.enum(["short", "medium", "long"]).default("medium"),
  budget: z.enum(["low", "medium", "high"]).default("medium"),
  includeCertifications: z.boolean().default(true),
  includeOnlineCourses: z.boolean().default(true),
  includeMentorship: z.boolean().default(false),
  includeNetworking: z.boolean().default(true),
  detailLevel: z.number().min(1).max(5).default(3),
});

const RoadmapForm = ({ 
  onRoadmapGenerated, 
  isGenerating, 
  setIsGenerating,
  selectedCareer
}: RoadmapFormProps) => {
  const { toast } = useToast();
  const [advanced, setAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data: careerPaths, isLoading: isLoadingCareers } = useQuery({
    queryKey: ["/api/career-paths"],
    queryFn: getCareerPaths
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      career: selectedCareer || "",
      skills: "",
      goals: "",
      education: "",
      experience: "",
      timeframe: "medium",
      budget: "medium",
      includeCertifications: true,
      includeOnlineCourses: true,
      includeMentorship: false,
      includeNetworking: true,
      detailLevel: 3,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Extract skills as array
      const skillsArray = values.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      
      // Generate roadmap with all the additional parameters
      const roadmapData = await generateRoadmap(
        values.career,
        skillsArray.length > 0 ? skillsArray : ["None"],
        values.goals,
        {
          education: values.education,
          experience: values.experience,
          timeframe: values.timeframe,
          budget: values.budget,
          includeCertifications: values.includeCertifications,
          includeOnlineCourses: values.includeOnlineCourses,
          includeMentorship: values.includeMentorship,
          includeNetworking: values.includeNetworking,
          detailLevel: values.detailLevel,
        }
      );
      
      if (roadmapData.error) {
        setError(roadmapData.error);
        toast({
          title: "Error",
          description: roadmapData.error || "Failed to generate roadmap. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      onRoadmapGenerated(roadmapData);
      
      toast({
        title: "Roadmap Generated",
        description: "Your personalized career roadmap has been created successfully.",
      });
    } catch (error: any) {
      console.error("Error generating roadmap:", error);
      setError(error?.message || "Failed to generate roadmap. Please try again.");
      toast({
        title: "Error",
        description: error?.message || "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper for timeframe description
  const getTimeframeDescription = () => {
    const timeframe = form.watch("timeframe");
    switch (timeframe) {
      case "short": return "1-2 years";
      case "medium": return "3-5 years";
      case "long": return "5+ years";
      default: return "3-5 years";
    }
  };

  // Helper for budget description
  const getBudgetDescription = () => {
    const budget = form.watch("budget");
    switch (budget) {
      case "low": return "Minimal investment";
      case "medium": return "Moderate investment";
      case "high": return "Significant investment";
      default: return "Moderate investment";
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold">Generate Your Career Roadmap</h2>
      </div>
      
      <Card className="bg-gray-50 border-0 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium mb-1">How this works</h3>
              <p className="text-sm text-gray-600">
                Fill out the form below to generate a personalized roadmap for your chosen career path. 
                The more details you provide, the more tailored your roadmap will be.
                Toggle "Advanced Options" for more customization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="career"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Career Path</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isGenerating || isLoadingCareers}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a career path" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoadingCareers ? (
                      <SelectItem value="loading" disabled>Loading career paths...</SelectItem>
                    ) : careerPaths && careerPaths.length > 0 ? (
                      careerPaths.map((career) => (
                        <SelectItem key={career.id} value={career.title}>
                          {career.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>No career paths available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Skills (comma separated)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Python, JavaScript, Public Speaking" 
                    {...field} 
                    disabled={isGenerating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Career Goals & Aspirations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your career goals, target roles, and what you hope to achieve..."
                    className="resize-none min-h-[120px]"
                    {...field}
                    disabled={isGenerating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 py-4">
            <Switch
              id="advanced-mode"
              checked={advanced}
              onCheckedChange={setAdvanced}
              disabled={isGenerating}
            />
            <label htmlFor="advanced-mode" className="text-sm font-medium">
              Advanced Options
            </label>
          </div>

          {advanced && (
            <div className="space-y-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Educational Background</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Bachelor's in Computer Science, High School Diploma" 
                        {...field} 
                        disabled={isGenerating}
                      />
                    </FormControl>
                    <FormDescription>Your current level of education</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Experience</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. 2 years as Junior Developer, No prior experience" 
                        {...field} 
                        disabled={isGenerating}
                      />
                    </FormControl>
                    <FormDescription>Your current professional experience</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Timeframe
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isGenerating}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="short">Short-term</SelectItem>
                          <SelectItem value="medium">Medium-term</SelectItem>
                          <SelectItem value="long">Long-term</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>{getTimeframeDescription()}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Budget
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isGenerating}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low Budget</SelectItem>
                          <SelectItem value="medium">Medium Budget</SelectItem>
                          <SelectItem value="high">High Budget</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>{getBudgetDescription()}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormLabel className="flex items-center gap-2">
                  <BookOpenCheck className="h-4 w-4" />
                  Include in Roadmap
                </FormLabel>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="includeCertifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isGenerating}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Certifications</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="includeOnlineCourses"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isGenerating}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Online Courses</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="includeMentorship"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isGenerating}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Mentorship Options</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="includeNetworking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isGenerating}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Networking Opportunities</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="detailLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Level</FormLabel>
                    <FormControl>
                      <div className="pt-2">
                        <Slider
                          value={[field.value]}
                          min={1}
                          max={5}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          disabled={isGenerating}
                        />
                      </div>
                    </FormControl>
                    <div className="flex justify-between text-xs text-gray-500 pt-1">
                      <span>Basic</span>
                      <span>Moderate</span>
                      <span>Detailed</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full inline-block"></span>
                Generating Roadmap...
              </>
            ) : (
              "Generate Roadmap"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RoadmapForm;
