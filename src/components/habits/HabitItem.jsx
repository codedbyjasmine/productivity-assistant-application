import { useContext } from "react"
import { HabitContext } from "../../context/Habitcontext";
import { AuthContext } from "../../context/Context";

const HabitItem = () => {

const { getDisplayedHabits } = useContext(HabitContext);
const { removeHabit, decreaseReps, increaseReps, resetReps, currentUser} = useContext(AuthContext);
const displayedHabits = currentUser?.habits ? getDisplayedHabits(currentUser.habits) : [];

    return(
        <div>
                {displayedHabits.map((habit) => (
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