import { 
  ClipboardList, 
  BarChart3, 
  MessageSquare, 
  Shield 
} from "lucide-react";

const featuresData = [
  {
    icon: <ClipboardList className="h-10 w-10" />,
    title: "Career Catalog",
    description: "Explore comprehensive listings of diverse career paths with detailed information."
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Custom Roadmaps",
    description: "Get personalized career roadmaps with pricing, skills needed, and timelines."
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "AI Assistant",
    description: "Ask questions and receive instant, personalized career guidance and advice."
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Personality Test",
    description: "Discover careers that match your personality, interests, and strengths."
  }
];

const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Your Complete Career Guidance Platform
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            All the tools you need to make informed decisions about your education and career path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition duration-300"
            >
              <div className="text-primary-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
