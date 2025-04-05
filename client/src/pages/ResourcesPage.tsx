import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getResources } from "@/lib/data";
import { Link } from "wouter";
import { ChevronRight, Search, BookOpen, Briefcase, GraduationCap, DollarSign, BarChart2, Library } from "lucide-react";

const categories = [
  { id: "all", name: "All Resources", icon: <BookOpen className="h-5 w-5" /> },
  { id: "Learning", name: "Courses & Learning", icon: <GraduationCap className="h-5 w-5" /> },
  { id: "Skills", name: "Skills Development", icon: <Briefcase className="h-5 w-5" /> },
  { id: "Financial", name: "Financial Aid", icon: <DollarSign className="h-5 w-5" /> },
  { id: "Guides", name: "Career Guides", icon: <Library className="h-5 w-5" /> },
  { id: "Tools", name: "Tools & Templates", icon: <BarChart2 className="h-5 w-5" /> }
];

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: resources, isLoading } = useQuery({
    queryKey: ["/api/resources"],
    queryFn: getResources
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search with current searchTerm
  };

  const filteredResources = resources 
    ? resources.filter(resource => 
        (selectedCategory === "all" || resource.category === selectedCategory) &&
        (searchTerm === "" || 
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Learning": return "bg-blue-100 text-blue-800";
      case "Skills": return "bg-green-100 text-green-800";
      case "Financial": return "bg-purple-100 text-purple-800";
      case "Guides": return "bg-orange-100 text-orange-800";
      case "Tools": return "bg-indigo-100 text-indigo-800";
      case "Research": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Career Resources
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our curated collection of resources to help you on your career journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.icon}
                    <span className="ml-3">{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-600 border-t-transparent"></div>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or browse a different category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{resource.title}</CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={getTagColor(resource.tag)}
                        >
                          {resource.tag}
                        </Badge>
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={resource.url}>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto flex items-center text-primary-600 hover:text-primary-800"
                        >
                          Browse {resource.title}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResourcesPage;
