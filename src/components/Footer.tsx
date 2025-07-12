import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Questions', path: '/questions' },
      { name: 'Ask Question', path: '/ask' },
      { name: 'Community', path: '/community' },
      { name: 'Tags', path: '/tags' }
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Guidelines', path: '/guidelines' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ],
    developers: [
      { name: 'API Documentation', path: '/api' },
      { name: 'GitHub', href: 'https://github.com' },
      { name: 'Stack Overflow', href: 'https://stackoverflow.com' },
      { name: 'Developer Tools', path: '/tools' }
    ]
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: '#', name: 'GitHub' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', name: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', name: 'LinkedIn' },
    { icon: <Mail className="h-5 w-5" />, href: 'mailto:hello@stackit.com', name: 'Email' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold">
                Stack<span className="text-blue-400">It</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A minimal Q&A forum platform where developers, students, and enthusiasts come together to ask questions, share knowledge, and build community.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-blue-400">12.5K+</div>
                <div className="text-sm text-gray-400">Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">3.2K+</div>
                <div className="text-sm text-gray-400">Users</div>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Developers</h3>
            <ul className="space-y-2">
              {footerLinks.developers.map((link, index) => (
                <li key={index}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Stay in the loop</h3>
              <p className="text-gray-300">
                Get the latest updates on new features, community highlights, and developer resources.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm flex items-center">
              © {currentYear} StackIt. Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for the developer community.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Connect with us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;