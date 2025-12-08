import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

const TodosList = () => {
  const { todos, removeTodo, updateStatus } = useContext(TodoContext);

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={todo.status === "Completed"} onChange={() => updateStatus(todo.id, todo.status === "Completed" ? "Pending" : "Completed")} />
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Status: {todo.status}</p>
                        <p>Estimated Time: {todo.estimatedTime}</p>
                        <p>Category: {todo.category}</p>
                        <p>Deadline: {todo.deadline}</p>
                        <button style={{background:"red"}} onClick={() => {removeTodo(todo.id)}}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TodosList;