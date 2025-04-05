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

export const storage = new MemStorage();
