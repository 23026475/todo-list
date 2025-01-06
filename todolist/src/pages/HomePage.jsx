import { useState } from "react";
import Navbar from "../components/NavBar";  // Adjust the path if necessary
import Calendar from "../components/Calendar";  // Adjust the path if necessary
import LeftPanel from "../components/LeftPanel";  // Adjust the path if necessary
import TaskManager from "../components/TaskManager";

const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false); // Calendar expand state

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Toggle calendar expansion
  const toggleCalendarExpansion = () => {
    setIsCalendarExpanded((prev) => !prev);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar toggleMobileMenu={toggleMobileMenu} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6">
        {/* Left Sidebar */}
        <LeftPanel
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          className="lg:w-1/4"
        />

        {/* Middle Section */}
        <div
          className={`flex flex-col justify-center items-center lg:items-start lg:px-8 ${
            isCalendarExpanded ? "lg:w-1/4" : "lg:w-1/2"
          } transition-all duration-300`}
        >
          <TaskManager/>
         
        </div>

        {/* Calendar Section */}
        <div
          className={`transition-all duration-300 lg:max-w-screen-lg ${
            isCalendarExpanded ? "lg:w-3/4" : "lg:w-1/4"
          } min-w-[300px]`}
        >
          <Calendar
            isExpanded={isCalendarExpanded}
            toggleExpansion={toggleCalendarExpansion}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
