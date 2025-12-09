import { useContext } from "react"
import { HabitContext } from "../../context/Habitcontext"


const HabitForm = () => {

const {habits, setHabits, title, setTitle, handleAddHabit,priority, setPriority } = useContext(HabitContext)
    
    return(
        <div>
            <h3>Add new Habit</h3>
            <h3>{title}</h3>
            <input type="text" placeholder="Enter habit name" onChange={(e) => setTitle(e.target.value)} required/>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">🟢 Low priority</option>
                <option value="medium">🟡 Medium priority</option>
                <option value="high">🔴 High priority</option>
            </select>
            <button onClick={handleAddHabit}>Add Habit</button>
            <hr />
        </div>
    )
}

export default HabitForm