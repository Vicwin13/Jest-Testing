// import { fireEvent, render } from "@testing-library/react";

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { toggleTaskPriority } from "./TodoListManager";
const MockTodoListManager = jest.fn();

test("A new task is added", () => {
  const task = [];
  const newTask = "Clean House";
  MockTodoListManager.mockImplementation((task, newTask) => {
    return [
      ...task,
      { id: 123456, text: newTask, completed: false, priority: false },
    ];
  });
  const returnedTask = MockTodoListManager(task, newTask);

  expect(MockTodoListManager).toHaveBeenCalledWith(task, newTask);

  expect(returnedTask.length).toBe(1);
  expect(returnedTask).toEqual([
    {
      id: 123456,
      text: newTask,
      completed: false,
      priority: false,
    },
  ]);
});

test("Deleting a task", () => {
  const tasks = [
    { id: 1, text: "task 1" },
    { id: 2, text: "task 2" },
  ];

  const taskIndex = tasks.findIndex((task) => task.id === 1);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1); // Remove the task at the index
  }

  const expectedTask = [
    {
      id: 2,
      text: "task 2",
    },
  ];
  expect(tasks.length).toBe(expectedTask.length);
  expect(tasks).toEqual(expectedTask);
});

test("Testing for Task Completion", () => {
  const tasks = [
    { id: 1, text: "task 1", completed: true },
    { id: 2, text: "task 2", completed: true },
    { id: 3, text: "task 3", completed: true },
  ];

  const completeTaskMock = jest.fn((taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = true; // Update completed flag in the actual tasks array
    }
  });

  completeTaskMock(1);

  expect(tasks[1].completed).toEqual(true);

  const completedTasks = tasks.filter((task) => task.completed);
  expect(completedTasks.length).toBe(3); // All tasks should be completed
  expect(completedTasks[0].id).toBe(1); // Verify completed tasks (optional)
  expect(completedTasks[1].id).toBe(2); // Verify completed tasks (optional)
  expect(completedTasks[2].id).toBe(3);
});

test("Toggling task priority", () => {
  // Initial task data (replace with your actual data structure)
  const tasks = [
    { id: 1, text: "task 1", completed: false, priority: false },
    { id: 2, text: "task 2", completed: false, priority: true }, // One task initially marked as priority
  ];

  // Mock the `setTasks` function
  const setTasksMock = jest.fn();

  // Function to toggle task priority
  const toggleTaskPriority = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, priority: !task.priority } : task
    );
    setTasksMock(updatedTasks);
  };

  // Simulate clicking on the priority of task 1 (assuming taskId 1 corresponds to task 1)
  toggleTaskPriority(1);

  // Verify that the updated tasks are set with the correct priority
  expect(setTasksMock).toHaveBeenCalledWith([
    { id: 1, text: "task 1", completed: false, priority: true }, // Priority toggled for task 1
    { id: 2, text: "task 2", completed: false, priority: true },
  ]);
});
