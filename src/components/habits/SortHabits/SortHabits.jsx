import { useContext } from "react"
import { HabitContext } from "../../../context/HabitContext"
import styles from "./SortHabits.module.css"

const SortHabits = () => {
    
    const { filterPriority, setFilterPriority, sortBy, setSortBy, order, setOrder, getDisplayedHabits } = useContext(HabitContext)
    
    const displayedCounts = getDisplayedHabits();
    return (
        <div className={styles.card}>
            <div className={styles.sortContainer}>
                <h2>Sort Habits</h2>
                <div className={styles.filterSection}>
                    <label>Filter by Priority</label>
                    <select onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority} >
                        <option value="All">All</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className={styles.sortSection}>
                    <label>Sort by</label>
                    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                        <option value="none">None</option>
                        <option value="Repetitions">Repetitions</option>
                        <option value="Priority">Priority</option>
                    </select>
                </div>

                <div className={styles.orderSection}>
                    <label>Order</label>
                    <select onChange={(e) => setOrder(e.target.value)} value={order}>
                        <option value="Ascending">Ascending order</option>
                        <option value="Descending">Descending order</option>
                    </select>
                    <hr className={styles.hr} />
                </div>
            </div>
        </div>
    )
}

export default SortHabits