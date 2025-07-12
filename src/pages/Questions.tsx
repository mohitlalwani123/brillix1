import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  TrendingUp,
  MessageCircle,
  Clock,
  User,
  Plus,
  ArrowUp,
  ArrowDown,
  Eye,
  Tag,
} from "lucide-react";

const Questions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "all",
    "javascript",
    "react",
    "python",
    "nodejs",
    "css",
    "typescript",
    "database",
    "api",
    "mobile",
  ];

  const questions = [
    {
      id: 1,
      title: "How to implement authentication in React with JWT tokens?",
      content: "I'm building a React application and need to implement user authentication using JWT tokens. What's the best approach for storing tokens securely and handling token refresh?",
      author: {
        name: "john_dev",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
        reputation: 1250,
      },
      tags: ["react", "jwt", "authentication", "security"],
      votes: 15,
      answers: 8,
      views: 342,
      createdAt: "2 hours ago",
      isAnswered: true,
      difficulty: "intermediate",
    },
    {
      id: 2,
      title: "Best practices for state management in large React applications?",
      content: "As my React application grows, I'm struggling with state management. Should I use Redux, Zustand, or Context API? What are the pros and cons of each approach?",
      author: {
        name: "sarah_code",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
        reputation: 2100,
      },
      tags: ["react", "state-management", "redux", "context-api"],
      votes: 23,
      answers: 12,
      views: 567,
      createdAt: "4 hours ago",
      isAnswered: true,
      difficulty: "advanced",
    },
    {
      id: 3,
      title: "How to optimize database queries in Node.js applications?",
      content: "My Node.js API is becoming slow due to inefficient database queries. What are some strategies to optimize query performance and reduce response times?",
      author: {
        name: "mike_backend",
        avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
        reputation: 890,
      },
      tags: ["nodejs", "database", "optimization", "performance"],
      votes: 18,
      answers: 6,
      views: 234,
      createdAt: "6 hours ago",
      isAnswered: false,
      difficulty: "intermediate",
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to use which?",
      content: "I'm confused about when to use CSS Grid versus Flexbox for layouts. Can someone explain the key differences and provide examples of when each is most appropriate?",
      author: {
        name: "css_ninja",
        avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
        reputation: 1560,
      },
      tags: ["css", "grid", "flexbox", "layout"],
      votes: 31,
      answers: 15,
      views: 789,
      createdAt: "8 hours ago",
      isAnswered: true,
      difficulty: "beginner",
    },
    {
      id: 5,
      title: "TypeScript generics: Advanced patterns and use cases",
      content: "I'm trying to understand advanced TypeScript generic patterns. How can I create reusable type-safe functions and components using generics effectively?",
      author: {
        name: "type_master",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
        reputation: 3200,
      },
      tags: ["typescript", "generics", "types", "advanced"],
      votes: 27,
      answers: 9,
      views: 445,
      createdAt: "12 hours ago",
      isAnswered: true,
      difficulty: "advanced",
    },
    {
      id: 6,
      title: "Python async/await best practices for web scraping",
      content: "I'm building a web scraper in Python and want to use async/await for better performance. What are the best practices for handling concurrent requests and avoiding rate limits?",
      author: {
        name: "python_scraper",
        avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100",
        reputation: 1780,
      },
      tags: ["python", "async", "web-scraping", "concurrency"],
      votes: 14,
      answers: 4,
      views: 198,
      createdAt: "1 day ago",
      isAnswered: false,
      difficulty: "intermediate",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           question.tags.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
              <p className="text-gray-600 mt-2">
                {filteredQuestions.length} questions found
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Link
                to="/ask"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus className="mr-2 h-5 w-5" />
                Ask Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Questions
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recent">Most Recent</option>
                  <option value="votes">Most Votes</option>
                  <option value="answers">Most Answers</option>
                  <option value="views">Most Views</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  <div className="flex items-start space-x-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ArrowUp className="h-5 w-5 text-gray-400 hover:text-green-600" />
                      </button>
                      <span className="text-lg font-semibold text-gray-700">
                        {question.votes}
                      </span>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <ArrowDown className="h-5 w-5 text-gray-400 hover:text-red-600" />
                      </button>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <Link
                          to={`/questions/${question.id}`}
                          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {question.title}
                        </Link>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {question.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{question.answers} answers</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{question.views} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{question.createdAt}</span>
                          </div>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center space-x-2">
                          <img
                            src={question.author.avatar}
                            alt={question.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">
                              {question.author.name}
                            </p>
                            <p className="text-gray-500">
                              {question.author.reputation} rep
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Answer Status */}
                      {question.isAnswered && (
                        <div className="mt-3 inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          ✓ Answered
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Load More Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;