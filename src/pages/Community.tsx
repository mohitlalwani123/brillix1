import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Trophy,
  TrendingUp,
  MessageCircle,
  Star,
  Award,
  Calendar,
  Eye,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("leaderboard");

  const leaderboard = [
    {
      rank: 1,
      name: "security_expert",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
      reputation: 4500,
      questionsAsked: 45,
      answersGiven: 234,
      badges: ["Security Specialist", "Top Contributor", "Expert"],
      change: "+2",
    },
    {
      rank: 2,
      name: "react_master",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
      reputation: 4200,
      questionsAsked: 67,
      answersGiven: 189,
      badges: ["React Expert", "JavaScript Ninja"],
      change: "-1",
    },
    {
      rank: 3,
      name: "fullstack_dev",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
      reputation: 3800,
      questionsAsked: 89,
      answersGiven: 156,
      badges: ["Full Stack", "Problem Solver"],
      change: "+1",
    },
    {
      rank: 4,
      name: "python_guru",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
      reputation: 3600,
      questionsAsked: 34,
      answersGiven: 201,
      badges: ["Python Expert", "Data Science"],
      change: "-2",
    },
    {
      rank: 5,
      name: "css_wizard",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      reputation: 3400,
      questionsAsked: 78,
      answersGiven: 134,
      badges: ["CSS Master", "Design Expert"],
      change: "=",
    },
  ];

  const topContributors = [
    {
      name: "john_dev",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
      contributions: 45,
      type: "Questions This Week",
    },
    {
      name: "sarah_code",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
      contributions: 67,
      type: "Answers This Week",
    },
    {
      name: "mike_backend",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
      contributions: 23,
      type: "Helpful Votes",
    },
  ];

  const recentActivity = [
    {
      type: "question",
      title: "How to optimize React performance?",
      author: "performance_dev",
      time: "5 minutes ago",
      votes: 3,
    },
    {
      type: "answer",
      title: "Best practices for Node.js security",
      author: "security_expert",
      time: "12 minutes ago",
      votes: 8,
    },
    {
      type: "question",
      title: "CSS Grid layout issues",
      author: "frontend_newbie",
      time: "18 minutes ago",
      votes: 1,
    },
    {
      type: "answer",
      title: "TypeScript generic constraints",
      author: "type_master",
      time: "25 minutes ago",
      votes: 12,
    },
  ];

  const badges = [
    {
      name: "First Question",
      description: "Asked your first question",
      icon: "🎯",
      rarity: "Bronze",
      earned: 1250,
    },
    {
      name: "Great Answer",
      description: "Answer scored 25 or more",
      icon: "⭐",
      rarity: "Silver",
      earned: 340,
    },
    {
      name: "Expert",
      description: "Earned 1000+ reputation",
      icon: "🏆",
      rarity: "Gold",
      earned: 89,
    },
    {
      name: "Helpful",
      description: "Voted helpful 100+ times",
      icon: "👍",
      rarity: "Silver",
      earned: 567,
    },
  ];

  const stats = [
    { label: "Total Users", value: "12.5K", icon: <Users className="h-6 w-6" /> },
    { label: "Questions", value: "45.2K", icon: <MessageCircle className="h-6 w-6" /> },
    { label: "Answers", value: "89.7K", icon: <TrendingUp className="h-6 w-6" /> },
    { label: "Daily Active", value: "2.3K", icon: <Eye className="h-6 w-6" /> },
  ];

  const tabs = [
    { id: "leaderboard", label: "Leaderboard", icon: <Trophy className="h-5 w-5" /> },
    { id: "activity", label: "Recent Activity", icon: <TrendingUp className="h-5 w-5" /> },
    { id: "badges", label: "Badges", icon: <Award className="h-5 w-5" /> },
    { id: "contributors", label: "Top Contributors", icon: <Star className="h-5 w-5" /> },
  ];

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "🏅";
    }
  };

  const getChangeColor = (change) => {
    if (change.includes("+")) return "text-green-600 bg-green-100";
    if (change.includes("-")) return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover top contributors, track community activity, and earn badges for your participation
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center"
              >
                <div className="text-blue-600 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "leaderboard" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Community Leaderboard
                </h2>
                <div className="flex items-center space-x-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>This Month</option>
                    <option>This Week</option>
                    <option>All Time</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Reputation
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Questions
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Answers
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaderboard.map((user) => (
                        <tr
                          key={user.rank}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{getRankBadge(user.rank)}</span>
                              <span className="text-lg font-bold text-gray-900">
                                #{user.rank}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="text-lg font-medium text-gray-900">
                                  {user.name}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {user.badges.slice(0, 2).map((badge, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                                    >
                                      {badge}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-blue-600">
                              {user.reputation.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-medium text-gray-900">
                              {user.questionsAsked}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-medium text-gray-900">
                              {user.answersGiven}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChangeColor(
                                user.change
                              )}`}
                            >
                              {user.change}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Community Activity
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search activity..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              activity.type === "question"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {activity.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                        <Link
                          to={`/questions/${index + 1}`}
                          className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {activity.title}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          by {activity.author}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {activity.votes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Load More Activity
                </button>
              </div>
            </div>
          )}

          {activeTab === "badges" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Community Badges
                </h2>
                <p className="text-gray-600">
                  Earn badges by participating in the community and helping others
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {badge.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {badge.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          badge.rarity === "Gold"
                            ? "bg-yellow-100 text-yellow-800"
                            : badge.rarity === "Silver"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {badge.rarity}
                      </span>
                      <span className="text-sm text-gray-500">
                        {badge.earned} earned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contributors" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Top Contributors This Week
                </h2>
                <p className="text-gray-600">
                  Recognizing our most active community members
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {topContributors.map((contributor, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 text-center"
                  >
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {contributor.name}
                    </h3>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {contributor.contributions}
                    </div>
                    <p className="text-sm text-gray-600">{contributor.type}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Want to be featured here?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Start contributing to the community by asking questions and providing helpful answers
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ask"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Ask a Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/questions"
                    className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Answer Questions
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Community;