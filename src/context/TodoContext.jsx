import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("StatusAsc");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (user, title, description, status, estimatedTime, category, deadline) => {

    const newTodo = {
        id: Date.now(),
        user,
        title,
        description,
        status,
        estimatedTime,
        category,
        deadline
    };
    setTodos([...todos, newTodo]);
  };

  const updateStatus = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, status: todo.status === "Completed" ? "Pending" : "Completed" } : todo));
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo));
  };

  const getFilteredAndSortedTodos = () => {
    let filteredTodos = [...todos];
    const timeEstimateOrder = { "Minutes": 1, "Hours": 2, "Days": 3 };
    const statusOrder = { "Pending": 1, "Completed": 2 };

    if (statusFilter !== "All") {
      filteredTodos = filteredTodos.filter(todo => todo.status === statusFilter);
    }

    if (categoryFilter !== "All") {
      filteredTodos = filteredTodos.filter(todo => todo.category === categoryFilter);
    }

    switch (sortOption) {
      case "DeadlineAsc":
        filteredTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case "DeadlineDesc":
        filteredTodos.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        break;
      case "TimeEstimateAsc":
        filteredTodos.sort((a, b) => timeEstimateOrder[a.estimatedTime] - timeEstimateOrder[b.estimatedTime]);
        break;
      case "TimeEstimateDesc":
        filteredTodos.sort((a, b) => timeEstimateOrder[b.estimatedTime] - timeEstimateOrder[a.estimatedTime]);
        break;
      case "StatusAsc":
        filteredTodos.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
      case "StatusDesc":
        filteredTodos.sort((a, b) => statusOrder[b.status] - statusOrder[a.status]);
        break;
      default:
        break;
    }

    return filteredTodos;
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateStatus, removeTodo, updateTodo, editingTodoId, setEditingTodoId, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter, sortOption, setSortOption, getFilteredAndSortedTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;