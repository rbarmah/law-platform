import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Trophy, User, Home, Award, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/categories', label: 'Study', icon: <BookOpen size={20} /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={20} /> },
    { to: '/achievements', label: 'Achievements', icon: <Award size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white relative">
                <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-sm"></div>
                <span className="text-lg font-bold">M</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">Masterie</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-teal-600'
                    : 'text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 font-medium transition-colors duration-200"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-slate-800 shadow-lg"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-3 py-3 px-4 rounded-lg ${
                  location.pathname === link.to
                    ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                onClick={closeMenu}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={() => {
                handleSignOut();
                closeMenu();
              }}
              className="flex items-center space-x-3 py-3 px-4 rounded-lg w-full text-left text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navigation;