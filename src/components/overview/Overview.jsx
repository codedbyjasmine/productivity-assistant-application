import { useContext } from "react"
import { TodoContext } from "../../context/TodoContext"
import { HabitContext } from "../../context/Habitcontext";

const Overview = () => {
    const { overviewTodos } = useContext(TodoContext);
    const { overviewHabits } = useContext(HabitContext);

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
                <ul>
                    {overviewHabits().map((habit) => (
                        <li key={habit.id}>
                            <h3>Title: {habit.title}</h3>
                            <p>Repetitions: {habit.repetitions}</p>
                        </li>
                    ))}
                </ul>

            </div>
            <div>
                <h2>Upcoming events</h2>
            </div>
        </div>
    )
}

export default Overview