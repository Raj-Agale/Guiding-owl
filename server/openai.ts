import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-development" });

// Career Counselor AI function
export async function getCareerAdvice(question: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable career counselor providing guidance to students. Give helpful, accurate, and concise advice about education paths, career options, skill requirements, and job market information. Keep responses friendly, informative, and under 250 words unless more detail is required."
        },
        {
          role: "user",
          content: question
        }
      ],
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response at the moment. Please try again later.";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a few moments.";
  }
}

// Options interface for roadmap generation
interface RoadmapOptions {
  education?: string;
  experience?: string;
  timeframe?: "short" | "medium" | "long";
  budget?: "low" | "medium" | "high";
  includeCertifications?: boolean;
  includeOnlineCourses?: boolean;
  includeMentorship?: boolean;
  includeNetworking?: boolean;
  detailLevel?: number;
}

// Generate custom roadmap based on career goals
export async function generateRoadmap(
  career: string, 
  currentSkills: string[], 
  goals: string,
  options?: RoadmapOptions
): Promise<{
  milestones: Array<{ title: string, description: string }>,
  skills: Array<{ name: string, importance: number }>,
  timeline: Array<{ phase: string, duration: string, activities: string[] }>,
  pricing: Array<{ item: string, estimatedCost: string, notes: string }>,
  error?: string
}> {
  try {
    // Parse timeframe to human-readable string
    let timeframeStr = "medium-term (3-5 years)";
    if (options?.timeframe === "short") {
      timeframeStr = "short-term (1-2 years)";
    } else if (options?.timeframe === "long") {
      timeframeStr = "long-term (5+ years)";
    }

    // Parse budget level to human-readable string
    let budgetStr = "moderate budget";
    if (options?.budget === "low") {
      budgetStr = "minimal budget";
    } else if (options?.budget === "high") {
      budgetStr = "significant budget";
    }

    // Build a detailed prompt using all the options
    let prompt = `Create a detailed career roadmap for someone pursuing a career in ${career}.\n`;
    prompt += `Their current skills are: ${currentSkills.join(", ")}.\n`;
    prompt += `Their career goals are: ${goals}.\n`;

    // Add educational background if provided
    if (options?.education && options.education.trim() !== "") {
      prompt += `Their educational background: ${options.education}.\n`;
    }

    // Add work experience if provided
    if (options?.experience && options.experience.trim() !== "") {
      prompt += `Their current experience: ${options.experience}.\n`;
    }

    // Add timeframe and budget preferences
    prompt += `They are looking for a ${timeframeStr} roadmap with a ${budgetStr}.\n`;

    // Add specific inclusion preferences
    const inclusions = [];
    if (options?.includeCertifications) inclusions.push("professional certifications");
    if (options?.includeOnlineCourses) inclusions.push("online courses");
    if (options?.includeMentorship) inclusions.push("mentorship opportunities");
    if (options?.includeNetworking) inclusions.push("networking events/strategies");
    
    if (inclusions.length > 0) {
      prompt += `Please specifically include information about: ${inclusions.join(", ")}.\n`;
    }

    // Set the detail level
    const detailLevel = options?.detailLevel || 3;
    const detailDescriptions = {
      1: "brief and concise",
      2: "somewhat detailed",
      3: "moderately detailed",
      4: "comprehensive",
      5: "extremely detailed and thorough"
    };
    prompt += `Provide a ${detailDescriptions[detailLevel as 1|2|3|4|5]} roadmap.\n`;
    
    // Format expectations
    if (detailLevel >= 4) {
      prompt += `
        Format your response as JSON with the following structure:
        {
          "milestones": [{"title": "Milestone name", "description": "Detailed description"}],
          "skills": [{"name": "Skill name", "importance": 1-5 number rating}],
          "timeline": [{"phase": "Phase name", "duration": "Duration (e.g., '3-6 months')", "activities": ["activity 1", "activity 2"]}],
          "pricing": [{"item": "Item name", "estimatedCost": "Cost range", "notes": "Additional notes"}]
        }
        
        Provide 5-7 milestones, 6-10 skills, 4-5 timeline phases, and 4-6 pricing items.`;
    } else {
      prompt += `
        Format your response as JSON with the following structure:
        {
          "milestones": [{"title": "Milestone name", "description": "Detailed description"}],
          "skills": [{"name": "Skill name", "importance": 1-5 number rating}],
          "timeline": [{"phase": "Phase name", "duration": "Duration (e.g., '3-6 months')", "activities": ["activity 1", "activity 2"]}],
          "pricing": [{"item": "Item name", "estimatedCost": "Cost range", "notes": "Additional notes"}]
        }
        
        Provide 4-6 milestones, 5-8 skills, 3-4 timeline phases, and 3-5 pricing items.`;
    }

    console.log("Generating roadmap with options:", { career, currentSkills, goals, options });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a specialized career roadmap generator that creates detailed, personalized career development plans based on individual goals, skills, and preferences."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const roadmapContent = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      milestones: roadmapContent.milestones || [],
      skills: roadmapContent.skills || [],
      timeline: roadmapContent.timeline || [],
      pricing: roadmapContent.pricing || []
    };
  } catch (error: any) {
    console.error("Error generating roadmap:", error);
    
    // Handle rate limit errors
    if (error?.message?.includes("rate limit") || error?.message?.includes("quota") || error?.status === 429) {
      return {
        error: "OpenAI API rate limit exceeded. Please try again later.",
        milestones: [{ title: "Error", description: "OpenAI API rate limit exceeded. Please try again later." }],
        skills: [],
        timeline: [],
        pricing: []
      };
    }
    
    return {
      error: error?.message || "Failed to generate roadmap. Please try again.",
      milestones: [{ title: "Error", description: "Failed to generate roadmap. Please try again." }],
      skills: [],
      timeline: [],
      pricing: []
    };
  }
}

// Analyze personality test results and recommend careers
export async function analyzePersonalityTest(answers: Record<string, number>): Promise<{
  personalityType: string,
  strengths: string[],
  weaknesses: string[],
  recommendedCareers: Array<{ name: string, description: string, fit: number }>
}> {
  try {
    const prompt = `Analyze these personality test answers and recommend careers:
    ${JSON.stringify(answers)}
    
    Format your response as JSON with the following structure:
    {
      "personalityType": "Personality type name and brief description",
      "strengths": ["strength 1", "strength 2", "strength 3", "strength 4", "strength 5"],
      "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
      "recommendedCareers": [{"name": "Career name", "description": "Brief description", "fit": 1-5 rating}]
    }
    
    Provide a meaningful personality type, 5 strengths, 3 weaknesses, and 4-6 recommended careers.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a specialized career assessment analyzer that evaluates personality test answers and provides career recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysisContent = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      personalityType: analysisContent.personalityType || "Could not determine personality type",
      strengths: analysisContent.strengths || [],
      weaknesses: analysisContent.weaknesses || [],
      recommendedCareers: analysisContent.recommendedCareers || []
    };
  } catch (error) {
    console.error("Error analyzing personality test:", error);
    return {
      personalityType: "Analysis Error",
      strengths: ["Could not analyze strengths"],
      weaknesses: ["Could not analyze weaknesses"],
      recommendedCareers: [{ name: "Error", description: "Failed to analyze test results. Please try again.", fit: 0 }]
    };
  }
}
