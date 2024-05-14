/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const TodoListManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, priority: false },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleTaskPriority = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, priority: !task.priority };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ fontWeight: task.priority ? "bold" : "normal" }}>
            <input
              type="checkbox"
              id="input"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => toggleTaskPriority(task.id)}>
              {task.priority ? "Normal Priority" : "High Priority"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const toggleTaskPriority = () => {};

export { toggleTaskPriority, TodoListManager as default };
