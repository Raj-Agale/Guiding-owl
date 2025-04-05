import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Career paths schema
export const careerPaths = pgTable("career_paths", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconColor: text("icon_color").notNull(),
  icon: text("icon").notNull(),
  salaryRange: text("salary_range").notNull(),
  educationYears: text("education_years").notNull(),
  category: text("category").notNull(),
  demandLevel: text("demand_level").notNull(),
});

export const insertCareerPathSchema = createInsertSchema(careerPaths).omit({
  id: true,
});

export type InsertCareerPath = z.infer<typeof insertCareerPathSchema>;
export type CareerPath = typeof careerPaths.$inferSelect;

// User roadmaps schema
export const roadmaps = pgTable("roadmaps", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  careerPathId: integer("career_path_id").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  milestones: jsonb("milestones").notNull(),
  skills: jsonb("skills").notNull(),
  timeline: jsonb("timeline").notNull(),
  pricing: jsonb("pricing").notNull(),
});

export const insertRoadmapSchema = createInsertSchema(roadmaps).omit({
  id: true,
  createdAt: true,
});

export type InsertRoadmap = z.infer<typeof insertRoadmapSchema>;
export type Roadmap = typeof roadmaps.$inferSelect;

// User goals schema
export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  deadline: timestamp("deadline"),
  completed: boolean("completed").default(false).notNull(),
  category: text("category").notNull(),
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
});

export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;

// Personality test results schema
export const personalityResults = pgTable("personality_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  takenAt: timestamp("taken_at").defaultNow().notNull(),
  personalityType: text("personality_type").notNull(),
  strengths: jsonb("strengths").notNull(),
  weaknesses: jsonb("weaknesses").notNull(),
  recommendedCareers: jsonb("recommended_careers").notNull(),
});

export const insertPersonalityResultSchema = createInsertSchema(personalityResults).omit({
  id: true,
  takenAt: true,
});

export type InsertPersonalityResult = z.infer<typeof insertPersonalityResultSchema>;
export type PersonalityResult = typeof personalityResults.$inferSelect;

// Chat messages schema
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true, 
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Resource schema
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  url: text("url").notNull(),
  tag: text("tag").notNull(),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;
