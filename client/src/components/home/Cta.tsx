import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="bg-primary-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Ready to Plan Your Future?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-center max-w-3xl">
          Join thousands of students who have found their career path with CareerCompass.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            asChild
            variant="secondary"
            size="lg" 
            className="bg-white text-primary-700 hover:bg-gray-100"
          >
            <Link href="/explore">
              Create Free Account
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-primary-500 text-white border border-white hover:bg-primary-400"
          >
            <Link href="/resources">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
