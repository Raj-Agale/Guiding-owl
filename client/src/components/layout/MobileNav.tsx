import { Link, useLocation } from "wouter";
import { Home, Search, BookOpen, MessageSquare, FileText } from "lucide-react";

const MobileNav = () => {
  const [location] = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-6 w-6" />,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: <Search className="h-6 w-6" />,
    },
    {
      name: "Roadmap",
      path: "/roadmap",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      name: "Resume",
      path: "/resume-builder",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      name: "AI Chat",
      path: "/ai-assistant",
      icon: <MessageSquare className="h-6 w-6" />,
    },
  ];

  const isActive = (path: string) => location === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-10">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center py-3 ${
              isActive(item.path) ? "text-primary-600" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
