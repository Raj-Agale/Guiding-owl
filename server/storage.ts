import {
  User,
  InsertUser,
  CareerPath,
  InsertCareerPath,
  Roadmap,
  InsertRoadmap,
  Goal,
  InsertGoal,
  PersonalityResult,
  InsertPersonalityResult,
  ChatMessage,
  InsertChatMessage,
  Resource,
  InsertResource
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Career paths methods
  getCareerPaths(): Promise<CareerPath[]>;
  getCareerPathById(id: number): Promise<CareerPath | undefined>;
  getCareerPathsByCategory(category: string): Promise<CareerPath[]>;
  searchCareerPaths(query: string): Promise<CareerPath[]>;

  // Roadmap methods
  getRoadmapsByUserId(userId: number): Promise<Roadmap[]>;
  getRoadmapById(id: number): Promise<Roadmap | undefined>;
  createRoadmap(roadmap: InsertRoadmap): Promise<Roadmap>;
  updateRoadmap(id: number, roadmap: Partial<InsertRoadmap>): Promise<Roadmap | undefined>;
  deleteRoadmap(id: number): Promise<boolean>;

  // Goals methods
  getGoalsByUserId(userId: number): Promise<Goal[]>;
  getGoalById(id: number): Promise<Goal | undefined>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: number, goal: Partial<InsertGoal>): Promise<Goal | undefined>;
  deleteGoal(id: number): Promise<boolean>;

  // Personality test methods
  getPersonalityResultsByUserId(userId: number): Promise<PersonalityResult[]>;
  getPersonalityResultById(id: number): Promise<PersonalityResult | undefined>;
  createPersonalityResult(result: InsertPersonalityResult): Promise<PersonalityResult>;

  // Chat messages methods
  getChatMessagesByUserId(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Resources methods
  getResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getResourceById(id: number): Promise<Resource | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private careerPaths: Map<number, CareerPath>;
  private roadmaps: Map<number, Roadmap>;
  private goals: Map<number, Goal>;
  private personalityResults: Map<number, PersonalityResult>;
  private chatMessages: Map<number, ChatMessage>;
  private resources: Map<number, Resource>;
  
  private currentId: {
    users: number;
    careerPaths: number;
    roadmaps: number;
    goals: number;
    personalityResults: number;
    chatMessages: number;
    resources: number;
  };

  constructor() {
    this.users = new Map();
    this.careerPaths = new Map();
    this.roadmaps = new Map();
    this.goals = new Map();
    this.personalityResults = new Map();
    this.chatMessages = new Map();
    this.resources = new Map();
    
    this.currentId = {
      users: 1,
      careerPaths: 1,
      roadmaps: 1,
      goals: 1,
      personalityResults: 1,
      chatMessages: 1,
      resources: 1
    };

    // Initialize with some sample career paths
    this.initializeCareerPaths();
    this.initializeResources();
  }

  private initializeCareerPaths() {
    const careerPathsData: InsertCareerPath[] = [
      {
        title: "Software Development",
        description: "Build applications and software solutions using various programming languages and technologies.",
        iconColor: "bg-sky-500",
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        salaryRange: "$85,000 - $135,000",
        educationYears: "4-6 years education",
        category: "Technology",
        demandLevel: "High Demand"
      },
      {
        title: "Data Science",
        description: "Analyze and interpret complex data to help organizations make better decisions.",
        iconColor: "bg-orange-500",
        icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
        salaryRange: "$90,000 - $140,000",
        educationYears: "4-6 years education",
        category: "Technology",
        demandLevel: "High Demand"
      },
      {
        title: "UX/UI Design",
        description: "Create meaningful user experiences for websites, apps, and digital products.",
        iconColor: "bg-purple-500",
        icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
        salaryRange: "$70,000 - $110,000",
        educationYears: "2-4 years education",
        category: "Arts & Design",
        demandLevel: "Growing"
      },
      {
        title: "Nursing",
        description: "Provide and coordinate patient care in various healthcare settings.",
        iconColor: "bg-red-500",
        icon: "M4.5 12.75l6 6 9-13.5",
        salaryRange: "$65,000 - $110,000",
        educationYears: "2-4 years education",
        category: "Healthcare",
        demandLevel: "High Demand"
      },
      {
        title: "Financial Analyst",
        description: "Evaluate financial data and make recommendations for business decisions.",
        iconColor: "bg-green-500",
        icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
        salaryRange: "$65,000 - $100,000",
        educationYears: "4 years education",
        category: "Business",
        demandLevel: "Stable"
      },
      {
        title: "Marketing Manager",
        description: "Develop and implement marketing strategies to promote products or services.",
        iconColor: "bg-pink-500",
        icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
        salaryRange: "$70,000 - $120,000",
        educationYears: "4 years education",
        category: "Business",
        demandLevel: "Growing"
      }
    ];

    careerPathsData.forEach(careerPath => {
      this.createCareerPath(careerPath);
    });
  }

  private initializeResources() {
    const resourcesData: InsertResource[] = [
      {
        title: "Online Courses",
        description: "Access free and premium courses from top universities and industry experts.",
        category: "Learning",
        url: "/resources/courses",
        tag: "Learning"
      },
      {
        title: "Interview Prep",
        description: "Practice with common interview questions and expert tips for different career paths.",
        category: "Skills",
        url: "/resources/interview-prep",
        tag: "Skills"
      },
      {
        title: "Scholarship Database",
        description: "Find scholarships, grants, and financial aid opportunities for your education.",
        category: "Financial",
        url: "/resources/scholarships",
        tag: "Financial"
      },
      {
        title: "Career Guides",
        description: "Comprehensive guides for various career paths with expert advice.",
        category: "Guides",
        url: "/resources/guides",
        tag: "Guides"
      },
      {
        title: "Resume Templates",
        description: "Professional resume templates optimized for different industries.",
        category: "Tools",
        url: "/resources/resume-templates",
        tag: "Tools"
      },
      {
        title: "Industry Reports",
        description: "Latest industry trends, forecasts, and analysis for informed career decisions.",
        category: "Research",
        url: "/resources/industry-reports",
        tag: "Research"
      }
    ];

    resourcesData.forEach(resource => {
      this.createResource(resource);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Career paths methods
  async getCareerPaths(): Promise<CareerPath[]> {
    return Array.from(this.careerPaths.values());
  }

  async getCareerPathById(id: number): Promise<CareerPath | undefined> {
    return this.careerPaths.get(id);
  }

  async getCareerPathsByCategory(category: string): Promise<CareerPath[]> {
    return Array.from(this.careerPaths.values()).filter(
      (path) => path.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchCareerPaths(query: string): Promise<CareerPath[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.careerPaths.values()).filter(
      (path) => 
        path.title.toLowerCase().includes(lowerQuery) || 
        path.description.toLowerCase().includes(lowerQuery)
    );
  }

  async createCareerPath(insertCareerPath: InsertCareerPath): Promise<CareerPath> {
    const id = this.currentId.careerPaths++;
    const careerPath: CareerPath = { ...insertCareerPath, id };
    this.careerPaths.set(id, careerPath);
    return careerPath;
  }

  // Roadmap methods
  async getRoadmapsByUserId(userId: number): Promise<Roadmap[]> {
    return Array.from(this.roadmaps.values()).filter(
      (roadmap) => roadmap.userId === userId
    );
  }

  async getRoadmapById(id: number): Promise<Roadmap | undefined> {
    return this.roadmaps.get(id);
  }

  async createRoadmap(insertRoadmap: InsertRoadmap): Promise<Roadmap> {
    const id = this.currentId.roadmaps++;
    const roadmap: Roadmap = {
      ...insertRoadmap,
      id,
      createdAt: new Date()
    };
    this.roadmaps.set(id, roadmap);
    return roadmap;
  }

  async updateRoadmap(id: number, updatedRoadmap: Partial<InsertRoadmap>): Promise<Roadmap | undefined> {
    const roadmap = this.roadmaps.get(id);
    if (!roadmap) return undefined;

    const updated: Roadmap = { ...roadmap, ...updatedRoadmap };
    this.roadmaps.set(id, updated);
    return updated;
  }

  async deleteRoadmap(id: number): Promise<boolean> {
    return this.roadmaps.delete(id);
  }

  // Goals methods
  async getGoalsByUserId(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(
      (goal) => goal.userId === userId
    );
  }

  async getGoalById(id: number): Promise<Goal | undefined> {
    return this.goals.get(id);
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = this.currentId.goals++;
    const goal: Goal = { ...insertGoal, id };
    this.goals.set(id, goal);
    return goal;
  }

  async updateGoal(id: number, updatedGoal: Partial<InsertGoal>): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;

    const updated: Goal = { ...goal, ...updatedGoal };
    this.goals.set(id, updated);
    return updated;
  }

  async deleteGoal(id: number): Promise<boolean> {
    return this.goals.delete(id);
  }

  // Personality test methods
  async getPersonalityResultsByUserId(userId: number): Promise<PersonalityResult[]> {
    return Array.from(this.personalityResults.values()).filter(
      (result) => result.userId === userId
    );
  }

  async getPersonalityResultById(id: number): Promise<PersonalityResult | undefined> {
    return this.personalityResults.get(id);
  }

  async createPersonalityResult(insertResult: InsertPersonalityResult): Promise<PersonalityResult> {
    const id = this.currentId.personalityResults++;
    const result: PersonalityResult = {
      ...insertResult,
      id,
      takenAt: new Date()
    };
    this.personalityResults.set(id, result);
    return result;
  }

  // Chat messages methods
  async getChatMessagesByUserId(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((message) => message.userId === userId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentId.chatMessages++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  // Resources methods
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      (resource) => resource.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getResourceById(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentId.resources++;
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }
}

import { db } from "./db";
import { eq, like, or } from "drizzle-orm";
import { 
  users, careerPaths, roadmaps, goals, personalityResults, chatMessages, resources,
  type User, type InsertUser,
  type CareerPath, type InsertCareerPath,
  type Roadmap, type InsertRoadmap,
  type Goal, type InsertGoal,
  type PersonalityResult, type InsertPersonalityResult,
  type ChatMessage, type InsertChatMessage,
  type Resource, type InsertResource
} from "@shared/schema";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getCareerPaths(): Promise<CareerPath[]> {
    return await db.select().from(careerPaths);
  }

  async getCareerPathById(id: number): Promise<CareerPath | undefined> {
    const [careerPath] = await db.select().from(careerPaths).where(eq(careerPaths.id, id));
    return careerPath;
  }

  async getCareerPathsByCategory(category: string): Promise<CareerPath[]> {
    return await db.select().from(careerPaths).where(eq(careerPaths.category, category));
  }

  async searchCareerPaths(query: string): Promise<CareerPath[]> {
    const searchTerm = `%${query}%`;
    return await db.select()
      .from(careerPaths)
      .where(
        or(
          like(careerPaths.title, searchTerm),
          like(careerPaths.description, searchTerm)
        )
      );
  }

  async createCareerPath(insertCareerPath: InsertCareerPath): Promise<CareerPath> {
    const [careerPath] = await db.insert(careerPaths).values(insertCareerPath).returning();
    return careerPath;
  }

  async getRoadmapsByUserId(userId: number): Promise<Roadmap[]> {
    return await db.select().from(roadmaps).where(eq(roadmaps.userId, userId));
  }

  async getRoadmapById(id: number): Promise<Roadmap | undefined> {
    const [roadmap] = await db.select().from(roadmaps).where(eq(roadmaps.id, id));
    return roadmap;
  }

  async createRoadmap(insertRoadmap: InsertRoadmap): Promise<Roadmap> {
    const [roadmap] = await db.insert(roadmaps).values(insertRoadmap).returning();
    return roadmap;
  }

  async updateRoadmap(id: number, roadmapData: Partial<InsertRoadmap>): Promise<Roadmap | undefined> {
    const [roadmap] = await db
      .update(roadmaps)
      .set(roadmapData)
      .where(eq(roadmaps.id, id))
      .returning();
    return roadmap;
  }

  async deleteRoadmap(id: number): Promise<boolean> {
    const result = await db.delete(roadmaps).where(eq(roadmaps.id, id));
    return result.count > 0;
  }

  async getGoalsByUserId(userId: number): Promise<Goal[]> {
    return await db.select().from(goals).where(eq(goals.userId, userId));
  }

  async getGoalById(id: number): Promise<Goal | undefined> {
    const [goal] = await db.select().from(goals).where(eq(goals.id, id));
    return goal;
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const [goal] = await db.insert(goals).values(insertGoal).returning();
    return goal;
  }

  async updateGoal(id: number, goalData: Partial<InsertGoal>): Promise<Goal | undefined> {
    const [goal] = await db
      .update(goals)
      .set(goalData)
      .where(eq(goals.id, id))
      .returning();
    return goal;
  }

  async deleteGoal(id: number): Promise<boolean> {
    const result = await db.delete(goals).where(eq(goals.id, id));
    return result.count > 0;
  }

  async getPersonalityResultsByUserId(userId: number): Promise<PersonalityResult[]> {
    return await db.select().from(personalityResults).where(eq(personalityResults.userId, userId));
  }

  async getPersonalityResultById(id: number): Promise<PersonalityResult | undefined> {
    const [result] = await db.select().from(personalityResults).where(eq(personalityResults.id, id));
    return result;
  }

  async createPersonalityResult(insertResult: InsertPersonalityResult): Promise<PersonalityResult> {
    const [result] = await db.insert(personalityResults).values(insertResult).returning();
    return result;
  }

  async getChatMessagesByUserId(userId: number): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages).where(eq(chatMessages.userId, userId));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  async getResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.category, category));
  }

  async getResourceById(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db.insert(resources).values(insertResource).returning();
    return resource;
  }
}

