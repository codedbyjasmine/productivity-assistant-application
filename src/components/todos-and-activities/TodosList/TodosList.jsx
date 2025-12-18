import { useContext, useState } from "react";
import { TodoContext } from "../../../context/TodoContext";
import { AuthContext } from "../../../context/Context";
import styles from './TodosList.module.css';
import EditTodo from "../EditTodo/EditTodo";
import FilterTodo from "../FilterTodo/FilterTodo";
import SortTodo from "../SortTodo/SortTodo";

const TodosList = () => {
    const { removeUserTodo, updateUserTodoStatus } = useContext(AuthContext);
    const { setEditingTodoId, getFilteredAndSortedTodos } = useContext(TodoContext);
    const [Show, setShow] = useState(false);
    const visibleTodos = getFilteredAndSortedTodos();

    return (
        <>
        <div className={styles.sortAndFilter}><SortTodo /><FilterTodo /></div>
            <div className={styles.TodoList}>
                <h2>Todo List</h2>
                <ul>
                    {visibleTodos.map((todo) => (
                        <li key={todo.id} className={todo.status === "Completed" ? styles.completed : styles.todoItem}>
                        <input type="checkbox" checked={todo.status === "Completed"} onChange={() => updateUserTodoStatus(todo.id)} />
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Status: {todo.status}</p>
                        <p>Estimated Time: {todo.estimatedTime}</p>
                        <p>Category: {todo.category}</p>
                        <p>Deadline: {todo.deadline}</p>
                        <button className={styles.EditBtn} onClick={() => {setShow(true); setEditingTodoId(todo.id)}}>&#xf044;</button>
                        <button className={styles.RemoveBtn} onClick={() => {removeUserTodo(todo.id)}}>&#xf1f8;</button>
                        </li>
                    ))}
                </ul>
                {Show && <EditTodo onClose={() => setShow(false)} />}
            </div>
        </>
    );
}
export default TodosList;