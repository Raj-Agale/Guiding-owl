import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRightCircle, ArrowLeftCircle, AlertTriangle } from "lucide-react";

type PersonalityFormProps = {
  onSubmit: (answers: Record<string, number>) => void;
  isSubmitting: boolean;
};

// Questions based on popular personality assessment frameworks
const questions = [
  {
    id: "q1",
    text: "I prefer working with ideas rather than facts and details.",
    category: "Thinking Style",
  },
  {
    id: "q2",
    text: "I enjoy being in large social gatherings and meeting new people.",
    category: "Social Interaction",
  },
  {
    id: "q3",
    text: "I make decisions based on logical analysis rather than personal values.",
    category: "Decision Making",
  },
  {
    id: "q4",
    text: "I prefer to have a detailed plan rather than be spontaneous.",
    category: "Work Style",
  },
  {
    id: "q5",
    text: "I find it easy to adapt to new and unexpected situations.",
    category: "Adaptability",
  },
  {
    id: "q6",
    text: "I prefer to focus on one task at a time rather than multitasking.",
    category: "Focus",
  },
  {
    id: "q7",
    text: "I enjoy solving complex theoretical problems.",
    category: "Problem Solving",
  },
  {
    id: "q8",
    text: "I prefer to lead a team rather than follow someone else's direction.",
    category: "Leadership",
  },
  {
    id: "q9",
    text: "I prioritize achieving goals over maintaining harmony in relationships.",
    category: "Priorities",
  },
  {
    id: "q10",
    text: "I prefer work environments with clear structures and guidelines.",
    category: "Environment",
  },
  {
    id: "q11",
    text: "I like to try new approaches and methods rather than stick with what's proven.",
    category: "Innovation",
  },
  {
    id: "q12",
    text: "I enjoy work that requires attention to detail.",
    category: "Detail Orientation",
  },
  {
    id: "q13",
    text: "I prefer collaborative work over independent projects.",
    category: "Collaboration",
  },
  {
    id: "q14",
    text: "I find it important to consider how decisions affect people's feelings.",
    category: "Empathy",
  },
  {
    id: "q15",
    text: "I prefer to have a flexible schedule rather than a fixed routine.",
    category: "Structure",
  },
];

// Generate a schema based on the questions
const formSchema = z.object(
  questions.reduce(
    (acc, question) => ({
      ...acc,
      [question.id]: z.coerce.number().min(1, "Please answer this question").max(5),
    }),
    {}
  )
);

const PersonalityForm = ({ onSubmit, isSubmitting }: PersonalityFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const questionsPerSection = 5;
  const totalSections = Math.ceil(questions.length / questionsPerSection);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: questions.reduce(
      (acc, question) => ({
        ...acc,
        [question.id]: 0,
      }),
      {}
    ),
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };
  
  const currentQuestions = questions.slice(
    currentSection * questionsPerSection,
    (currentSection + 1) * questionsPerSection
  );
  
  const nextSection = () => {
    // Validate current section before proceeding
    const currentIds = currentQuestions.map(q => q.id);
    const isCurrentSectionValid = currentIds.every(id => form.getValues(id as any) > 0);
    
    if (!isCurrentSectionValid) {
      // Manually trigger validation for unanswered questions
      currentIds.forEach(id => {
        if (form.getValues(id as any) === 0) {
          form.setError(id as any, {
            type: 'manual',
            message: 'Please answer this question'
          });
        }
      });
      return;
    }
    
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const isLastSection = currentSection === totalSections - 1;
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Section {currentSection + 1} of {totalSections}
          </span>
          <span className="text-sm text-gray-500">
            {(currentSection * questionsPerSection) + 1}-{Math.min((currentSection + 1) * questionsPerSection, questions.length)} of {questions.length} questions
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6 bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-amber-800 mb-1">Instructions</h3>
              <p className="text-sm text-amber-700">
                Rate how well each statement describes you on a scale from 1 (Strongly Disagree) to 5 (Strongly Agree). 
                Be honest—there are no right or wrong answers. Your results will help identify career paths that match your personality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {currentQuestions.map((question) => (
            <FormField
              key={question.id}
              control={form.control}
              name={question.id as any}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="space-y-2">
                    <FormLabel className="text-base">
                      {question.text}
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Category: {question.category}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                      className="flex justify-between pt-2"
                    >
                      <div className="flex items-center">
                        <RadioGroupItem
                          value="1"
                          id={`${question.id}-1`}
                          className="sr-only peer"
                        />
                        <FormLabel
                          htmlFor={`${question.id}-1`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <span>1</span>
                          <span className="text-xs mt-1">Strongly Disagree</span>
                        </FormLabel>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem
                          value="2"
                          id={`${question.id}-2`}
                          className="sr-only peer"
                        />
                        <FormLabel
                          htmlFor={`${question.id}-2`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <span>2</span>
                          <span className="text-xs mt-1">Disagree</span>
                        </FormLabel>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem
                          value="3"
                          id={`${question.id}-3`}
                          className="sr-only peer"
                        />
                        <FormLabel
                          htmlFor={`${question.id}-3`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <span>3</span>
                          <span className="text-xs mt-1">Neutral</span>
                        </FormLabel>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem
                          value="4"
                          id={`${question.id}-4`}
                          className="sr-only peer"
                        />
                        <FormLabel
                          htmlFor={`${question.id}-4`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <span>4</span>
                          <span className="text-xs mt-1">Agree</span>
                        </FormLabel>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem
                          value="5"
                          id={`${question.id}-5`}
                          className="sr-only peer"
                        />
                        <FormLabel
                          htmlFor={`${question.id}-5`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <span>5</span>
                          <span className="text-xs mt-1">Strongly Agree</span>
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              <ArrowLeftCircle className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {!isLastSection ? (
              <Button 
                type="button" 
                onClick={nextSection}
              >
                Next
                <ArrowRightCircle className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full inline-block"></span>
                    Analyzing...
                  </>
                ) : (
                  "Submit Assessment"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalityForm;
