import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  DollarSign, 
  BookOpen,
  Award,
  Briefcase,
  Check,
  ArrowLeft,
  GraduationCap,
  TrendingUp,
  Lightbulb,
  Target,
  BarChart4,
  Share2,
  MapPin,
  MessageCircle
} from "lucide-react";
import { getCareerPathById } from "@/lib/data";

const CareerDetail = () => {
  const { id } = useParams();
  // Use a default ID if none is provided in the URL
  const careerId = id ? parseInt(id) : 1;

  const { data: career, isLoading, error } = useQuery({
    queryKey: [`/api/career-paths/${careerId}`],
    queryFn: () => getCareerPathById(careerId)
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-10 h-10 border-4 border-current border-t-transparent text-primary-600 rounded-full" aria-hidden="true"></div>
          <p className="mt-6 text-lg text-gray-600">Loading career details...</p>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <MapPin className="h-10 w-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Not Found</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sorry, we couldn't find the career information you're looking for. It may have been removed or doesn't exist.
            </p>
            <Button asChild>
              <Link href="/explore">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Career Explorer
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock data for the detail page
  const keySkills = [
    "Problem Solving",
    "Programming Languages (JavaScript, Python)",
    "Data Structures & Algorithms",
    "Version Control (Git)",
    "Collaboration & Communication",
    "Continuous Learning"
  ];

  const educationPaths = [
    { name: "Computer Science Degree", duration: "4 years", level: "Bachelor's" },
    { name: "Coding Bootcamp", duration: "3-6 months", level: "Certificate" },
    { name: "Self-taught Path", duration: "Varies", level: "Varies" }
  ];

  const careerGrowth = [
    { role: "Junior Developer", experience: "0-2 years", salary: "$60,000 - $85,000" },
    { role: "Mid-Level Developer", experience: "2-5 years", salary: "$85,000 - $110,000" },
    { role: "Senior Developer", experience: "5+ years", salary: "$110,000 - $150,000+" }
  ];

  // Demand level badge styling
  const getDemandLevelStyle = (level: string) => {
    switch (level) {
      case 'High Demand':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Growing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Stable':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white pt-10 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/explore">
          <Button variant="ghost" className="mb-6 hover:bg-white/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Career Explorer
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
          <div className={`relative h-48 ${career.iconColor} bg-gradient-to-r from-${career.iconColor.split('-')[1]}-600 to-${career.iconColor.split('-')[1]}-500 flex items-center justify-center`}>
            <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-30"></div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-24 w-24 text-white/90" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d={career.icon} 
              />
            </svg>
          </div>
          
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
              <div>
                <Badge variant="outline" className="mb-3 text-sm bg-gray-50">
                  {career.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  {career.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {career.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getDemandLevelStyle(career.demandLevel)}`}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {career.demandLevel}
                </span>
              </div>
            </div>
            
            {/* Key Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase">Salary Range</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{career.salaryRange}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase">Education Time</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{career.educationYears}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase">Education Level</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">Bachelor's Degree or Equivalent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Key Skills Card */}
          <Card className="overflow-hidden shadow-sm">
            <div className={`py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-500 text-white`}>
              <h2 className="text-lg font-semibold flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Key Skills Required
              </h2>
            </div>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {keySkills.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Education Paths Card */}
          <Card className="overflow-hidden shadow-sm">
            <div className={`py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white`}>
              <h2 className="text-lg font-semibold flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education Paths
              </h2>
            </div>
            <CardContent className="pt-6 p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {educationPaths.map((path, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{path.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{path.duration}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{path.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Career Growth Card */}
          <Card className="overflow-hidden shadow-sm">
            <div className={`py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white`}>
              <h2 className="text-lg font-semibold flex items-center">
                <BarChart4 className="h-5 w-5 mr-2" />
                Career Growth Path
              </h2>
            </div>
            <CardContent className="pt-6 p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {careerGrowth.map((position, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{position.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{position.experience}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{position.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Ready to plan your career journey?</h2>
            <p className="text-gray-600 mb-4">
              Create a personalized roadmap with detailed steps, resources, and timelines tailored to your specific goals and starting point.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-sm">
                <Link href={`/roadmap?career=${careerId}`}>
                  <Target className="mr-2 h-5 w-5" />
                  Create Personalized Roadmap
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Link href="/ai-assistant">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Ask AI Assistant
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0 w-32 md:w-40 h-32 md:h-40 relative hidden md:block">
            <div className="absolute inset-0 bg-primary-100 rounded-full flex items-center justify-center">
              <Award className="h-20 w-20 text-primary-500" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CareerDetail;
