import { Link } from "react-router-dom";
import { MessageCircle, Users, Trophy, TrendingUp, ArrowRight, Search, Plus } from "lucide-react";

const Home = () => {
  const stats = [
    { label: "Questions Asked", value: "12.5K+", icon: <MessageCircle className="h-8 w-8" /> },
    { label: "Active Users", value: "3.2K+", icon: <Users className="h-8 w-8" /> },
    { label: "Answers Given", value: "28.7K+", icon: <Trophy className="h-8 w-8" /> },
    { label: "Daily Active", value: "850+", icon: <TrendingUp className="h-8 w-8" /> },
  ];

  const categories = [
    { name: "JavaScript", count: 2847, color: "bg-yellow-500" },
    { name: "React", count: 1923, color: "bg-blue-500" },
    { name: "Python", count: 1654, color: "bg-green-500" },
    { name: "Node.js", count: 1432, color: "bg-purple-500" },
    { name: "CSS", count: 1287, color: "bg-pink-500" },
    { name: "TypeScript", count: 1156, color: "bg-indigo-500" },
  ];

  const recentQuestions = [
    {
      id: 1,
      title: "How to implement authentication in React with JWT?",
      author: "john_dev",
      tags: ["react", "jwt", "authentication"],
      votes: 15,
      answers: 8,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Best practices for state management in large React applications?",
      author: "sarah_code",
      tags: ["react", "state-management", "redux"],
      votes: 23,
      answers: 12,
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "How to optimize database queries in Node.js?",
      author: "mike_backend",
      tags: ["nodejs", "database", "optimization"],
      votes: 18,
      answers: 6,
      time: "6 hours ago",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Stack<span className="text-blue-400">It</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Q&A Forum
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ask questions, share knowledge, and build a community of learners. 
            Get answers from experts and help others grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ask"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="mr-2 h-5 w-5" />
              Ask Question
            </Link>
            <Link
              to="/questions"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-slate-900 transform hover:scale-105 transition-all duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Questions
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
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
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

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore questions by technology and topic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/questions?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                      {category.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">{category.count} questions</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Recent Questions
              </h2>
              <p className="text-xl text-gray-600">
                Latest questions from the community
              </p>
            </div>
            <Link
              to="/questions"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {recentQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link
                      to={`/questions/${question.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 block"
                    >
                      {question.title}
                    </Link>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>by {question.author}</span>
                      <span>{question.time}</span>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {question.votes} votes
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {question.answers} answers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start asking questions, sharing knowledge, and connecting with developers worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;