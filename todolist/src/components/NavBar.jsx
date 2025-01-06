import { useState } from 'react';
import { FaSun, FaMoon, FaUserCircle, FaSearch, FaRobot, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Logo from '../context/logo.png';  // Ensure the path to the logo file is correct

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search bar toggle

  // Toggle the search bar
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <nav className="p-4 flex justify-between items-center bg-card-light dark:bg-card-dark shadow-light dark:shadow-dark relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src={Logo} alt="TaskFlow Logo" className="h-12 w-auto" /> {/* Logo size increased */}
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <button
          onClick={toggleSearch}
          className="p-2 text-primary-light dark:text-primary-dark bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-blue-500 dark:hover:bg-blue-400 transition-all"
        >
          <FaSearch />
        </button>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-11/12 md:w-96 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-10">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button
                onClick={toggleSearch}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* AI Bot Icon */}
        <button
          className="p-2 text-primary-light dark:text-primary-dark bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-blue-500 dark:hover:bg-blue-400 transition-all"
        >
          <FaRobot />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-primary-light dark:text-primary-dark bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-blue-500 dark:hover:bg-blue-400 transition-all"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>

        {/* Profile Button */}
        <Link
          to="/profile"
          className="flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          <FaUserCircle size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
