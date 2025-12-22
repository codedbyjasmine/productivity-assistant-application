import { useContext, useState } from "react";
import { TodoContext } from "../../../context/TodoContext";
import { AuthContext } from "../../../context/AuthContext";
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
                <ul className={styles.ul}>
                    {visibleTodos.map((todo) => (
                        <li key={todo.id} className={todo.status === "Completed" ? styles.completed : styles.todoItem}>
                        <input type="checkbox" checked={todo.status === "Completed"} onChange={() => updateUserTodoStatus(todo.id)} />
                        <div className={styles.todoDetails}><h3 style={{width: "100px"}}>{todo.title}</h3>
                        <p style={{width: "170px"}}>{todo.description}</p>
                        <p style={{width: "80px"}}>Status:<br />  {todo.status}</p>
                        <p style={{width: "150px"}}>Estimated Time:<br /> {todo.estimatedTime}</p>
                        <p style={{width: "80px"}}>Category:<br />  {todo.category}</p>
                        <p style={{width: "100px"}}>Deadline:<br />  {todo.deadline}</p>
                        <div className={styles.buttonContainer}><button className={styles.EditBtn} onClick={() => {setShow(true); setEditingTodoId(todo.id)}}>&#xf044;</button>
                        <button className={styles.RemoveBtn} onClick={() => {removeUserTodo(todo.id)}}>&#xf1f8;</button></div></div>
                        </li>
                    ))}
                </ul>
                {Show && <EditTodo onClose={() => setShow(false)} />}
            </div>
        </>
    );
}
export default TodosList;