import { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";
import TodosList from "./TodosList.jsx";
import AddTodo from "./AddTodo.jsx";
import styles from './Todos.module.css';

const Todos = () => {

    const [show, setShow] = useState(false);

  const { todos } = useContext(TodoContext);

    return (
        <>
        <button onClick={() => setShow(!show)} >Add New Todo</button>
        {show && <AddTodo />}
        <TodosList todos={todos} />
        </>
    );
}
export default Todos;