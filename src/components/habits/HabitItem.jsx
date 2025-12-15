import { useContext } from "react"
import { HabitContext } from "../../context/Habitcontext";

const HabitItem = () => {

const { removeHabit, increaseReps, decreaseReps, resetReps, getDisplayedHabits } = useContext(HabitContext);

const displayedHabits = getDisplayedHabits();

    return(
        <div>
                {displayedHabits.map((habit, priority) => (
                <div key={habit.id}>
                    <h3>{habit.title}</h3>
                    <button onClick={() => removeHabit(habit.id)}>Delete</button>
                    <p>Priority: {habit.priority}</p>
                    <p>Repetitions: {habit.repetitions}</p>
                    <button onClick={() => decreaseReps(habit.id)}>-</button>
                    <button onClick={() => increaseReps(habit.id)}>+</button>
                    <button onClick={() => resetReps(habit.id)}>Reset</button>
                    <hr />
                </div>
                ))}
        </div>
    )
}

export default HabitItem