import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  DollarSign, 
  BookOpen,
  Award,
  Briefcase,
  Check,
  ArrowLeft
} from "lucide-react";
import { getCareerPathById } from "@/lib/data";

const CareerDetail = () => {
  const { id } = useParams();
  const careerId = parseInt(id);

  const { data: career, isLoading, error } = useQuery({
    queryKey: [`/api/career-paths/${careerId}`],
    queryFn: () => getCareerPathById(careerId)
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-primary-600 rounded-full" aria-hidden="true"></div>
          <p className="mt-4 text-lg text-gray-600">Loading career details...</p>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-gray-50 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Not Found</h1>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the career information you're looking for.
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

  return (
    <main className="bg-gray-50 pt-10 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/explore">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explorer
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className={`${career.iconColor} h-32 md:h-48 flex items-center justify-center`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-20 w-20 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={career.icon} 
              />
            </svg>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{career.title}</h1>
                <p className="text-gray-600 mt-2">{career.category}</p>
              </div>
              <span className="mt-4 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {career.demandLevel}
              </span>
            </div>
            
            <p className="text-lg text-gray-700 mb-8">{career.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Salary Range</h3>
                  <p className="mt-2 text-sm text-gray-600">{career.salaryRange}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Education Time</h3>
                  <p className="mt-2 text-sm text-gray-600">{career.educationYears}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Education Level</h3>
                  <p className="mt-2 text-sm text-gray-600">Bachelor's Degree or Equivalent</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Skills Required</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {keySkills.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Education Paths</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {educationPaths.map((path, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{path.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{path.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{path.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Career Growth Path</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Range</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {careerGrowth.map((position, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{position.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.experience}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <Button asChild className="bg-primary-600 hover:bg-primary-700">
                <Link href={`/roadmap?career=${careerId}`}>
                  <Award className="mr-2 h-5 w-5" />
                  Create Personalized Roadmap
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                <Link href="/ai-assistant">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Ask Questions About This Career
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CareerDetail;
