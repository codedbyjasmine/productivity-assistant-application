import { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";
import styles from './TodosList.module.css';
import EditTodo from "./EditTodo";

const TodosList = () => {
  const { todos, removeTodo, updateStatus, updateTodo, editingTodoId, setEditingTodoId } = useContext(TodoContext);
    const [Show, setShow] = useState(false);

    return (
        <>
            <div className={styles.TodoList}>
                <h2>Todo List</h2>
                <ul>
                    {todos.filter (todo => todo.status !== "Completed") .map((todo) => (
                        <li key={todo.id}>
                        <input type="checkbox" checked={todo.status === "Completed"} onChange={() => updateStatus(todo.id, todo.status === "Completed" ? "Pending" : "Completed")} />
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Status: {todo.status}</p>
                        <p>Estimated Time: {todo.estimatedTime}</p>
                        <p>Category: {todo.category}</p>
                        <p>Deadline: {todo.deadline}</p>
                        <button className={styles.EditBtn} onClick={() => {setShow(true); setEditingTodoId(todo.id)}}>Edit</button>
                        <button className={styles.RemoveBtn} onClick={() => {removeTodo(todo.id)}}>Remove</button>
                        </li>
                    ))}
                </ul>
                {Show && <EditTodo/>}
            </div>
        <div className={styles.completed}>
            <h2>Completed Todos</h2>
            <ul className={styles.completedList}>
                {todos.filter (todo => todo.status === "Completed") .map((todo) => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.status === "Completed"} onChange={() => updateStatus(todo.id, todo.status === "Completed" ? "Pending" : "Completed")} />
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Status: {todo.status}</p>
                        <p>Estimated Time: {todo.estimatedTime}</p>
                        <p>Category: {todo.category}</p>
                        <p>Deadline: {todo.deadline}</p>
                        <button className={styles.RemoveBtn} onClick={() => {removeTodo(todo.id)}}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}
export default TodosList;