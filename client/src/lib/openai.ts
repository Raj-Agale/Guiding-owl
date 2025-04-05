import { apiRequest } from "@/lib/queryClient";

// Function to get AI career advice
export async function getCareerAdvice(message: string, userId: number = 1) {
  try {
    const response = await apiRequest("POST", "/api/chat", {
      userId,
      message
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error getting career advice:", error);
    throw error;
  }
}

// Function to generate a custom roadmap
export async function generateRoadmap(career: string, currentSkills: string[], goals: string) {
  try {
    const response = await apiRequest("POST", "/api/generate-roadmap", {
      career,
      currentSkills,
      goals
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
}

// Function to process personality test results
export async function analyzePersonalityTest(answers: Record<string, number>) {
  try {
    const response = await apiRequest("POST", "/api/personality-test", {
      answers
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error analyzing personality test:", error);
    throw error;
  }
}
