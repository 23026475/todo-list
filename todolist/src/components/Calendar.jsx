import React, { useState } from "react";

const Calendar = ({ isExpanded, toggleExpansion }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const [view, setView] = useState("weekly");

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Function to get the current month's full or abbreviated name
  const currentMonth = () =>
    isExpanded
      ? today.toLocaleString("default", { month: "long" }) // Full month name
      : today.toLocaleString("default", { month: "short" }); // Abbreviated month name

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    start.setDate(start.getDate() + diff);
    return start;
  };

  const getWeekDates = (startDate) => {
    const dates = [];
    const startOfWeek = getStartOfWeek(startDate);
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getMonthDates = (year, month) => {
    const dates = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    for (let i = 0; i < startDay; i++) {
      dates.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      dates.push(new Date(year, month, day));
    }

    return dates;
  };

  const isToday = (date) =>
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isWeekend = (date) =>
    date && (date.getDay() === 0 || date.getDay() === 6);

  const renderWeeklyView = () => {
    const weekDates = getWeekDates(today); // Full week
  
    return (
      <div className="overflow-x-auto">
        <table
          className={`table-auto ${
            isExpanded ? "w-[100%]" : "min-w-[600px]"
          } mx-auto border-collapse text-xs md:text-sm`}
        >
          <thead>
            <tr>
              {weekdays.map((day, index) => (
                <th
                  key={index}
                  className="text-center text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 p-1 border-b border-gray-300 dark:border-gray-700"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDates.map((date, index) => (
                <td
                  key={index}
                  className={`h-40 text-center text-xs md:text-sm font-medium border border-gray-300 dark:border-gray-700 ${
                    isWeekend(date)
                      ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                      : "bg-gray-50 dark:bg-gray-700"
                  } ${
                    isToday(date)
                      ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 font-bold"
                      : ""
                  }`}
                >
                  {date && (
                    <div>
                      <span className="block">{date.getDate()}</span>
                      <span className="block text-gray-500 dark:text-gray-400 text-xs">
                        {date.toLocaleString("default", { weekday: "short" })}
                      </span>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  
  const renderMonthlyView = () => {
    const monthDates = getMonthDates(currentYear, today.getMonth());
    const rows = [];
    const daysInWeek = 7;
  
    for (let i = 0; i < monthDates.length; i += daysInWeek) {
      rows.push(monthDates.slice(i, i + daysInWeek));
    }
  
    return (
      <table
        className={`table-auto ${
          isExpanded ? "w-[85%]" : "w-[50%]"
        } mx-auto border-collapse text-xs md:text-sm`}
      >
        <thead>
          <tr>
            {weekdays.map((day, index) => (
              <th
                key={index}
                className="text-center text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 p-1 border-b border-gray-300 dark:border-gray-700"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((week, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                week.some((date) => isToday(date))
                  ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 font-bold"
                  : ""
              }`}
            >
              {week.map((date, colIndex) => (
                <td
                  key={colIndex}
                  className={`h-10 text-center text-xs md:text-sm font-medium border border-gray-300 dark:border-gray-700 ${
                    date
                      ? isWeekend(date)
                        ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                        : "bg-gray-50 dark:bg-gray-700"
                      : "bg-transparent"
                  }`}
                >
                  {date && (
                    <div>
                      <span className="block">{date.getDate()}</span>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  

  return (
    <div
      className={`relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ${
        isExpanded ? "md:w-[100%]" : "md:w-[95%]"
      } transition-all duration-300 mx-auto`}
    >
      <div className="flex justify-between items-center mb-4 text-xs md:text-sm">
        <button
          onClick={toggleExpansion}
          className="bg-blue-500 text-white p-1 md:p-2 rounded-lg shadow-md hover:bg-blue-600 transition-all text-xs"
        >
          {isExpanded ? "-" : "+"}
        </button>
        <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 text-center flex-1">
          {currentMonth()}
        </h2>
        <button
          onClick={() => setView(view === "weekly" ? "monthly" : "weekly")}
          className="px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all text-xs"
        >
          {view === "weekly" ? "Monthly View" : "Weekly View"}
        </button>
      </div>
      <div className="overflow-auto max-w-full">
        {view === "weekly" ? renderWeeklyView() : renderMonthlyView()}
      </div>
    </div>
  );
};

export default Calendar;
