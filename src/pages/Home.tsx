import { Link } from "react-router-dom";
import { ArrowRight, Play, BookOpen, Users, Trophy, Star, Clock, Target } from "lucide-react";

const Home = () => {
  const stats = [
    { label: "Students Learning", value: "10,000+", icon: <Users className="h-8 w-8" /> },
    { label: "Interactive Lessons", value: "500+", icon: <Play className="h-8 w-8" /> },
    { label: "Study Materials", value: "1,200+", icon: <BookOpen className="h-8 w-8" /> },
    { label: "Success Rate", value: "95%", icon: <Trophy className="h-8 w-8" /> },
  ];

  const subjects = [
    {
      name: "Science",
      slug: "science",
      description: "Explore the wonders of physics, chemistry, and biology through interactive experiments.",
      color: "from-learnkins-purple-500 to-learnkins-purple-600",
      icon: "🔬",
      lessons: 120,
    },
    {
      name: "Mathematics",
      slug: "mathematics", 
      description: "Master mathematical concepts from basic arithmetic to advanced problem-solving.",
      color: "from-learnkins-blue-500 to-learnkins-blue-600",
      icon: "📊",
      lessons: 150,
    },
    {
      name: "Social Science",
      slug: "social-science",
      description: "Understand history, geography, civics through engaging stories and interactive maps.",
      color: "from-learnkins-green-500 to-learnkins-green-600", 
      icon: "🌍",
      lessons: 100,
    },
    {
      name: "English",
      slug: "english",
      description: "Develop reading, writing, and communication skills through literature and creative exercises.",
      color: "from-learnkins-orange-500 to-learnkins-orange-600",
      icon: "📚",
      lessons: 80,
    },
  ];

  const features = [
    {
      title: "Interactive Learning",
      description: "Engaging videos, animations, and interactive content that makes learning fun and memorable.",
      icon: <Play className="h-12 w-12" />,
      color: "text-learnkins-blue-600",
    },
    {
      title: "Gamified Experience", 
      description: "Earn points, badges, and compete with friends while learning through educational games.",
      icon: <Trophy className="h-12 w-12" />,
      color: "text-learnkins-orange-600",
    },
    {
      title: "Parental Controls",
      description: "Comprehensive monitoring and control features for parents to track their child's progress.",
      icon: <Users className="h-12 w-12" />,
      color: "text-learnkins-green-600",
    },
    {
      title: "Expert Faculty",
      description: "Learn from qualified teachers and subject matter experts with years of experience.",
      icon: <Star className="h-12 w-12" />,
      color: "text-learnkins-purple-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-learnkins-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/public/Screenshot 2025-07-01 135146.png" 
              alt="LearnKins Logo" 
              className="h-20 w-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to
            <br />
            <span className="text-transparent bg-clip-text bg-learnkins-gradient">
              LearnKins
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Gamified Learning for Young Minds - Interactive education platform designed specifically for middle school students with comprehensive parental controls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subjects"
              className="inline-flex items-center px-8 py-4 bg-learnkins-gradient text-white font-semibold rounded-lg text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </Link>
            <Link
              to="/parental-control"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-learnkins-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              <Users className="mr-2 h-5 w-5" />
              Parental Controls
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center"
              >
                <div className="text-learnkins-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose LearnKins?
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive learning platform designed for young minds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <div className={`${feature.color} mb-4 flex justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Subjects
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive curriculum for middle school students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className={`bg-gradient-to-br ${subject.color} p-8 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl">{subject.icon}</div>
                    <div className="text-4xl font-bold opacity-20">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-lg opacity-90">{subject.description}</p>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Play className="h-5 w-5 text-learnkins-blue-600" />
                      <span className="text-gray-600">{subject.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-learnkins-orange-400 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>

                  <Link
                    to={`/subjects/${subject.slug}`}
                    className="block w-full bg-learnkins-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-learnkins-blue-700 transition-colors duration-300 font-semibold group-hover:bg-learnkins-blue-700"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quick Access
            </h2>
            <p className="text-xl text-gray-600">
              Jump into your favorite learning activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/flashcards"
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center group"
            >
              <div className="text-learnkins-purple-600 mb-4 flex justify-center">
                <Target className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Flashcards</h3>
              <p className="text-gray-600 mb-4">
                Interactive flashcards for quick review and memorization
              </p>
              <span className="text-learnkins-purple-600 font-semibold">
                Start Studying →
              </span>
            </Link>

            <Link
              to="/games-quiz"
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center group"
            >
              <div className="text-learnkins-orange-600 mb-4 flex justify-center">
                <Trophy className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Games & Quiz</h3>
              <p className="text-gray-600 mb-4">
                Educational games and quizzes to make learning fun
              </p>
              <span className="text-learnkins-orange-600 font-semibold">
                Play Now →
              </span>
            </Link>

            <Link
              to="/study-materials"
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center group"
            >
              <div className="text-learnkins-green-600 mb-4 flex justify-center">
                <BookOpen className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Study Materials</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive notes, videos, and resources for all subjects
              </p>
              <span className="text-learnkins-green-600 font-semibold">
                Browse Materials →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-learnkins-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who are already excelling with LearnKins' interactive learning platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subjects"
              className="inline-flex items-center px-8 py-4 bg-white text-learnkins-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Subjects
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