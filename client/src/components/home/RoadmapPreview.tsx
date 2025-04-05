import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const roadmapFeatures = [
  "Required education and certifications",
  "Cost breakdown for all necessary training",
  "Essential skills and experiences to gain",
  "Timeline with key milestones",
  "Alternative pathways and specializations"
];

const RoadmapPreview = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between md:space-x-8">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Your Personalized Career Roadmap
            </h2>
            <p className="text-gray-600 mb-6">
              Set your career goals and get a detailed roadmap showing you the exact steps to achieve them.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Your Roadmap Includes:
              </h3>
              <ul className="space-y-3">
                {roadmapFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button
              asChild
              className="bg-primary-600 hover:bg-primary-700"
            >
              <Link href="/roadmap">
                Create Your Roadmap
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Student reviewing career roadmap" 
              className="rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapPreview;
