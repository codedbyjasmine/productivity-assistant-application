import { useContext } from "react"
import { HabitContext } from "../../context/Habitcontext";

const HabitItem = () => {

const { habits} = useContext(HabitContext);

    return(
        <div>
                {habits.map((habit, index) => (
                <div key={index}>
                    <h3>{habit.title}</h3>
                    <button>Delete</button>
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