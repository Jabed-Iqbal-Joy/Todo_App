import { nanoid } from "nanoid";
import React, { createContext, useReducer } from "react";

export const TasksContext = createContext();

function task_reducer(state, action) {
  switch (action.type) {
    case "CREATE_TASK":
      return [
        ...state,
        {
          id: nanoid(),
          title: action.title,
          notes: "",
          subTasks: [],
          tags: [],
          date: new Date(),
          deadline: null,
        },
      ];
    case "UPDATE_TASK":
      return state.map((task) => {
        if (task.id === action.id) {
          const change = {};

          if (action.title) change.title = action.title;
          if (action.notes) change.notes = action.notes;
          if (action.date) change.date = action.date;
          if (action.deadline) change.deadline = action.deadline;

          return { ...task, ...change };
        }
        return task;
      });
    case "ADD_SUBTASK":
      return state.map((task) => {
        if (task.id === action.id) {
          const newSubTasks = [
            ...task.subTasks,
            { id: nanoid(), value: action.value, isCompleted: false },
          ];
          return {
            ...task,
            subTasks: newSubTasks,
          };
        }
        return task;
      });
    case "UPDATE_SUBTASK":
      return state.map((task) => {
        if (task.id === action.id) {
          const changes = {};

          if (action.value) changes.value = action.value;
          if (action.isCompleted !== undefined)
            changes.isCompleted = action.isCompleted;

          const newSubTasks = task.subTasks.map((subTask) => {
            if (subTask.id === action.subTaskId) {
              return {
                ...subTask,
                ...changes,
              };
            }
            return subTask;
          });

          return {
            ...task,
            subTasks: newSubTasks,
          };
        }
        return task;
      });

    case "DELETE_SUBTASK":
      return state.map((task) => {
        if (task.id === action.id) {
          const newSubTasks = task.subTasks.filter(
            (subTask) => subTask.id !== action.subTaskId
          );
          return {
            ...task,
            subTasks: newSubTasks,
          };
        }
        return task;
      });
    case "ADD_TAG":
      return state.map((todo) => {
        if (todo.id === action.id) {
          const newTags = [...todo.tags, { id: nanoid(), value: action.value }];
          return {
            ...todo,
            tags: newTags,
          };
        }
        return todo;
      });

    case "DELETE_TAG":
      return state.map((todo) => {
        if (todo.id === action.id) {
          const newTags = todo.tags.filter((tag) => tag.id !== action.tagId);
          return {
            ...todo,
            tags: newTags,
          };
        }
        return todo;
      });

    default:
      return state;
  }
}

export function TasksProvider({ children }) {
  var expandedTaskId = null;
  const set_expandedTask = (id) => {
    expandedTaskId = id;
  };
  const expandedTask = () => {
    return expandedTaskId;
  };
  const [tasks, dispatch] = useReducer(task_reducer, [
    {
      id: 1,
      title: "This is a task 1",
      notes: "",
      subTasks: [],
      tags: [],
      date: new Date(),
      deadline: null,
    },
    {
      id: 2,
      title: "This is a task 2",
      notes: "",
      subTasks: [],
      tags: [],
      date: new Date(),
      deadline: null,
    },
    {
      id: 3,
      title: "This is a task 3",
      notes: "",
      subTasks: [],
      tags: [],
      date: new Date(),
      deadline: null,
    },
  ]);

  const todayTasks = tasks.filter(({ date }) => {
    const todayDate = new Date();
    return (
      date.getFullYear() === todayDate.getFullYear() &&
      date.getMonth() === todayDate.getMonth() &&
      date.getDate() === todayDate.getDate()
    );
  });

  const value = {
    tasks,
    dispatch,
    todayTasks,
    expandedTaskId,
    set_expandedTask,
    expandedTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
