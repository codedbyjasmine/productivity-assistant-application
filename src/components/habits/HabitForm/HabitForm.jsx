import { useContext } from "react"
import { AuthContext } from "../../../context/Context"
import { HabitContext } from "../../../context/HabitContext"
import styles from "./HabitForm.module.css"

const HabitForm = () => {

const { title, setTitle,priority, setPriority } = useContext(HabitContext)
const { addHabit } = useContext(AuthContext);    
    return(
        <div className={styles.card}>
            <div className={styles.formContainer}>
                <h3>Add new Habit</h3>
                <input type="text" placeholder="Enter habit name" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">🟢 Low priority</option>
                    <option value="Medium">🟡 Medium priority</option>
                    <option value="High">🔴 High priority</option>
                </select>
                <button onClick={() => {addHabit(title, priority);
                    setTitle(""); setPriority("Medium");
                }}>Add Habit</button>
                <hr className={styles.hr} />
            </div>
        </div>
    )

}

export default HabitForm