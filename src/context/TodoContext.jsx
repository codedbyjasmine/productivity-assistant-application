import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [editingTodoId, setEditingTodoId] = useState(null);

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

  const updateStatus = (id, newStatus) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, status: newStatus } : todo));
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateStatus, removeTodo, updateTodo, editingTodoId, setEditingTodoId }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;