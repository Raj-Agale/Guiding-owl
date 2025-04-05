import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    content: "The roadmap feature helped me understand exactly what I needed to do to become a software engineer. I followed the plan step by step and secured an internship at my dream company!"
  },
  {
    name: "Michael Torres",
    role: "Business Administration Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    content: "The personality assessment was eye-opening. It suggested careers I hadn't considered but align perfectly with my strengths. I'm now pursuing marketing instead of finance and couldn't be happier!"
  },
  {
    name: "Amina Patel",
    role: "High School Senior",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    content: "The AI assistant answered all my questions about different medical specialties and helped me decide which pre-med program to apply to. I feel much more confident about my college applications now."
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Student Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            See how CareerCompass has helped students discover and pursue their dream careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name}'s profile`} 
                  className="h-12 w-12 rounded-full object-cover" 
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, starIndex) => (
                  <Star key={starIndex} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
