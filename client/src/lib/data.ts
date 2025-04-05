import { apiRequest } from "@/lib/queryClient";
import { 
  CareerPath, 
  Roadmap, 
  Goal, 
  PersonalityResult, 
  ChatMessage, 
  Resource 
} from "@shared/schema";

// Career paths functions
export async function getCareerPaths(): Promise<CareerPath[]> {
  const response = await apiRequest("GET", "/api/career-paths");
  return response.json();
}

export async function searchCareerPaths(query: string): Promise<CareerPath[]> {
  const response = await apiRequest("GET", `/api/career-paths/search?q=${encodeURIComponent(query)}`);
  return response.json();
}

export async function getCareerPathsByCategory(category: string): Promise<CareerPath[]> {
  const response = await apiRequest("GET", `/api/career-paths/category/${encodeURIComponent(category)}`);
  return response.json();
}

export async function getCareerPathById(id: number): Promise<CareerPath> {
  const response = await apiRequest("GET", `/api/career-paths/${id}`);
  return response.json();
}

// Roadmap functions
export async function getRoadmapsByUserId(userId: number): Promise<Roadmap[]> {
  const response = await apiRequest("GET", `/api/roadmaps/user/${userId}`);
  return response.json();
}

export async function getRoadmapById(id: number): Promise<Roadmap> {
  const response = await apiRequest("GET", `/api/roadmaps/${id}`);
  return response.json();
}

export async function createRoadmap(roadmap: any): Promise<Roadmap> {
  const response = await apiRequest("POST", "/api/roadmaps", roadmap);
  return response.json();
}

export async function updateRoadmap(id: number, roadmap: any): Promise<Roadmap> {
  const response = await apiRequest("PUT", `/api/roadmaps/${id}`, roadmap);
  return response.json();
}

export async function deleteRoadmap(id: number): Promise<void> {
  await apiRequest("DELETE", `/api/roadmaps/${id}`);
}

// Goals functions
export async function getGoalsByUserId(userId: number): Promise<Goal[]> {
  const response = await apiRequest("GET", `/api/goals/user/${userId}`);
  return response.json();
}

export async function createGoal(goal: any): Promise<Goal> {
  const response = await apiRequest("POST", "/api/goals", goal);
  return response.json();
}

export async function updateGoal(id: number, goal: any): Promise<Goal> {
  const response = await apiRequest("PUT", `/api/goals/${id}`, goal);
  return response.json();
}

export async function deleteGoal(id: number): Promise<void> {
  await apiRequest("DELETE", `/api/goals/${id}`);
}

// Chat functions
export async function getChatMessagesByUserId(userId: number): Promise<ChatMessage[]> {
  const response = await apiRequest("GET", `/api/chat/user/${userId}`);
  return response.json();
}

// Resources functions
export async function getResources(): Promise<Resource[]> {
  const response = await apiRequest("GET", "/api/resources");
  return response.json();
}

export async function getResourcesByCategory(category: string): Promise<Resource[]> {
  const response = await apiRequest("GET", `/api/resources/category/${encodeURIComponent(category)}`);
  return response.json();
}
