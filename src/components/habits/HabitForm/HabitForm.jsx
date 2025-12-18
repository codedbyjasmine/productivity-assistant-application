import { useContext } from "react"
import { AuthContext } from "../../../context/Context"
import { HabitContext } from "../../../context/HabitContext"

const HabitForm = () => {

const { title, setTitle,priority, setPriority } = useContext(HabitContext)
const { addHabit } = useContext(AuthContext);    
    return(
        <div className="form-container">
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