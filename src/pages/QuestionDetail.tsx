import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share2,
  Bookmark,
  Flag,
  Eye,
  Clock,
  Tag,
  Award,
  CheckCircle,
  Edit,
  Trash2,
} from "lucide-react";

const QuestionDetail = () => {
  const { id } = useParams();
  const [newAnswer, setNewAnswer] = useState("");
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  // Mock data - in real app, this would come from API
  const question = {
    id: 1,
    title: "How to implement authentication in React with JWT tokens?",
    content: `I'm building a React application and need to implement user authentication using JWT tokens. Here's what I'm trying to achieve:

## Current Setup
- React 18 with TypeScript
- Node.js backend with Express
- MongoDB for user data

## What I've Tried
I've tried storing the JWT token in localStorage, but I'm concerned about security implications:

\`\`\`javascript
// Current approach
const token = localStorage.getItem('token');
if (token) {
  // Make authenticated requests
}
\`\`\`

## Questions
1. Is localStorage safe for storing JWT tokens?
2. How should I handle token refresh?
3. What's the best way to protect routes in React?

Any help would be greatly appreciated!`,
    author: {
      name: "john_dev",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
      reputation: 1250,
      badges: ["React Expert", "JavaScript Ninja"],
      joinDate: "2 years ago",
    },
    tags: ["react", "jwt", "authentication", "security"],
    votes: 15,
    views: 342,
    createdAt: "2 hours ago",
    isAnswered: true,
    difficulty: "intermediate",
  };

  const answers = [
    {
      id: 1,
      content: `Great question! Here's a comprehensive approach to JWT authentication in React:

## 1. Token Storage Security

**Don't use localStorage for sensitive tokens.** Instead, use httpOnly cookies:

\`\`\`javascript
// Backend: Set httpOnly cookie
res.cookie('token', jwt, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
\`\`\`

## 2. Token Refresh Strategy

Implement automatic token refresh:

\`\`\`javascript
// React hook for token management
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const refreshToken = async () => {
      try {
        await api.post('/auth/refresh');
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    
    refreshToken();
    const interval = setInterval(refreshToken, 15 * 60 * 1000); // 15 min
    
    return () => clearInterval(interval);
  }, []);
  
  return { isAuthenticated };
};
\`\`\`

## 3. Protected Routes

Use a higher-order component or custom hook:

\`\`\`javascript
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
\`\`\`

This approach is much more secure than localStorage and handles refresh automatically.`,
      author: {
        name: "security_expert",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
        reputation: 4500,
        badges: ["Security Specialist", "Top Contributor"],
        joinDate: "3 years ago",
      },
      votes: 23,
      isAccepted: true,
      createdAt: "1 hour ago",
      comments: [
        {
          id: 1,
          content: "This is exactly what I was looking for! The httpOnly cookie approach is much better.",
          author: "john_dev",
          createdAt: "30 minutes ago",
        },
        {
          id: 2,
          content: "Great explanation! One question: how do you handle CSRF attacks with this approach?",
          author: "curious_dev",
          createdAt: "20 minutes ago",
        },
      ],
    },
    {
      id: 2,
      content: `Another approach is to use a state management library like Redux Toolkit with RTK Query:

\`\`\`javascript
// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
\`\`\`

This gives you centralized state management for authentication across your app.`,
      author: {
        name: "redux_master",
        avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
        reputation: 2800,
        badges: ["Redux Expert"],
        joinDate: "1 year ago",
      },
      votes: 12,
      isAccepted: false,
      createdAt: "45 minutes ago",
      comments: [],
    },
  ];

  const handleVote = (type, targetType, targetId) => {
    console.log(`${type} vote for ${targetType} ${targetId}`);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (newAnswer.trim()) {
      console.log("New answer:", newAnswer);
      setNewAnswer("");
      setShowAnswerForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Question */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {question.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Asked {question.createdAt}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{question.views} views</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      question.difficulty === "beginner" ? "bg-green-100 text-green-800" :
                      question.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {question.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="flex items-start space-x-6">
                {/* Vote Section */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                  <button
                    onClick={() => handleVote("up", "question", question.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowUp className="h-6 w-6 text-gray-400 hover:text-green-600" />
                  </button>
                  <span className="text-xl font-bold text-gray-700">
                    {question.votes}
                  </span>
                  <button
                    onClick={() => handleVote("down", "question", question.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowDown className="h-6 w-6 text-gray-400 hover:text-red-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Bookmark className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="prose max-w-none mb-6">
                    <div className="whitespace-pre-wrap">{question.content}</div>
                  </div>

                  {/* Question Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                        <Flag className="h-4 w-4" />
                        <span>Flag</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center space-x-3">
                      <img
                        src={question.author.avatar}
                        alt={question.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {question.author.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {question.author.reputation} reputation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Answers Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {answers.length} Answer{answers.length !== 1 ? "s" : ""}
              </h2>

              <div className="space-y-6">
                {answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`bg-white rounded-lg shadow-md p-6 ${
                      answer.isAccepted ? "border-l-4 border-green-500" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-6">
                      {/* Vote Section */}
                      <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                        <button
                          onClick={() => handleVote("up", "answer", answer.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ArrowUp className="h-6 w-6 text-gray-400 hover:text-green-600" />
                        </button>
                        <span className="text-xl font-bold text-gray-700">
                          {answer.votes}
                        </span>
                        <button
                          onClick={() => handleVote("down", "answer", answer.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ArrowDown className="h-6 w-6 text-gray-400 hover:text-red-600" />
                        </button>
                        {answer.isAccepted && (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        )}
                      </div>

                      {/* Answer Content */}
                      <div className="flex-1">
                        <div className="prose max-w-none mb-6">
                          <div className="whitespace-pre-wrap">{answer.content}</div>
                        </div>

                        {/* Answer Actions */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                              <Flag className="h-4 w-4" />
                              <span>Flag</span>
                            </button>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center space-x-3">
                            <img
                              src={answer.author.avatar}
                              alt={answer.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {answer.author.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {answer.author.reputation} reputation
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Comments */}
                        {answer.comments.length > 0 && (
                          <div className="border-t border-gray-200 pt-4">
                            <div className="space-y-3">
                              {answer.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start space-x-3">
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-700">
                                      {comment.content}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {comment.author} • {comment.createdAt}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-700 mt-3">
                              Add a comment
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Answer Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Answer
              </h3>
              
              <form onSubmit={handleSubmitAnswer}>
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={8}
                  placeholder="Write your answer here... Use markdown for formatting."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                />
                
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Post Answer
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="space-y-6">
              {/* Question Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Question Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Asked</span>
                    <span className="font-medium">{question.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium">{question.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Votes</span>
                    <span className="font-medium">{question.votes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Answers</span>
                    <span className="font-medium">{answers.length}</span>
                  </div>
                </div>
              </div>

              {/* Related Questions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Questions
                </h3>
                <div className="space-y-3">
                  {[
                    "How to secure JWT tokens in React?",
                    "Best practices for React authentication",
                    "JWT vs Session authentication",
                    "React Router protected routes",
                  ].map((title, index) => (
                    <Link
                      key={index}
                      to={`/questions/${index + 2}`}
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Hot Network Questions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Hot Network Questions
                </h3>
                <div className="space-y-3">
                  {[
                    "Why is React so popular?",
                    "Node.js vs Python for backend",
                    "CSS Grid vs Flexbox comparison",
                    "TypeScript benefits explained",
                  ].map((title, index) => (
                    <Link
                      key={index}
                      to={`/questions/${index + 10}`}
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;