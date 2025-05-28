import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Language Learner",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "SkillSwap helped me finally learn Spanish while teaching guitar. I love the community and the concept!",
    rating: 5,
  },
  {
    name: "Mark Evans",
    role: "Web Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I exchanged coding lessons for yoga classes. It’s a win-win and I’ve made great friends along the way.",
    rating: 5,
  },
  {
    name: "Sara Lee",
    role: "Artist",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I never thought I’d be able to teach painting and learn French at the same time. Highly recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">What Our Members Say</h2>

        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
          Real stories from people who transformed their lives through skill
          exchange
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card  p-8 rounded-xl item text-left"
            >
              <div className="flex items-center mb-6">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
                <div className="text-left">
                  <h4 className="font-semibold ">{testimonial.name}</h4>
                  <p className="text-sm opacity-80 ">{testimonial.role}</p>
                </div>
              </div>
              <p className="mb-6">"{testimonial.text}"</p>
              <div className="flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} fill="currentColor" stroke="none" size={20} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
