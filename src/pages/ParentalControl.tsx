import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Clock,
  BarChart3,
  Eye,
  Settings,
  Trophy,
  BookOpen,
  AlertCircle,
} from "lucide-react";

const ParentalControl = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const studentData = {
    name: "Alex Johnson",
    grade: "8th Grade",
    subjects: ["Science", "Mathematics", "Social Science", "English"],
    weeklyProgress: [
      { day: "Mon", hours: 2.5 },
      { day: "Tue", hours: 1.8 },
      { day: "Wed", hours: 3.2 },
      { day: "Thu", hours: 2.0 },
      { day: "Fri", hours: 2.8 },
      { day: "Sat", hours: 3.5 },
      { day: "Sun", hours: 1.5 },
    ],
    recentActivities: [
      {
        subject: "Mathematics",
        activity: "Completed Quiz: Quadratic Equations",
        time: "2 hours ago",
        score: 95,
      },
      {
        subject: "Science",
        activity: "Watched Video: Photosynthesis",
        time: "4 hours ago",
        score: null,
      },
      {
        subject: "English",
        activity: "Submitted Assignment: Creative Writing",
        time: "1 day ago",
        score: 88,
      },
      {
        subject: "Social Science",
        activity: "Completed Chapter: Ancient Civilizations",
        time: "2 days ago",
        score: 92,
      },
    ],
    currentStreak: 15,
    totalHours: 45.2,
    averageScore: 91,
  };

  const timeSettings = {
    dailyLimit: 3,
    breakReminder: 30,
    bedtimeRestriction: "21:00",
    weekendBonus: 1,
  };

  const contentSettings = {
    allowedSubjects: ["Science", "Mathematics", "Social Science", "English"],
    communityAccess: true,
    gamingTime: 1,
  };

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    { id: "time", label: "Time Controls", icon: <Clock className="h-5 w-5" /> },
    {
      id: "content",
      label: "Content Filters",
      icon: <Shield className="h-5 w-5" />,
    },
    { id: "reports", label: "Reports", icon: <Eye className="h-5 w-5" /> },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-lg mb-6">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <ArrowRight className="h-5 w-5" />
            <span>Parental Control</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Parental Control
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitor your child's learning progress, set time limits, and ensure
            a safe educational environment
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Progress Tracking",
                description: "Monitor learning progress and achievements",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Time Management",
                description: "Set daily limits and break reminders",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Content Safety",
                description: "Filter and control accessible content",
              },
              {
                icon: <Eye className="h-8 w-8" />,
                title: "Activity Reports",
                description: "Detailed reports on learning activities",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
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
          {activeTab === "dashboard" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Learning Dashboard
                </h2>
                <p className="text-lg text-gray-600">
                  Overview of {studentData.name}'s learning progress
                </p>
              </div>
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Study Streak</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {studentData.currentStreak} days
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-orange-600 self-end" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Hours</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {studentData.totalHours}h
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600 self-end" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-green-600">
                      {studentData.averageScore}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600 self-end" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Subjects</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {studentData.subjects.length}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-purple-600 self-end" />
                </div>
              </div>
              {/* Weekly Progress Chart */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Weekly Study Hours
                </h3>
                <div className="flex items-end space-x-4 h-40">
                  {studentData.weeklyProgress.map((day, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${(day.hours / 4) * 100}%` }}
                      ></div>
                      <div className="mt-2 text-sm text-gray-600">
                        {day.day}
                      </div>
                      <div className="text-xs text-gray-500">{day.hours}h</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Recent Activities
                </h3>
                <div className="space-y-4">
                  {studentData.recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {activity.subject}
                          </span>
                          <span className="text-sm text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-gray-900 font-medium mt-1">
                          {activity.activity}
                        </p>
                      </div>
                      {activity.score && (
                        <div className="text-right">
                          <span className="text-lg font-bold text-green-600">
                            {activity.score}%
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "time" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Time Controls
                </h2>
                <p className="text-lg text-gray-600">
                  Manage screen time and study schedules
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Daily Limits
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label
                        className="text-gray-700"
                        htmlFor="daily-study-limit"
                      >
                        Daily Study Limit
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="daily-study-limit"
                          type="range"
                          min="1"
                          max="6"
                          value={timeSettings.dailyLimit}
                          className="w-24"
                          title="Daily Study Limit"
                          aria-label="Daily Study Limit"
                          readOnly
                        />
                        <span className="text-sm font-medium">
                          {timeSettings.dailyLimit}h
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-700" htmlFor="break-reminder">
                        Break Reminder (minutes)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="break-reminder"
                          type="range"
                          min="15"
                          max="60"
                          step="15"
                          value={timeSettings.breakReminder}
                          className="w-24"
                          title="Break Reminder"
                          aria-label="Break Reminder"
                          readOnly
                        />
                        <span className="text-sm font-medium">
                          {timeSettings.breakReminder}m
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-700" htmlFor="weekend-bonus">
                        Weekend Bonus
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="weekend-bonus"
                          type="range"
                          min="0"
                          max="3"
                          value={timeSettings.weekendBonus}
                          className="w-24"
                          title="Weekend Bonus"
                          aria-label="Weekend Bonus"
                          readOnly
                        />
                        <span className="text-sm font-medium">
                          {timeSettings.weekendBonus}h
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label
                        className="text-gray-700"
                        htmlFor="bedtime-restriction"
                      >
                        Bedtime Restriction
                      </label>
                      <input
                        id="bedtime-restriction"
                        type="time"
                        value={timeSettings.bedtimeRestriction}
                        className="w-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        title="Bedtime Restriction"
                        aria-label="Bedtime Restriction"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Schedule Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="schedule-bedtime-restriction"
                      >
                        Bedtime Restriction
                      </label>
                      <input
                        id="schedule-bedtime-restriction"
                        type="time"
                        value={timeSettings.bedtimeRestriction}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        title="Bedtime Restriction"
                        aria-label="Bedtime Restriction"
                        placeholder="Set bedtime"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Study Days
                      </label>
                      <div className="grid grid-cols-7 gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <button
                              key={day}
                              className="p-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                            >
                              {day}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                      Time Management Tips
                    </h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>
                        • Regular breaks help maintain focus and prevent eye
                        strain
                      </li>
                      <li>
                        • Consistent study schedules improve learning retention
                      </li>
                      <li>
                        • Weekend flexibility can motivate weekday compliance
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Content Filters
                </h2>
                <p className="text-lg text-gray-600">
                  Control what content your child can access
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Subject Access
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Science",
                      "Mathematics",
                      "Social Science",
                      "English",
                      "Computer Science",
                      "Art & Craft",
                    ].map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{subject}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={contentSettings.allowedSubjects.includes(
                              subject
                            )}
                            title={`Allow access to ${subject}`}
                            aria-label={`Allow access to ${subject}`}
                            readOnly
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Feature Controls
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-700 font-medium">
                          Community Access
                        </span>
                        <p className="text-sm text-gray-500">
                          Allow participation in discussions and groups
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={contentSettings.communityAccess}
                          title="Community Access"
                          aria-label="Community Access"
                          readOnly
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Daily Gaming Time
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.5"
                          value={contentSettings.gamingTime}
                          className="flex-1"
                          title="Daily Gaming Time"
                          aria-label="Daily Gaming Time"
                          readOnly
                        />
                        <span className="text-sm font-medium">
                          {contentSettings.gamingTime}h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Learning Reports
                </h2>
                <p className="text-lg text-gray-600">
                  Detailed insights into your child's learning journey
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    This Week
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Study Hours</span>
                      <span className="font-medium">17.3h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lessons Completed</span>
                      <span className="font-medium">20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quizzes Taken</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-medium text-green-600">91%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    This Month
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Study Hours</span>
                      <span className="font-medium">68.5h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lessons Completed</span>
                      <span className="font-medium">75</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quizzes Taken</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-medium text-green-600">89%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    All Time
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Study Hours</span>
                      <span className="font-medium">245.2h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lessons Completed</span>
                      <span className="font-medium">312</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quizzes Taken</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-medium text-green-600">88%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Subject Performance
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      subject: "Mathematics",
                      progress: 92,
                      color: "bg-blue-500",
                    },
                    {
                      subject: "Science",
                      progress: 88,
                      color: "bg-purple-500",
                    },
                    {
                      subject: "English",
                      progress: 85,
                      color: "bg-orange-500",
                    },
                    {
                      subject: "Social Science",
                      progress: 90,
                      color: "bg-green-500",
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">
                          {item.subject}
                        </span>
                        <span className="text-gray-600">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Settings
                </h2>
                <p className="text-lg text-gray-600">
                  Configure parental control preferences
                </p>
              </div>
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">
                        Daily Progress Reports
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                          readOnly
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">
                        Achievement Notifications
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                          readOnly
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Account Management
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Parent Email
                      </label>
                      <input
                        type="email"
                        value="parent@example.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        title="Parent Email"
                        aria-label="Parent Email"
                        placeholder="Enter parent email"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Child's Name
                      </label>
                      <input
                        type="text"
                        value={studentData.name}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        title="Child's Name"
                        aria-label="Child's Name"
                        placeholder="Enter child's name"
                        readOnly
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="grade-level"
                      >
                        Grade Level
                      </label>
                      <select
                        id="grade-level"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        title="Grade Level"
                        aria-label="Grade Level"
                        defaultValue={studentData.grade}
                        disabled
                      >
                        <option>6th Grade</option>
                        <option>7th Grade</option>
                        <option>8th Grade</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    Cancel
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Save Changes
                  </button>
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
            Ensure Safe & Productive Learning
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Take control of your child's digital learning experience with
            comprehensive parental controls
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subjects"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Get Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentalControl;
