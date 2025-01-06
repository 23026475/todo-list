import React, { useState } from "react";
import { auth, db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTask() {
  const [isExpanded, setIsExpanded] = useState(false); // Tracks form state
  const [taskName, setTaskName] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const categoryOptions = ["Started", "Important", "Assigned", "Upcoming"];

  const handleCategoryChange = (category) => {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleAddTask = async () => {
    if (taskName.trim() === "") {
      setError("Task name cannot be empty.");
      return;
    }

    if (categories.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("User not logged in.");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "tasks"), {
        name: taskName,
        categories: categories,
        description: description.trim() || null,
        isCompleted: false,
        createdAt: Timestamp.now(),
      });

      setTaskName("");
      setCategories([]);
      setDescription("");
      setError("");
      alert("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error.message);
      setError("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded relative">
      {/* Collapsed State */}
      {!isExpanded && (
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Add a task..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 text-black rounded"
          />
          <button
            onClick={() => setIsExpanded(true)}
            className="ml-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            +
          </button>
        </div>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div>
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
          >
            -
          </button>

          {/* Task Name */}
          <input
            type="text"
            placeholder="Enter task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 mb-2 text-black rounded"
          />

          {/* Categories */}
          <div className="mb-4">
            <p className="font-bold mb-2">Select Categories:</p>
            {categoryOptions.map((category) => (
              <label key={category} className="block mb-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>

          {/* Description */}
          <textarea
            placeholder="Add an optional description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 text-black rounded"
            rows="4"
          ></textarea>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={handleAddTask}
            className="bg-blue-600 py-2 px-4 rounded text-white hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTask;
