import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings,
  BarChart3,
  Bell,
  Plus,
  Search
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Questions', path: '/questions' },
    { name: 'Community', path: '/community' },
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
      case 'developer':
        return 'bg-blue-500';
      case 'student':
        return 'bg-green-500';
      case 'enthusiast':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              Stack<span className="text-blue-600">It</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* Ask Question Button */}
                <Link
                  to="/ask"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ask Question
                </Link>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
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
                        {user?.role || 'Member'}
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
                          {user?.role}
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

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <BarChart3 className="h-4 w-4 mr-3" />
                        My Activity
                      </Link>

                      <Link
                        to="/profile"
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
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
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
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
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
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
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
                    to="/ask"
                    className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mx-3 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Ask Question
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
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
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mx-3 text-center"
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
  );
};

export default Navbar;