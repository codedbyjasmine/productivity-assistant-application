import { useContext } from "react"
import { HabitContext } from "../../context/Habitcontext"



const HabitForm = () => {

const { addHabit, removeHabit, habits, setHabits, title, setTitle, handleAddHabit,priority, setPriority } = useContext(HabitContext)
    
    return(
        <div>
            <h3>Add new Habit</h3>
            <h3>{title}</h3>
            <input type="text" placeholder="Enter habit name" onChange={(e) => setTitle(e.target.value)} required/>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">🟢 Low priority</option>
                <option value="Medium">🟡 Medium priority</option>
                <option value="High">🔴 High priority</option>
            </select>
            <button onClick={() => addHabit(title, priority)}>Add Habit</button>
            <hr />
        </div>
    )
}

export default HabitForm