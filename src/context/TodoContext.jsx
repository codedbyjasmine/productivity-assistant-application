import { createContext, useContext, useState } from "react";
import { AuthContext } from "./Context";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const todos = currentUser?.todos || [];
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("StatusAsc");

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

  const overviewTodos = () => {  
    return todos.filter(todo => todo.status === "Pending").slice(-3).reverse();
  };

  return (
    <TodoContext.Provider value={{ editingTodoId, setEditingTodoId, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter, sortOption, setSortOption, getFilteredAndSortedTodos, overviewTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;