import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  User, 
  LogOut, 
  Settings,
  BarChart3,
  Bell
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'SUBJECTS', path: '/subjects' },
    { name: 'FACULTY & MATERIALS', path: '/study-materials' },
    { name: 'GAMES & QUIZ', path: '/games-quiz', hasDropdown: true },
    { name: 'COMMUNITY', path: '/community' },
    { name: 'PARENTAL CONTROL', path: '/parental-control' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsUserDropdownOpen(false);
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-learnkins-orange-500';
      case 'teacher':
        return 'bg-learnkins-purple-500';
      case 'parent':
        return 'bg-learnkins-green-500';
      case 'student':
        return 'bg-learnkins-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-slate-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex space-x-4">
            <span>Follow us on:</span>
            <div className="flex space-x-2">
              <a href="#" className="hover:text-learnkins-blue-400 transition-colors">Facebook</a>
              <a href="#" className="hover:text-learnkins-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-learnkins-blue-400 transition-colors">Instagram</a>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+91-7878888924</span>
            </div>
            <span>www.learnkins.com</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/Screenshot 2025-07-01 135146.png" 
                alt="LearnKins" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsGamesDropdownOpen(true)}
                      onMouseLeave={() => setIsGamesDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                          isActive(item.path)
                            ? 'text-learnkins-blue-600 border-b-2 border-learnkins-blue-600'
                            : 'text-gray-700 hover:text-learnkins-blue-600'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={16} />
                      </button>
                      {isGamesDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                          <Link
                            to="/games-quiz"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-learnkins-blue-50 hover:text-learnkins-blue-600"
                          >
                            Interactive Games
                          </Link>
                          <Link
                            to="/games-quiz"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-learnkins-blue-50 hover:text-learnkins-blue-600"
                          >
                            Subject Quizzes
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'text-learnkins-blue-600 border-b-2 border-learnkins-blue-600'
                          : 'text-gray-700 hover:text-learnkins-blue-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-learnkins-blue-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-learnkins-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-8 h-8 ${getRoleColor(user?.role || '')} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                        {user?.name ? getUserInitials(user.name) : 'U'}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {user?.name || 'User'}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {user?.role || 'Student'}
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <div className="text-sm font-medium text-gray-900">
                            {user?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user?.email}
                          </div>
                          <div className="text-xs text-gray-400 capitalize mt-1">
                            {user?.role} {user?.grade && `• ${user.grade}`}
                          </div>
                        </div>

                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </Link>

                        {user?.role === 'student' && (
                          <Link
                            to="/progress"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <BarChart3 className="h-4 w-4 mr-3" />
                            My Progress
                          </Link>
                        )}

                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Link>

                        <div className="border-t border-gray-200 my-1"></div>

                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-learnkins-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-learnkins-gradient text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              {isAuthenticated && (
                <div className={`w-8 h-8 ${getRoleColor(user?.role || '')} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                  {user?.name ? getUserInitials(user.name) : 'U'}
                </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-learnkins-blue-600 focus:outline-none focus:text-learnkins-blue-600"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-learnkins-blue-600 bg-learnkins-blue-50'
                      : 'text-gray-700 hover:text-learnkins-blue-600 hover:bg-learnkins-blue-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <div className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user?.email}
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-learnkins-blue-600 hover:bg-learnkins-blue-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-learnkins-blue-600 hover:bg-learnkins-blue-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 text-base font-medium bg-learnkins-gradient text-white rounded-lg hover:opacity-90 mx-3"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;