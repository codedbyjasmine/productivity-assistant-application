import { useContext } from "react"
import { TodoContext } from "../../context/TodoContext"

const Overview = () => {
    const { overviewTodos } = useContext(TodoContext);

    return(
        <div>
            <div>
                <h2>Your recent todos</h2>
                <ul>{overviewTodos().map((todo)=>(
                    <li key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Status: {todo.status}</p>
                        <p>Estimated Time: {todo.estimatedTime}</p>
                        <p>Category: {todo.category}</p>
                        <p>Deadline: {todo.deadline}</p>
                    </li>
                ))}</ul>
            </div>
            <div>
                <h2>Your most repeated habits</h2>
            </div>
            <div>
                <h2>Upcoming events</h2>
            </div>
        </div>
    )
}

export default Overview