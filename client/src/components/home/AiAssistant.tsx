import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Lightbulb } from "lucide-react";
import { getCareerAdvice } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: "user" | "assistant";
  content: string;
}

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "Hello! I'm your AI Career Assistant. How can I help you with your career planning today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: "user", content: userMessage }]);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await getCareerAdvice(userMessage);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { type: "assistant", content: response.response }]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      
      // Add error message to chat
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            AI Career Assistant
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Get instant answers to all your career-related questions from our smart AI assistant.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            {/* Chat messages */}
            <div 
              ref={chatContainerRef}
              className="space-y-4 mb-6 h-80 overflow-y-auto scrollbar-hide"
            >
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start ${message.type === "user" ? "justify-end" : ""}`}>
                  {message.type === "assistant" && (
                    <div className="flex-shrink-0 bg-primary-100 rounded-full p-2 mr-3">
                      <Lightbulb className="h-6 w-6 text-primary-600" />
                    </div>
                  )}
                  <div 
                    className={`rounded-lg py-3 px-4 max-w-3xl ${
                      message.type === "user" 
                        ? "bg-primary-600 text-white" 
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.content.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-full p-2 mr-3">
                    <Lightbulb className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg py-3 px-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Ask about career paths, skills, education options..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="w-full py-3 px-4 pr-12"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="absolute right-1.5 top-1.5 p-2 text-primary-600 hover:text-primary-700 bg-transparent hover:bg-gray-100"
                variant="ghost"
                size="icon"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAssistant;
