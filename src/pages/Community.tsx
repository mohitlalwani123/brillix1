import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  Users,
  Trophy,
  Heart,
  Share2,
  Clock,
  Star,
} from "lucide-react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");

  const discussions = [
    {
      id: 1,
      title: "Need help with Quadratic Equations",
      author: "Alex Chen",
      subject: "Mathematics",
      replies: 12,
      likes: 24,
      time: "2 hours ago",
      preview:
        "I'm struggling with understanding the discriminant in quadratic equations. Can someone explain it in simple terms?",
    },
    {
      id: 2,
      title: "Photosynthesis experiment results",
      author: "Sarah Johnson",
      subject: "Science",
      replies: 8,
      likes: 18,
      time: "4 hours ago",
      preview:
        "Just completed the photosynthesis experiment. Here are my observations and some questions about the process.",
    },
    {
      id: 3,
      title: "Tips for memorizing historical dates",
      author: "Mike Rodriguez",
      subject: "Social Science",
      replies: 15,
      likes: 32,
      time: "6 hours ago",
      preview:
        "What are your best strategies for remembering important dates in history? I've tried several methods but...",
    },
    {
      id: 4,
      title: "Creative writing assignment feedback",
      author: "Emily Davis",
      subject: "English",
      replies: 6,
      likes: 14,
      time: "8 hours ago",
      preview:
        "Would love to get some feedback on my short story. It's about a young explorer who discovers a hidden world.",
    },
  ];

  const studyGroups = [
    {
      name: "Math Masters",
      members: 45,
      subject: "Mathematics",
      description: "Collaborative problem-solving and concept discussions",
      activity: "Very Active",
      color: "bg-blue-500",
    },
    {
      name: "Science Explorers",
      members: 38,
      subject: "Science",
      description: "Experiment sharing and scientific discussions",
      activity: "Active",
      color: "bg-purple-500",
    },
    {
      name: "History Buffs",
      members: 29,
      subject: "Social Science",
      description: "Historical analysis and timeline discussions",
      activity: "Moderate",
      color: "bg-green-500",
    },
    {
      name: "Word Wizards",
      members: 33,
      subject: "English",
      description: "Creative writing and literature discussions",
      activity: "Active",
      color: "bg-orange-500",
    },
  ];

  const achievements = [
    {
      title: "Quiz Master",
      description: "Scored 100% on 10 quizzes",
      icon: "🏆",
      rarity: "Gold",
      earned: 156,
    },
    {
      title: "Helpful Helper",
      description: "Helped 50 students with their questions",
      icon: "🤝",
      rarity: "Silver",
      earned: 89,
    },
    {
      title: "Discussion Starter",
      description: "Started 25 meaningful discussions",
      icon: "💬",
      rarity: "Bronze",
      earned: 234,
    },
    {
      title: "Study Streak",
      description: "Studied for 30 consecutive days",
      icon: "🔥",
      rarity: "Gold",
      earned: 67,
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Johnson", points: 9850, badge: "🥇", change: "+2" },
    { rank: 2, name: "Sarah Chen", points: 9720, badge: "🥈", change: "-1" },
    {
      rank: 3,
      name: "Mike Rodriguez",
      points: 9650,
      badge: "🥉",
      change: "+1",
    },
    { rank: 4, name: "Emily Davis", points: 9580, badge: "🏅", change: "-2" },
    { rank: 5, name: "David Kim", points: 9520, badge: "🏅", change: "=" },
    { rank: 6, name: "Lisa Wang", points: 9480, badge: "🏅", change: "+3" },
    { rank: 7, name: "John Smith", points: 9450, badge: "🏅", change: "-1" },
    { rank: 8, name: "Anna Brown", points: 9420, badge: "🏅", change: "+1" },
  ];

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "Very Active":
        return "text-green-600 bg-green-100";
      case "Active":
        return "text-blue-600 bg-blue-100";
      case "Moderate":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Gold":
        return "text-yellow-600 bg-yellow-100";
      case "Silver":
        return "text-gray-600 bg-gray-100";
      case "Bronze":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const tabs = [
    {
      id: "discussions",
      label: "Discussions",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      id: "groups",
      label: "Study Groups",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: <Star className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-lg mb-6">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <ArrowRight className="h-5 w-5" />
            <span>Community</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Community</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with fellow students, share knowledge, and grow together in
            our learning community
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                label: "Active Students",
                value: "2,500+",
                icon: <Users className="h-8 w-8" />,
              },
              {
                label: "Discussions",
                value: "1,200+",
                icon: <MessageCircle className="h-8 w-8" />,
              },
              {
                label: "Study Groups",
                value: "150+",
                icon: <Users className="h-8 w-8" />,
              },
              {
                label: "Achievements",
                value: "500+",
                icon: <Trophy className="h-8 w-8" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
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

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
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

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "discussions" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Recent Discussions
                </h2>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                  Start New Discussion
                </button>
              </div>

              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {discussion.title}
                          </h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {discussion.subject}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">
                          {discussion.preview}
                        </p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>By {discussion.author}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{discussion.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes} likes</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Like discussion"
                          title="Like discussion"
                        >
                          <Heart className="h-5 w-5" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label="Share discussion"
                          title="Share discussion"
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "groups" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Study Groups
                </h2>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                  Create Group
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {studyGroups.map((group, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 ${group.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                        >
                          {group.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {group.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {group.subject}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${getActivityColor(
                          group.activity
                        )}`}
                      >
                        {group.activity}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{group.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{group.members} members</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                        Join Group
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "achievements" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Achievements
                </h2>
                <p className="text-lg text-gray-600">
                  Unlock badges and achievements as you progress in your
                  learning journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center"
                  >
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {achievement.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${getRarityColor(
                          achievement.rarity
                        )}`}
                      >
                        {achievement.rarity}
                      </span>
                      <span className="text-sm text-gray-500">
                        {achievement.earned} earned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Leaderboard
                </h2>
                <p className="text-lg text-gray-600">
                  See how you rank against other students this week
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaderboard.map((student) => (
                        <tr
                          key={student.rank}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{student.badge}</span>
                              <span className="text-lg font-bold text-gray-900">
                                #{student.rank}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-medium text-gray-900">
                              {student.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-blue-600">
                              {student.points.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                student.change.includes("+")
                                  ? "bg-green-100 text-green-800"
                                  : student.change.includes("-")
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {student.change}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Connect with thousands of students, share knowledge, and achieve
            academic success together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subjects"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
              Join Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
