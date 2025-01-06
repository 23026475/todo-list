import React from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function TaskManager() {
  return (
    <div className="p-6 bg-gray-900 text-white rounded">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      {/* Task List */}
      <TaskList />
      {/* Render AddTask only once */}
      <AddTask />

      
    </div>
  );
}

export default TaskManager;
