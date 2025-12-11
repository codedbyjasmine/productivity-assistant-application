import { useContext, useState } from "react";
import { TodoContext } from "../../../context/TodoContext.jsx";
import TodosList from "../TodosList/TodosList.jsx";
import AddTodo from "../AddTodo/AddTodo.jsx";
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