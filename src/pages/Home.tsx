import { Link } from "react-router-dom";
import { Play, BookOpen, Users, Trophy, Star, ArrowRight } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Play className="h-8 w-8" />,
      title: "Interactive Video Lessons",
      description:
        "Engaging video content that makes learning fun and memorable",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Comprehensive Study Materials",
      description: "Complete notes and resources for all subjects",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Teachers",
      description: "Learn from the best educators in the field",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Interactive Quizzes",
      description: "Test your knowledge with fun and challenging quizzes",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent",
      content:
        "My daughter's grades have improved significantly since using LearnKins. The interactive approach really works!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Student",
      content:
        "Learning has never been this fun! The games and quizzes make studying enjoyable.",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      role: "Teacher",
      content:
        "LearnKins complements our classroom teaching perfectly. Students are more engaged than ever.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-learnkins-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Game on!! Education
            <br />
            <span className="text-transparent bg-clip-text bg-learnkins-gradient">
              meets adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Technology is not just a tool. It can give learners a voice that
            they may not have had before
          </p>
          <Link
            to="/subjects"
            className="inline-flex items-center px-8 py-4 bg-learnkins-gradient text-white font-semibold rounded-lg text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ENROLL NOW
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose LearnKins?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine technology with education to create an engaging
              learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-learnkins-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Preview */}
      <section className="py-20 bg-learnkins-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Subjects
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive learning materials for all core subjects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Science",
                color: "from-learnkins-purple-400 to-learnkins-purple-600",
                icon: "🔬",
              },
              {
                name: "Mathematics",
                color: "from-learnkins-blue-400 to-learnkins-blue-600",
                icon: "📊",
              },
              {
                name: "Social Science",
                color: "from-learnkins-green-400 to-learnkins-green-600",
                icon: "🌍",
              },
              {
                name: "English",
                color: "from-learnkins-orange-400 to-learnkins-orange-600",
                icon: "📚",
              },
            ].map((subject, index) => (
              <Link
                key={index}
                to={`/subjects/${subject.name.toLowerCase()}`}
                className="group"
              >
                <div
                  className={`bg-gradient-to-br ${subject.color} rounded-xl p-8 text-white text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-sm opacity-90">
                    Interactive lessons and practice
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">
              Hear from students, parents, and teachers who love learning with
              LearnKins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-learnkins-orange-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-learnkins-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are already excelling with LearnKins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subjects"
              className="inline-flex items-center px-8 py-4 bg-white text-learnkins-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-learnkins-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;