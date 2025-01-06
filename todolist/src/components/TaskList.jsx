import React, { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function TaskList() {
  const [tasksByCategory, setTasksByCategory] = useState({
    Started: [],
    Important: [],
    Assigned: [],
    Upcoming: [],
  });

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      console.error("User not logged in.");
      return;
    }

    const categories = ["Started", "Important", "Assigned", "Upcoming"];
    const unsubscribeList = [];

    // Fetch tasks for each category
    categories.forEach((category) => {
      const q = query(
        collection(db, "users", user.uid, "tasks"),
        where("category", "==", category)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasksByCategory((prev) => ({
          ...prev,
          [category]: tasks,
        }));
      });

      unsubscribeList.push(unsubscribe);
    });

    return () => {
      // Unsubscribe from all listeners
      unsubscribeList.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      {Object.keys(tasksByCategory).map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-xl font-bold mb-2">{category}</h3>
          <ul>
            {tasksByCategory[category].length > 0 ? (
              tasksByCategory[category].map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center p-2 mb-2 bg-gray-700 rounded"
                >
                  <span className={task.isCompleted ? "line-through" : ""}>
                    {task.name}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No tasks in this category.</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
