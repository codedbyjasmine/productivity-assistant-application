import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("DeadlineAsc");

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
        filteredTodos.sort((a, b) => b.estimatedTime.localeCompare(a.estimatedTime));
        break;
      case "TimeEstimateDesc":
        filteredTodos.sort((a, b) => a.estimatedTime.localeCompare(b.estimatedTime));
        break;
      case "StatusAsc":
        filteredTodos.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case "StatusDesc":
        filteredTodos.sort((a, b) => b.status.localeCompare(a.status));
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