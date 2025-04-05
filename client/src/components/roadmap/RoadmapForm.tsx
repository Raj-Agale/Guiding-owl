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
import { generateRoadmap } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { MapPin, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCareerPaths } from "@/lib/data";

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
});

const RoadmapForm = ({ 
  onRoadmapGenerated, 
  isGenerating, 
  setIsGenerating,
  selectedCareer
}: RoadmapFormProps) => {
  const { toast } = useToast();
  
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
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    try {
      // Extract skills as array
      const skillsArray = values.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      
      // Generate roadmap
      const roadmapData = await generateRoadmap(
        values.career,
        skillsArray.length > 0 ? skillsArray : ["None"],
        values.goals
      );
      
      onRoadmapGenerated(roadmapData);
      
      toast({
        title: "Roadmap Generated",
        description: "Your personalized career roadmap has been created successfully.",
      });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
