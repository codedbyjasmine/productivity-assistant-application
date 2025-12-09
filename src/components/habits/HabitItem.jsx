import { useContext } from "react"
import { HabitContext } from "../../context/Habitcontext";

const HabitItem = () => {

const { habits, removeHabit} = useContext(HabitContext);

    return(
        <div>
                {habits.map((habit, priority) => (
                <div key={habit.id}>
                    <h3>{habit.title}</h3>
                    <button onClick={() => removeHabit(habit.id)}>Delete</button>
                    <p>Priority: {habit.priority}</p>
                    <p>Goal: {habit.goal}</p>
                    <p>Repetitions: {habit.repetitions}</p>
                    <button>-</button>
                    <button>+</button>
                    <button>Reset</button>
                    <hr />
                </div>
                ))}
        </div>
    )
}

export default HabitItem