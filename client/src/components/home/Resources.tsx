import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getResources } from "@/lib/data";

const Resources = () => {
  const { data: resources, isLoading } = useQuery({
    queryKey: ["/api/resources"],
    queryFn: getResources
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Curated Resources
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Access our collection of hand-picked resources to help you on your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-10">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-primary-600 rounded-full" aria-hidden="true"></div>
              <p className="mt-2 text-gray-600">Loading resources...</p>
            </div>
          ) : resources && resources.length > 0 ? (
            resources.slice(0, 3).map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                    <span className={`
                      text-xs font-medium px-2.5 py-0.5 rounded
                      ${resource.tag === "Learning" ? "bg-blue-100 text-blue-800" : ""}
                      ${resource.tag === "Skills" ? "bg-green-100 text-green-800" : ""}
                      ${resource.tag === "Financial" ? "bg-purple-100 text-purple-800" : ""}
                      ${resource.tag === "Guides" ? "bg-orange-100 text-orange-800" : ""}
                      ${resource.tag === "Tools" ? "bg-indigo-100 text-indigo-800" : ""}
                      ${resource.tag === "Research" ? "bg-pink-100 text-pink-800" : ""}
                    `}>
                      {resource.tag}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  <Link href={resource.url}>
                    <Button
                      variant="link" 
                      className="text-primary-600 hover:text-primary-800 font-medium p-0 h-auto flex items-center"
                    >
                      Browse {resource.title}
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-600">No resources available at the moment.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button 
            asChild
            variant="outline" 
            className="border-primary-600 text-primary-600 hover:bg-primary-50"
          >
            <Link href="/resources">
              View All Resources
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Resources;
