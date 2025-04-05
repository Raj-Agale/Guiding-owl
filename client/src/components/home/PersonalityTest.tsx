import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const PersonalityTest = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Find Your Career Match
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Take our personality-based assessment to discover careers that align with your strengths and interests.
          </p>
        </div>

        <div className="bg-gradient-to-r from-sky-500 to-primary-600 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Career Personality Assessment</h3>
              <p className="mb-6">Our comprehensive assessment analyzes your:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {["Work preferences", "Natural strengths", "Values and motivations", "Learning style"].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Zap className="h-6 w-6 mr-3 text-white" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white text-primary-700 hover:bg-gray-100"
              >
                <Link href="/personality-test">
                  Take the Assessment
                </Link>
              </Button>
            </div>
            <div className="md:w-1/3 flex items-center justify-center p-8 md:p-0">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                alt="Taking personality test" 
                className="rounded-lg h-64 w-full object-cover md:h-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalityTest;
