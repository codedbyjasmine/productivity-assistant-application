import { useContext, useState } from "react";
import { TodoContext } from "../../../context/TodoContext";
import styles from './TodosList.module.css';
import EditTodo from "../EditTodo/EditTodo";
import FilterTodo from "../FilterTodo/FilterTodo";
import SortTodo from "../SortTodo/SortTodo";

const TodosList = () => {
  const { removeTodo, updateStatus, setEditingTodoId, getFilteredAndSortedTodos } = useContext(TodoContext);
    const [Show, setShow] = useState(false);
    const visibleTodos = getFilteredAndSortedTodos();

    return (
        <>
        <div className="FilterAndSorting"><SortTodo /><FilterTodo /></div>
            <div className={styles.TodoList}>
                <h2>Todo List</h2>
                <ul>
                    {visibleTodos.filter (todo => todo.status !== "Completed") .map((todo) => (
                        <li key={todo.id}>
                        <input type="checkbox" checked={todo.status === "Completed"} onChange={() => updateStatus(todo.id)} />
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
                {visibleTodos.filter (todo => todo.status === "Completed") .map((todo) => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.status === "Completed"} onChange={() => updateStatus(todo.id)} />
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