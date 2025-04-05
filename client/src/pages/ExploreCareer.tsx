import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CareerPath } from "@shared/schema";
import { getCareerPaths, searchCareerPaths, getCareerPathsByCategory } from "@/lib/data";

const categories = [
  { value: "", label: "All Categories" },
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Business", label: "Business" },
  { value: "Arts & Design", label: "Arts & Design" },
  { value: "Engineering", label: "Engineering" },
  { value: "Education", label: "Education" }
];

const ExploreCareer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredCareers, setFilteredCareers] = useState<CareerPath[]>([]);

  const { data: careerPaths, isLoading } = useQuery({
    queryKey: ["/api/career-paths"],
    queryFn: getCareerPaths
  });

  useEffect(() => {
    if (careerPaths) {
      setFilteredCareers(careerPaths);
    }
  }, [careerPaths]);

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    
    if (!category) {
      // Reset to all careers
      setFilteredCareers(careerPaths || []);
      return;
    }
    
    try {
      const results = await getCareerPathsByCategory(category);
      setFilteredCareers(results);
    } catch (error) {
      console.error("Error filtering by category:", error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      if (selectedCategory) {
        // Just filter by the selected category
        await handleCategoryChange(selectedCategory);
      } else {
        // Reset to all careers
        setFilteredCareers(careerPaths || []);
      }
      return;
    }
    
    try {
      const results = await searchCareerPaths(searchTerm);
      
      // If we also have a category selected, further filter the results
      if (selectedCategory) {
        const filtered = results.filter(
          career => career.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredCareers(filtered);
      } else {
        setFilteredCareers(results);
      }
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
    <main className="pt-8 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Career Paths
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and learn about various career paths to find the right fit for your interests and goals.
          </p>
        </div>

        <div className="flex flex-col md:flex-row mb-10 space-y-4 md:space-y-0 md:space-x-4">
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
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-primary-600 rounded-full" aria-hidden="true"></div>
            <p className="mt-4 text-lg text-gray-600">Loading career paths...</p>
          </div>
        ) : filteredCareers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-600 mb-4">No career paths found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setFilteredCareers(careerPaths || []);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((path) => (
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ExploreCareer;
