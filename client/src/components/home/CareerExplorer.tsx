import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getCareerPaths, searchCareerPaths } from "@/lib/data";
import { CareerPath } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

const CareerExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [filteredCareers, setFilteredCareers] = useState<CareerPath[]>([]);
  
  const { data: careerPaths, isLoading } = useQuery({
    queryKey: ["/api/career-paths"],
    queryFn: getCareerPaths
  });

  useEffect(() => {
    if (careerPaths) {
      let result = [...careerPaths];
      
      if (category && category !== "all") {
        result = result.filter(path => path.category.toLowerCase() === category.toLowerCase());
      }
      
      setFilteredCareers(result);
    }
  }, [careerPaths, category]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setFilteredCareers(careerPaths || []);
      return;
    }
    
    try {
      const results = await searchCareerPaths(searchTerm);
      setFilteredCareers(results);
    } catch (error) {
      console.error("Error searching career paths:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Explore Career Paths
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Browse through popular career categories or search for specific careers.
          </p>
        </div>

        <div className="flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full py-3 pr-12"
            />
            <button 
              className="absolute right-3 top-3 text-gray-400"
              onClick={handleSearch}
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Arts & Design">Arts & Design</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-10">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-primary-600 rounded-full" aria-hidden="true"></div>
              <p className="mt-2 text-gray-600">Loading career paths...</p>
            </div>
          ) : filteredCareers.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-600">No career paths found matching your criteria.</p>
            </div>
          ) : (
            filteredCareers.slice(0, 3).map((path) => (
              <div 
                key={path.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300"
              >
                <div className={`h-36 ${path.iconColor} flex items-center justify-center text-white`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d={path.icon} 
                    />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {path.demandLevel}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span>{path.educationYears}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-medium text-sm">
                      Average Salary: {path.salaryRange}
                    </span>
                    <Link href={`/career/${path.id}`}>
                      <Button variant="link" className="text-primary-600 hover:text-primary-800">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-8">
          <Button 
            asChild
            variant="outline" 
            className="border-primary-600 text-primary-600 hover:bg-primary-50"
          >
            <Link href="/explore">
              View All Career Paths
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerExplorer;