// Use Database storage implementation
export const storage = new DatabaseStorage();

// Initialize with career data
async function initializeDatabase() {
  try {
    // Check if we already have career paths
    const existingCareers = await storage.getCareerPaths();
    
    if (existingCareers.length === 0) {
      console.log("Initializing database with career data...");
      await addCareers();
      await addResources();
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

async function addCareers() {
  const careerPathsData: InsertCareerPath[] = [
    // Original careers
    {
      title: "Software Development",
      description: "Build applications and software solutions using various programming languages and technologies.",
      iconColor: "bg-sky-500",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      salaryRange: "$85,000 - $135,000",
      educationYears: "4-6 years education",
      category: "Technology",
      demandLevel: "High Demand"
    },
    {
      title: "Data Science",
      description: "Analyze and interpret complex data to help organizations make better decisions.",
      iconColor: "bg-orange-500",
      icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
      salaryRange: "$90,000 - $140,000",
      educationYears: "4-6 years education",
      category: "Technology",
      demandLevel: "High Demand"
    },
    {
      title: "UX/UI Design",
      description: "Create meaningful user experiences for websites, apps, and digital products.",
      iconColor: "bg-purple-500",
      icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
      salaryRange: "$70,000 - $110,000",
      educationYears: "2-4 years education",
      category: "Arts & Design",
      demandLevel: "Growing"
    },
    {
      title: "Nursing",
      description: "Provide and coordinate patient care in various healthcare settings.",
      iconColor: "bg-red-500",
      icon: "M4.5 12.75l6 6 9-13.5",
      salaryRange: "$65,000 - $110,000",
      educationYears: "2-4 years education",
      category: "Healthcare",
      demandLevel: "High Demand"
    },
    {
      title: "Financial Analyst",
      description: "Evaluate financial data and make recommendations for business decisions.",
      iconColor: "bg-green-500",
      icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
      salaryRange: "$65,000 - $100,000",
      educationYears: "4 years education",
      category: "Business",
      demandLevel: "Stable"
    },
    {
      title: "Marketing Manager",
      description: "Develop and implement marketing strategies to promote products or services.",
      iconColor: "bg-pink-500",
      icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
      salaryRange: "$70,000 - $120,000",
      educationYears: "4 years education",
      category: "Business",
      demandLevel: "Growing"
    },
    
    // Technology Careers
    {
      title: "AI Research Scientist",
      description: "Develop new algorithms and models to advance artificial intelligence capabilities.",
      iconColor: "bg-blue-500",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      salaryRange: "$110,000 - $180,000",
      educationYears: "PhD or advanced degree",
      category: "Technology",
      demandLevel: "High Demand"
    },
    {
      title: "Cybersecurity Analyst",
      description: "Protect systems, networks, and data from cyber threats and security breaches.",
      iconColor: "bg-indigo-500",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      salaryRange: "$85,000 - $140,000",
      educationYears: "4+ years education",
      category: "Technology",
      demandLevel: "High Demand"
    },
    {
      title: "Cloud Solutions Architect",
      description: "Design and implement cloud infrastructure solutions for organizations.",
      iconColor: "bg-sky-500",
      icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
      salaryRange: "$115,000 - $160,000",
      educationYears: "5+ years experience",
      category: "Technology",
      demandLevel: "High Demand"
    },
    {
      title: "DevOps Engineer",
      description: "Bridge development and operations to improve collaboration and productivity.",
      iconColor: "bg-cyan-500",
      icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
      salaryRange: "$95,000 - $145,000",
      educationYears: "4+ years education",
      category: "Technology",
      demandLevel: "High Demand"
    },
    {
      title: "Blockchain Developer",
      description: "Build decentralized applications and solutions using blockchain technology.",
      iconColor: "bg-emerald-500",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      salaryRange: "$90,000 - $155,000",
      educationYears: "3-5 years education",
      category: "Technology",
      demandLevel: "Growing"
    },
    
    // Healthcare Careers
    {
      title: "Physician",
      description: "Diagnose and treat illnesses, injuries, and other medical conditions.",
      iconColor: "bg-red-500",
      icon: "M18 6h.01M6 6h.01M3 12l18-6M3 6v10l10 6L21 16V6L11 0 3 6z",
      salaryRange: "$200,000 - $400,000",
      educationYears: "8+ years education",
      category: "Healthcare",
      demandLevel: "High Demand"
    },
    {
      title: "Physical Therapist",
      description: "Help patients recover mobility and manage pain following injuries or surgeries.",
      iconColor: "bg-orange-500",
      icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L6 20m5 2h4m-4-5h4m5-16l1 1-9 9-4-4 1-1c1-1 2.343-.95 3-1 .657-.05 1.35-.166 3 1z",
      salaryRange: "$70,000 - $110,000",
      educationYears: "6-7 years education",
      category: "Healthcare",
      demandLevel: "Growing"
    },
    {
      title: "Nurse Practitioner",
      description: "Provide advanced nursing care, often serving as a primary care provider.",
      iconColor: "bg-rose-500",
      icon: "M4.5 12.75l6 6 9-13.5",
      salaryRange: "$90,000 - $130,000",
      educationYears: "6+ years education",
      category: "Healthcare",
      demandLevel: "High Demand"
    },
    {
      title: "Medical Laboratory Scientist",
      description: "Perform laboratory tests to diagnose diseases and monitor treatment efficacy.",
      iconColor: "bg-amber-500",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      salaryRange: "$60,000 - $90,000",
      educationYears: "4-5 years education",
      category: "Healthcare",
      demandLevel: "Stable"
    },
    {
      title: "Healthcare Administrator",
      description: "Manage healthcare facilities, services, staff, and budgets.",
      iconColor: "bg-green-500",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      salaryRange: "$75,000 - $120,000",
      educationYears: "4-6 years education",
      category: "Healthcare",
      demandLevel: "Growing"
    },
    
    // Business Careers
    {
      title: "Management Consultant",
      description: "Advise businesses on improving performance, operations, and strategy.",
      iconColor: "bg-blue-500",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      salaryRange: "$85,000 - $160,000",
      educationYears: "4-6 years education",
      category: "Business",
      demandLevel: "Growing"
    },
    {
      title: "Investment Banker",
      description: "Help companies and governments raise capital and provide financial advice.",
      iconColor: "bg-emerald-500",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      salaryRange: "$100,000 - $200,000+",
      educationYears: "4-6 years education",
      category: "Business",
      demandLevel: "Stable"
    },
    {
      title: "Human Resources Manager",
      description: "Oversee recruitment, employee relations, benefits, and organizational development.",
      iconColor: "bg-pink-500",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      salaryRange: "$70,000 - $120,000",
      educationYears: "4-5 years education",
      category: "Business",
      demandLevel: "Stable"
    },
    {
      title: "Supply Chain Manager",
      description: "Coordinate and optimize the flow of products, services, and information.",
      iconColor: "bg-amber-500",
      icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
      salaryRange: "$80,000 - $130,000",
      educationYears: "4-5 years education",
      category: "Business",
      demandLevel: "Growing"
    },
    {
      title: "Business Analyst",
      description: "Evaluate business processes and recommend improvements using data analysis.",
      iconColor: "bg-indigo-500",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      salaryRange: "$70,000 - $110,000",
      educationYears: "4 years education",
      category: "Business",
      demandLevel: "Stable"
    },
    
    // Arts & Design Careers
    {
      title: "Graphic Designer",
      description: "Create visual concepts to communicate ideas through images and layouts.",
      iconColor: "bg-purple-500",
      icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
      salaryRange: "$45,000 - $85,000",
      educationYears: "2-4 years education",
      category: "Arts & Design",
      demandLevel: "Stable"
    },
    {
      title: "Interior Designer",
      description: "Plan and design indoor spaces to be functional, safe, and aesthetically pleasing.",
      iconColor: "bg-rose-500",
      icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
      salaryRange: "$50,000 - $90,000",
      educationYears: "2-4 years education",
      category: "Arts & Design",
      demandLevel: "Stable"
    },
    {
      title: "Fashion Designer",
      description: "Create clothing, accessories, and footwear designs.",
      iconColor: "bg-fuchsia-500",
      icon: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13",
      salaryRange: "$40,000 - $100,000+",
      educationYears: "2-4 years education",
      category: "Arts & Design",
      demandLevel: "Competitive"
    },
    {
      title: "Architect",
      description: "Design buildings and structures, considering aesthetics, function, and safety.",
      iconColor: "bg-sky-500",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      salaryRange: "$70,000 - $120,000",
      educationYears: "5+ years education",
      category: "Arts & Design",
      demandLevel: "Stable"
    },
    {
      title: "Video Game Designer",
      description: "Create concepts, characters, narratives, and gameplay mechanics for video games.",
      iconColor: "bg-violet-500",
      icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
      salaryRange: "$60,000 - $120,000",
      educationYears: "3-4 years education",
      category: "Arts & Design",
      demandLevel: "Growing"
    },
    
    // Engineering Careers
    {
      title: "Civil Engineer",
      description: "Design, build, and maintain infrastructure projects and systems.",
      iconColor: "bg-amber-500",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      salaryRange: "$70,000 - $115,000",
      educationYears: "4+ years education",
      category: "Engineering",
      demandLevel: "Stable"
    },
    {
      title: "Mechanical Engineer",
      description: "Design, develop, and test mechanical devices and systems.",
      iconColor: "bg-blue-500",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      salaryRange: "$75,000 - $120,000",
      educationYears: "4+ years education",
      category: "Engineering",
      demandLevel: "Stable"
    },
    {
      title: "Electrical Engineer",
      description: "Design and develop electrical systems, equipment, and components.",
      iconColor: "bg-amber-500",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      salaryRange: "$75,000 - $125,000",
      educationYears: "4+ years education",
      category: "Engineering",
      demandLevel: "Growing"
    },
    {
      title: "Chemical Engineer",
      description: "Apply chemistry, physics, and mathematics to solve problems involving chemicals and processes.",
      iconColor: "bg-emerald-500",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      salaryRange: "$80,000 - $130,000",
      educationYears: "4+ years education",
      category: "Engineering",
      demandLevel: "Stable"
    },
    {
      title: "Aerospace Engineer",
      description: "Design aircraft, spacecraft, satellites, and missiles.",
      iconColor: "bg-sky-500",
      icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
      salaryRange: "$85,000 - $135,000",
      educationYears: "4+ years education",
      category: "Engineering",
      demandLevel: "Stable"
    },
    
    // Education Careers
    {
      title: "Elementary School Teacher",
      description: "Instruct young students in basic subjects to provide a foundation for learning.",
      iconColor: "bg-emerald-500",
      icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
      salaryRange: "$45,000 - $70,000",
      educationYears: "4+ years education",
      category: "Education",
      demandLevel: "Stable"
    },
    {
      title: "High School Teacher",
      description: "Teach students in a specific subject area in grades 9-12.",
      iconColor: "bg-blue-500",
      icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
      salaryRange: "$50,000 - $75,000",
      educationYears: "4+ years education",
      category: "Education",
      demandLevel: "Stable"
    },
    {
      title: "Professor",
      description: "Teach students and conduct research at colleges and universities.",
      iconColor: "bg-purple-500",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      salaryRange: "$60,000 - $120,000+",
      educationYears: "PhD required",
      category: "Education",
      demandLevel: "Competitive"
    },
    {
      title: "Educational Administrator",
      description: "Oversee the operations of schools, colleges, or educational programs.",
      iconColor: "bg-indigo-500",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      salaryRange: "$70,000 - $130,000",
      educationYears: "Masters or higher",
      category: "Education",
      demandLevel: "Stable"
    },
    {
      title: "Special Education Teacher",
      description: "Work with students who have a variety of disabilities.",
      iconColor: "bg-rose-500",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      salaryRange: "$50,000 - $75,000",
      educationYears: "4+ years education",
      category: "Education",
      demandLevel: "High Demand"
    },
    
    // Additional categories and careers...
    {
      title: "Environmental Scientist",
      description: "Study environmental problems and develop solutions to protect the environment.",
      iconColor: "bg-green-500",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      salaryRange: "$60,000 - $100,000",
      educationYears: "4+ years education",
      category: "Science",
      demandLevel: "Growing"
    },
    {
      title: "Veterinarian",
      description: "Diagnose and treat diseases and injuries in animals.",
      iconColor: "bg-amber-500",
      icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L6 20m5 2h4m-4-5h4m5-16l1 1-9 9-4-4 1-1c1-1 2.343-.95 3-1 .657-.05 1.35-.166 3 1z",
      salaryRange: "$70,000 - $120,000",
      educationYears: "8+ years education",
      category: "Science",
      demandLevel: "Stable"
    },
    {
      title: "Social Worker",
      description: "Help people solve and cope with problems in their everyday lives.",
      iconColor: "bg-pink-500",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      salaryRange: "$50,000 - $80,000",
      educationYears: "4-6 years education",
      category: "Social Services",
      demandLevel: "High Demand"
    },
    {
      title: "Police Officer",
      description: "Protect lives and property through enforcement of laws and regulations.",
      iconColor: "bg-blue-500",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      salaryRange: "$50,000 - $90,000",
      educationYears: "2-4 years education",
      category: "Law Enforcement",
      demandLevel: "Stable"
    },
    {
      title: "Lawyer",
      description: "Advise and represent individuals, businesses, or government agencies on legal issues.",
      iconColor: "bg-indigo-500",
      icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
      salaryRange: "$80,000 - $180,000+",
      educationYears: "7+ years education",
      category: "Legal",
      demandLevel: "Competitive"
    },
    {
      title: "Chef",
      description: "Prepare, season, and cook food in restaurants and other establishments.",
      iconColor: "bg-amber-500",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      salaryRange: "$40,000 - $90,000",
      educationYears: "2-4 years education",
      category: "Culinary Arts",
      demandLevel: "Stable"
    },
    {
      title: "Pilot",
      description: "Fly and navigate aircraft for airlines, businesses, or the military.",
      iconColor: "bg-sky-500",
      icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
      salaryRange: "$80,000 - $200,000+",
      educationYears: "2-4 years education",
      category: "Transportation",
      demandLevel: "Growing"
    },
    {
      title: "Electrician",
      description: "Install, maintain, and repair electrical systems in homes and businesses.",
      iconColor: "bg-yellow-500",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      salaryRange: "$45,000 - $90,000",
      educationYears: "Apprenticeship",
      category: "Trades",
      demandLevel: "High Demand"
    }
  ];

  for (const career of careerPathsData) {
    await storage.createCareerPath(career);
  }
}

async function addResources() {
  const resourcesData: InsertResource[] = [
    {
      title: "Online Courses",
      description: "Access free and premium courses from top universities and industry experts.",
      category: "Learning",
      url: "/resources/courses",
      tag: "Learning"
    },
    {
      title: "Interview Prep",
      description: "Practice with common interview questions and expert tips for different career paths.",
      category: "Skills",
      url: "/resources/interview-prep",
      tag: "Skills"
    },
    {
      title: "Scholarship Database",
      description: "Find scholarships, grants, and financial aid opportunities for your education.",
      category: "Financial",
      url: "/resources/scholarships",
      tag: "Financial"
    },
    {
      title: "Career Guides",
      description: "Comprehensive guides for various career paths with expert advice.",
      category: "Guides",
      url: "/resources/guides",
      tag: "Guides"
    },
    {
      title: "Resume Templates",
      description: "Professional resume templates optimized for different industries.",
      category: "Tools",
      url: "/resources/resume-templates",
      tag: "Tools"
    },
    {
      title: "Industry Reports",
      description: "Latest industry trends, forecasts, and analysis for informed career decisions.",
      category: "Research",
      url: "/resources/industry-reports",
      tag: "Research"
    }
  ];

  for (const resource of resourcesData) {
    await storage.createResource(resource);
  }
}

// Initialize the database
initializeDatabase();
