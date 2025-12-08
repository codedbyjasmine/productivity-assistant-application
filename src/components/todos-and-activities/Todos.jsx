import { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";
import TodosList from "./TodosList.jsx";
import AddTodo from "./AddTodo.jsx";

const Todos = () => {

    const [show, setShow] = useState(false);

  const { todos } = useContext(TodoContext);

    return (
        <>
        <TodosList todos={todos} />
        <button onClick={() => setShow(!show)} >Add New Todo</button>
        {show && <AddTodo />}
        </>
    );
}
export default Todos;