import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Target, CheckCircle, Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGoalsByUserId, createGoal, updateGoal, deleteGoal } from "@/lib/data";

const categoryOptions = [
  { value: "education", label: "Education" },
  { value: "skills", label: "Skills Development" },
  { value: "certifications", label: "Certifications" },
  { value: "experience", label: "Work Experience" },
  { value: "projects", label: "Projects" },
  { value: "networking", label: "Networking" }
];

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  deadline: z.date().optional(),
  category: z.string(),
});

const GoalPlanner = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // For a real application, we would get the userId from authentication
  const userId = 1;

  const { data: goals, isLoading } = useQuery({
    queryKey: [`/api/goals/user/${userId}`],
    queryFn: () => getGoalsByUserId(userId)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: undefined,
      category: "education",
    },
  });

  // Create goal mutation
  const createGoalMutation = useMutation({
    mutationFn: (newGoal: any) => createGoal(newGoal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/goals/user/${userId}`] });
      toast({
        title: "Goal Created",
        description: "Your goal has been added successfully.",
      });
      form.reset({
        title: "",
        description: "",
        deadline: undefined,
        category: "education",
      });
      setSelectedDate(undefined);
    },
    onError: (error) => {
      console.error("Error creating goal:", error);
      toast({
        title: "Error",
        description: "Failed to create goal. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update goal mutation (for toggling completion)
  const updateGoalMutation = useMutation({
    mutationFn: ({ id, goal }: { id: number; goal: any }) => updateGoal(id, goal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/goals/user/${userId}`] });
    },
    onError: (error) => {
      console.error("Error updating goal:", error);
      toast({
        title: "Error",
        description: "Failed to update goal. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete goal mutation
  const deleteGoalMutation = useMutation({
    mutationFn: (id: number) => deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/goals/user/${userId}`] });
      toast({
        title: "Goal Deleted",
        description: "Your goal has been deleted successfully.",
      });
    },
    onError: (error) => {
      console.error("Error deleting goal:", error);
      toast({
        title: "Error",
        description: "Failed to delete goal. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createGoalMutation.mutate({
      ...values,
      userId,
      completed: false
    });
  };

  const toggleGoalCompletion = (goalId: number, currentStatus: boolean) => {
    updateGoalMutation.mutate({
      id: goalId,
      goal: {
        completed: !currentStatus
      }
    });
  };

  const handleDeleteGoal = (goalId: number) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoalMutation.mutate(goalId);
    }
  };

  // Group goals by category
  const groupedGoals = goals?.reduce((acc: Record<string, typeof goals>, goal) => {
    const category = goal.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(goal);
    return acc;
  }, {});

  const getCategoryLabel = (categoryValue: string) => {
    const category = categoryOptions.find(c => c.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      education: "bg-blue-100 text-blue-800",
      skills: "bg-green-100 text-green-800",
      certifications: "bg-purple-100 text-purple-800",
      experience: "bg-orange-100 text-orange-800",
      projects: "bg-pink-100 text-pink-800",
      networking: "bg-indigo-100 text-indigo-800"
    };
    
    return colorMap[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold">Add New Goal</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Complete Python Course" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add details about your goal..." 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          field.onChange(date);
                        }}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={createGoalMutation.isPending}
            >
              {createGoalMutation.isPending ? (
                <>
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full inline-block"></span>
                  Adding...
                </>
              ) : (
                "Add Goal"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold">Your Goals</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        ) : !goals || goals.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">You don't have any goals yet.</p>
              <p className="text-sm text-gray-500">Add your first goal using the form on the left.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {groupedGoals && Object.keys(groupedGoals).map((category) => (
              <Card key={category}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {getCategoryLabel(category)}
                    </CardTitle>
                    <Badge className={getCategoryColor(category)}>
                      {groupedGoals[category].length} {groupedGoals[category].length === 1 ? "goal" : "goals"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {groupedGoals[category].map((goal) => (
                      <div key={goal.id} className="py-2">
                        <div className="flex items-start">
                          <Checkbox 
                            checked={goal.completed}
                            onCheckedChange={() => toggleGoalCompletion(goal.id, goal.completed)}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-medium ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                                {goal.title}
                              </h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-gray-500 hover:text-red-600"
                                onClick={() => handleDeleteGoal(goal.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            {goal.description && (
                              <p className={`text-sm mt-1 ${goal.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                {goal.description}
                              </p>
                            )}
                            {goal.deadline && (
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Due: {format(new Date(goal.deadline), "PPP")}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Separator className="mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalPlanner;
