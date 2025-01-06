import { useState } from 'react';
import { FaBars, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LeftPanel = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const categories = [
    { name: 'Filter', icon: '🔍' },
    { name: 'Started', icon: '🚀' },
    { name: 'Important', icon: '⭐' },
    { name: 'Assigned', icon: '👤' },
    { name: 'Upcoming', icon: '📅' },
  ];

  const [isExpanded, setIsExpanded] = useState(true); // Toggle for larger screens

  // Handle expand/collapse toggle for larger screens
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } lg:block bg-card-light dark:bg-card-dark p-4 h-screen shadow-light dark:shadow-dark transition-transform transform ${
          isExpanded ? 'lg:w-1/4' : 'lg:w-20'
        } z-10`}
      >
        {/* Expand/Collapse Toggle for Larger Screens */}
        <div className="hidden lg:flex justify-end mb-4">
          <button
            onClick={toggleExpand}
            className="p-2 text-primary-light dark:text-primary-dark bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-blue-500 dark:hover:bg-blue-400 transition-all"
          >
            {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Navigation Items */}
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center gap-2 p-2 mb-4 rounded-lg hover:bg-primary hover:text-white cursor-pointer"
            >
              <span className="text-xl">{category.icon}</span>
              {isExpanded && <span>{category.name}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleMobileMenu}
        className="block lg:hidden p-3 text-white bg-primary rounded-full fixed top-20 left-4 z-20 shadow-lg"
      >
        <FaBars />
      </button>

      {/* Backdrop for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default LeftPanel;
