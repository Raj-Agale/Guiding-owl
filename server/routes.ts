import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertRoadmapSchema, 
  insertGoalSchema, 
  insertPersonalityResultSchema, 
  insertChatMessageSchema 
} from "@shared/schema";
import { getCareerAdvice, generateRoadmap, analyzePersonalityTest } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Career paths routes
  app.get("/api/career-paths", async (req, res) => {
    try {
      const careerPaths = await storage.getCareerPaths();
      res.json(careerPaths);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch career paths" });
    }
  });

  app.get("/api/career-paths/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.json(await storage.getCareerPaths());
      }
      const results = await storage.searchCareerPaths(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search career paths" });
    }
  });

  app.get("/api/career-paths/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const careerPaths = await storage.getCareerPathsByCategory(category);
      res.json(careerPaths);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch career paths by category" });
    }
  });

  app.get("/api/career-paths/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const careerPath = await storage.getCareerPathById(id);
      if (!careerPath) {
        return res.status(404).json({ message: "Career path not found" });
      }
      
      res.json(careerPath);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch career path" });
    }
  });

  // Roadmap routes
  app.post("/api/roadmaps", async (req, res) => {
    try {
      const validationResult = insertRoadmapSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid roadmap data", errors: validationResult.error.errors });
      }
      
      const roadmap = await storage.createRoadmap(validationResult.data);
      res.status(201).json(roadmap);
    } catch (error) {
      res.status(500).json({ message: "Failed to create roadmap" });
    }
  });

  app.get("/api/roadmaps/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const roadmaps = await storage.getRoadmapsByUserId(userId);
      res.json(roadmaps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch roadmaps" });
    }
  });

  app.get("/api/roadmaps/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const roadmap = await storage.getRoadmapById(id);
      if (!roadmap) {
        return res.status(404).json({ message: "Roadmap not found" });
      }
      
      res.json(roadmap);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch roadmap" });
    }
  });

  app.put("/api/roadmaps/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const validationResult = insertRoadmapSchema.partial().safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid roadmap data", errors: validationResult.error.errors });
      }
      
      const roadmap = await storage.updateRoadmap(id, validationResult.data);
      if (!roadmap) {
        return res.status(404).json({ message: "Roadmap not found" });
      }
      
      res.json(roadmap);
    } catch (error) {
      res.status(500).json({ message: "Failed to update roadmap" });
    }
  });

  app.delete("/api/roadmaps/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const success = await storage.deleteRoadmap(id);
      if (!success) {
        return res.status(404).json({ message: "Roadmap not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete roadmap" });
    }
  });

  // Goals routes
  app.post("/api/goals", async (req, res) => {
    try {
      const validationResult = insertGoalSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid goal data", errors: validationResult.error.errors });
      }
      
      const goal = await storage.createGoal(validationResult.data);
      res.status(201).json(goal);
    } catch (error) {
      res.status(500).json({ message: "Failed to create goal" });
    }
  });

  app.get("/api/goals/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const goals = await storage.getGoalsByUserId(userId);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch goals" });
    }
  });

  app.get("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const goal = await storage.getGoalById(id);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch goal" });
    }
  });

  app.put("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const validationResult = insertGoalSchema.partial().safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid goal data", errors: validationResult.error.errors });
      }
      
      const goal = await storage.updateGoal(id, validationResult.data);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: "Failed to update goal" });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const success = await storage.deleteGoal(id);
      if (!success) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete goal" });
    }
  });

  // Personality test routes
  app.post("/api/personality-test", async (req, res) => {
    try {
      const schema = z.object({
        answers: z.record(z.string(), z.number())
      });
      
      const validationResult = schema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid test data", errors: validationResult.error.errors });
      }
      
      const result = await analyzePersonalityTest(validationResult.data.answers);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to process personality test" });
    }
  });

  app.post("/api/personality-results", async (req, res) => {
    try {
      const validationResult = insertPersonalityResultSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid result data", errors: validationResult.error.errors });
      }
      
      const result = await storage.createPersonalityResult(validationResult.data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to save personality result" });
    }
  });

  app.get("/api/personality-results/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const results = await storage.getPersonalityResultsByUserId(userId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch personality results" });
    }
  });

  // Chat routes
  app.post("/api/chat", async (req, res) => {
    try {
      const schema = z.object({ 
        userId: z.number(), 
        message: z.string().min(1) 
      });
      
      const validationResult = schema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid message data", errors: validationResult.error.errors });
      }
      
      const { userId, message } = validationResult.data;
      
      // Get AI response
      const response = await getCareerAdvice(message);
      
      // Save message to storage
      const chatMessage = await storage.createChatMessage({
        userId,
        message,
        response
      });
      
      res.json({ message: chatMessage.message, response: chatMessage.response });
    } catch (error) {
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  app.get("/api/chat/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const messages = await storage.getChatMessagesByUserId(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  // Roadmap generator
  app.post("/api/generate-roadmap", async (req, res) => {
    try {
      const schema = z.object({
        career: z.string(),
        currentSkills: z.array(z.string()),
        goals: z.string()
      });
      
      const validationResult = schema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid roadmap generation data", errors: validationResult.error.errors });
      }
      
      const { career, currentSkills, goals } = validationResult.data;
      const roadmap = await generateRoadmap(career, currentSkills, goals);
      
      res.json(roadmap);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate roadmap" });
    }
  });

  // Resources routes
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const resources = await storage.getResourcesByCategory(category);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources by category" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const resource = await storage.getResourceById(id);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
