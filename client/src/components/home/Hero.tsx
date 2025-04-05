import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="md:flex md:items-center md:space-x-8">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Navigate Your Future with Confidence
            </h1>
            <p className="text-lg md:text-xl mb-6 text-primary-100">
              Discover career paths, set goals, and get personalized guidance — all for free.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                asChild
                variant="secondary" 
                size="lg"
                className="bg-white text-primary-700 hover:bg-gray-100"
              >
                <Link href="/explore">
                  Explore Careers
                </Link>
              </Button>
              <Button 
                asChild
                variant="default" 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Link href="/personality-test">
                  Take Career Quiz
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Students planning their future" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
