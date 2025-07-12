import { useState } from "react";
import { 
  User, 
  Settings, 
  Trophy, 
  MessageCircle, 
  TrendingUp, 
  Calendar,
  Edit,
  Save,
  X,
  Award,
  Eye,
  Heart
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Developer",
    email: "john.dev@example.com",
    bio: "Full-stack developer passionate about React, Node.js, and building great user experiences. Always learning and sharing knowledge with the community.",
    location: "San Francisco, CA",
    website: "https://johndev.com",
    github: "johndev",
    twitter: "johndev",
  });

  const userStats = {
    reputation: 1250,
    questionsAsked: 45,
    answersGiven: 89,
    helpfulVotes: 234,
    profileViews: 1567,
    joinDate: "January 2023",
  };

  const badges = [
    { name: "First Question", icon: "🎯", rarity: "Bronze", earned: "2 months ago" },
    { name: "Great Answer", icon: "⭐", rarity: "Silver", earned: "1 month ago" },
    { name: "Helpful", icon: "👍", rarity: "Silver", earned: "3 weeks ago" },
    { name: "Popular Question", icon: "🔥", rarity: "Gold", earned: "1 week ago" },
  ];

  const recentQuestions = [
    {
      id: 1,
      title: "How to implement authentication in React with JWT?",
      votes: 15,
      answers: 8,
      views: 342,
      createdAt: "2 days ago",
      tags: ["react", "jwt", "authentication"],
    },
    {
      id: 2,
      title: "Best practices for Node.js error handling",
      votes: 23,
      answers: 12,
      views: 567,
      createdAt: "1 week ago",
      tags: ["nodejs", "error-handling", "best-practices"],
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox for responsive layouts",
      votes: 18,
      answers: 6,
      views: 234,
      createdAt: "2 weeks ago",
      tags: ["css", "grid", "flexbox", "responsive"],
    },
  ];

  const recentAnswers = [
    {
      id: 1,
      questionTitle: "How to optimize React performance?",
      votes: 12,
      isAccepted: true,
      createdAt: "1 day ago",
    },
    {
      id: 2,
      questionTitle: "TypeScript generic constraints explained",
      votes: 8,
      isAccepted: false,
      createdAt: "3 days ago",
    },
    {
      id: 3,
      questionTitle: "Database indexing strategies",
      votes: 15,
      isAccepted: true,
      createdAt: "1 week ago",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: <User className="h-5 w-5" /> },
    { id: "questions", label: "Questions", icon: <MessageCircle className="h-5 w-5" /> },
    { id: "answers", label: "Answers", icon: <TrendingUp className="h-5 w-5" /> },
    { id: "badges", label: "Badges", icon: <Trophy className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Profile saved:", profileData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Silver":
        return "bg-gray-100 text-gray-800";
      case "Bronze":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-100"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                <User className="h-4 w-4" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData.name}
                </h1>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </button>
                )}
              </div>
              
              <p className="text-gray-600 mb-3">{profileData.bio}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {userStats.joinDate}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {userStats.profileViews} profile views
                </div>
                {profileData.location && (
                  <div>📍 {profileData.location}</div>
                )}
                {profileData.website && (
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    🌐 Website
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {userStats.reputation}
                </div>
                <div className="text-sm text-gray-600">Reputation</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {userStats.helpfulVotes}
                </div>
                <div className="text-sm text-gray-600">Helpful Votes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {userStats.questionsAsked}
            </div>
            <div className="text-gray-600">Questions Asked</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {userStats.answersGiven}
            </div>
            <div className="text-gray-600">Answers Given</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {userStats.helpfulVotes}
            </div>
            <div className="text-gray-600">Helpful Votes</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {badges.length}
            </div>
            <div className="text-gray-600">Badges Earned</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 overflow-x-auto px-6">
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

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">
                        Asked a question about React authentication
                      </span>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">
                        Answered a question about Node.js performance
                      </span>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <span className="text-gray-700">
                        Earned "Popular Question" badge
                      </span>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["react", "javascript", "nodejs", "typescript", "css"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "questions" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  My Questions ({recentQuestions.length})
                </h3>
                <div className="space-y-4">
                  {recentQuestions.map((question) => (
                    <div
                      key={question.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        {question.title}
                      </h4>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{question.votes} votes</span>
                          <span>{question.answers} answers</span>
                          <span>{question.views} views</span>
                        </div>
                        <span>{question.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "answers" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  My Answers ({recentAnswers.length})
                </h3>
                <div className="space-y-4">
                  {recentAnswers.map((answer) => (
                    <div
                      key={answer.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">
                            {answer.questionTitle}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{answer.votes} votes</span>
                            {answer.isAccepted && (
                              <span className="flex items-center text-green-600">
                                <Award className="h-4 w-4 mr-1" />
                                Accepted
                              </span>
                            )}
                            <span>{answer.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "badges" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  My Badges ({badges.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 text-center"
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {badge.name}
                      </h4>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded mb-2 ${getBadgeColor(
                          badge.rarity
                        )}`}
                      >
                        {badge.rarity}
                      </span>
                      <p className="text-sm text-gray-500">
                        Earned {badge.earned}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Profile Settings
                </h3>
                
                {isEditing && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800">Editing profile...</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;