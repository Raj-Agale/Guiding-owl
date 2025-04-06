import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Clock, 
  GraduationCap,
  DollarSign,
  Briefcase,
  ArrowRight,
  BookOpen
} from "lucide-react";
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
  { value: "all", label: "All Categories" },
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Business", label: "Business" },
  { value: "Arts & Design", label: "Arts & Design" },
  { value: "Engineering", label: "Engineering" },
  { value: "Education", label: "Education" }
];

// Color mappings for demand levels
const demandLevelColors = {
  "High Demand": "bg-green-100 text-green-800 border-green-300",
  "Growing": "bg-blue-100 text-blue-800 border-blue-300",
  "Stable": "bg-orange-100 text-orange-800 border-orange-300"
};

const ExploreCareer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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
    
    if (!category || category === "all") {
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

  const getDemandColor = (demandLevel: string) => {
    return demandLevelColors[demandLevel as keyof typeof demandLevelColors] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <main className="pt-8 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with gradient text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
            Explore Career Paths
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and learn about various career paths to find the right fit for your interests and goals.
          </p>
        </div>

        {/* Search and filter section with improved styling */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search careers by title or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full py-3 pl-10 pr-4 border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-[220px] border-gray-300">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value || "placeholder"}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleSearch}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              Search
            </Button>
          </div>
          {(searchTerm || (selectedCategory && selectedCategory !== "all")) && (
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <p>
                Showing results for 
                {searchTerm && <span className="font-medium"> "{searchTerm}"</span>}
                {searchTerm && selectedCategory && selectedCategory !== "all" && <span> in </span>}
                {selectedCategory && selectedCategory !== "all" && <span className="font-medium">{categories.find(c => c.value === selectedCategory)?.label}</span>}
              </p>
              <Button 
                variant="link" 
                className="ml-2 p-0 h-auto text-sm text-primary-600"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setFilteredCareers(careerPaths || []);
                }}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Category chips for quick filtering */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge 
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-primary-50 ${
                selectedCategory === category.value 
                  ? "bg-primary-100 text-primary-800 hover:bg-primary-200" 
                  : "bg-white"
              }`}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.label}
            </Badge>
          ))}
        </div>

        {/* Loading, empty, and results states */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin inline-block w-10 h-10 border-4 border-current border-t-transparent text-primary-600 rounded-full" aria-hidden="true"></div>
            <p className="mt-4 text-lg text-gray-600">Loading career paths...</p>
          </div>
        ) : filteredCareers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No career paths found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any career paths matching your criteria. Try adjusting your search or filters.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setFilteredCareers(careerPaths || []);
              }}
              className="bg-primary-600 hover:bg-primary-700"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-4">Showing {filteredCareers.length} career paths</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map((path) => (
                <div 
                  key={path.id} 
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Header with icon and gradient background */}
                  <div className={`relative h-40 ${path.iconColor} bg-gradient-to-br from-${path.iconColor.split('-')[1]}-500 to-${path.iconColor.split('-')[1]}-600 flex items-center justify-center text-white p-6`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-20 w-20 opacity-90" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                        d={path.icon} 
                      />
                    </svg>
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDemandColor(path.demandLevel)}`}>
                        {path.demandLevel}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <Badge variant="outline" className="text-xs mb-2 text-gray-500 bg-gray-50">
                        {path.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{path.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{path.description}</p>
                    
                    {/* Career details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-primary-500" />
                        <span>{path.salaryRange}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-primary-500" />
                        <span>{path.educationYears}</span>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Link href={`/career/${path.id}`}>
                        <Button className="w-full transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white group">
                          Explore Career Path
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ExploreCareer;
