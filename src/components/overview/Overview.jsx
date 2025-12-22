import { useContext } from "react"
import { TodoContext } from "../../context/TodoContext"
import { HabitContext } from "../../context/HabitContext";
import { AuthContext } from "../../context/AuthContext";
import { EventContext } from "../../context/EventContext";
import s from './Overview.module.css'

const Overview = () => {
    const { overviewTodos } = useContext(TodoContext);
    const { overviewHabits } = useContext(HabitContext);
    const {overviewEvents,dayMonthYear,dayAndTime} = useContext(EventContext)
    const { setMode } = useContext(AuthContext);

    return(
        <div className={s.overviewContainer}>
            <div className={s.listWrapper} onClick={() => setMode("todos")}>
                <h2>Your recent todos</h2>
                <ul className={s.ul}>{overviewTodos().map((todo)=>(
                    <li key={todo.id}>
                        <h3>{todo.title}</h3>
                        <div>
                        <p>Deadline: {todo.deadline}</p></div>
                    </li>
                ))}</ul>
            </div>
            <div className={s.listWrapper} onClick={() => setMode("habits")}>
                <h2>Your most repeated habits</h2>
                <ul className={s.ul}>
                    {overviewHabits().map((habit) => (
                        <li key={habit.id}>
                            <h3>{habit.title}</h3>
                            <p>Repetitions: {habit.repetitions}</p>
                        </li>
                    ))}
                </ul>

            </div>
            <div className={s.listWrapper} onClick={() => setMode("eventplanner")}>
                <h2>Upcoming events</h2>
                <ul className={s.ul}>
                    {
                        overviewEvents().map((e)=>
                        <li key={e.id}>
                            <h3>{e.eventName}</h3>
                            <div>
                                <p> {dayAndTime(e.startDate)}, {dayMonthYear(e.startDate)}</p>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Overview