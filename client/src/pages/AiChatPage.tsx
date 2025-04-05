import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Lightbulb, MessageSquare } from "lucide-react";
import { getCareerAdvice } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChatMessagesByUserId } from "@/lib/data";

interface Message {
  type: "user" | "assistant";
  content: string;
}

const AiChatPage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // For a real application, we would get the userId from authentication
  const userId = 1;

  const { data: chatHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: [`/api/chat/user/${userId}`],
    queryFn: () => getChatMessagesByUserId(userId)
  });

  // Convert chat history to messages format
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "Hello! I'm your AI Career Assistant. How can I help you with your career planning today?"
    }
  ]);

  // Load chat history
  useEffect(() => {
    if (chatHistory && chatHistory.length > 0 && isFirstLoad) {
      const formattedMessages: Message[] = [
        {
          type: "assistant",
          content: "Hello! I'm your AI Career Assistant. How can I help you with your career planning today?"
        },
        ...chatHistory.flatMap(msg => [
          { type: "user" as const, content: msg.message },
          { type: "assistant" as const, content: msg.response }
        ])
      ];
      setMessages(formattedMessages);
      setIsFirstLoad(false);
    }
  }, [chatHistory, isFirstLoad]);

  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => getCareerAdvice(message, userId),
    onSuccess: (data) => {
      // Add the response to messages
      setMessages(prev => [...prev, { type: "assistant", content: data.response }]);
      
      // Invalidate chat history query to refresh it
      queryClient.invalidateQueries({ queryKey: [`/api/chat/user/${userId}`] });
    },
    onError: (error) => {
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
    }
  });

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || sendMessageMutation.isPending) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: "user", content: userMessage }]);
    
    // Send message to API
    sendMessageMutation.mutate(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !sendMessageMutation.isPending) {
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What skills do I need to become a software engineer?",
    "How much education is required for a career in healthcare?",
    "What are the highest paying careers for someone with a business degree?",
    "What career paths are available in the creative arts field?"
  ];

  return (
    <main className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            AI Career Assistant
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Ask questions and get personalized guidance about any career path or education option
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            {/* Chat messages */}
            <div 
              ref={chatContainerRef}
              className="space-y-4 mb-6 h-[60vh] overflow-y-auto scrollbar-hide bg-gray-50 p-4 rounded-lg"
            >
              {isLoadingHistory ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex items-start ${message.type === "user" ? "justify-end" : ""}`}>
                    {message.type === "assistant" && (
                      <div className="flex-shrink-0 bg-primary-100 rounded-full p-2 mr-3">
                        <Lightbulb className="h-6 w-6 text-primary-600" />
                      </div>
                    )}
                    <div 
                      className={`rounded-lg py-3 px-4 max-w-[80%] ${
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
                ))
              )}
              {sendMessageMutation.isPending && (
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

            {/* Suggested questions */}
            {messages.length < 3 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full"
                      onClick={() => {
                        setInputMessage(question);
                        // Focus the input
                        const inputElement = document.getElementById("chat-input");
                        if (inputElement) inputElement.focus();
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <div className="relative">
              <Input
                id="chat-input"
                type="text"
                placeholder="Ask about career paths, skills, education options..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={sendMessageMutation.isPending}
                className="w-full py-3 px-4 pr-12"
              />
              <Button
                onClick={handleSendMessage}
                disabled={sendMessageMutation.isPending || !inputMessage.trim()}
                className="absolute right-1.5 top-1.5 p-2 text-primary-600 hover:text-primary-700 bg-transparent hover:bg-gray-100"
                variant="ghost"
                size="icon"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary-100 rounded-full p-2">
              <MessageSquare className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">About the AI Career Assistant</h2>
              <p className="mt-2 text-gray-600">
                Our AI assistant provides personalized career guidance based on current industry data and educational requirements. 
                You can ask about specific careers, compare different paths, learn about educational requirements, 
                or get advice tailored to your situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AiChatPage;
