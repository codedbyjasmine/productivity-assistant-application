import { useContext } from "react"
import { AuthContext } from "../../../context/Context";
import { HabitContext } from "../../../context/HabitContext";
import styles from "./HabitItem.module.css";

const HabitItem = () => {

const { getDisplayedHabits } = useContext(HabitContext);
const { removeHabit, decreaseReps, increaseReps, resetReps, currentUser} = useContext(AuthContext);
const displayedHabits = currentUser?.habits ? getDisplayedHabits(currentUser.habits) : [];

    return(
        <div className={styles.itemsContainer}>
                {displayedHabits.map((habit) => (
                <div key={habit.id} className={styles.habitCard}>
                    <div className={styles.habitHeader}>
                        <h3 className={styles.habitTitle}>{habit.title}</h3>
                        <button className={styles.deleteBtn} onClick={() => removeHabit(habit.id)}>Delete</button>
                    </div>
                    <div className={styles.habitInfo}>
                        <p>Priority: {habit.priority}</p>
                        <p>Repetitions: {habit.repetitions}</p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button className={`${styles.habitButton} ${styles.decreaseBtn}`} onClick={() => decreaseReps(habit.id)}>-</button>
                        <button className={`${styles.habitButton} ${styles.increaseBtn}`} onClick={() => increaseReps(habit.id)}>+</button>
                        <button className={`${styles.habitButton} ${styles.resetBtn}`} onClick={() => resetReps(habit.id)}>Reset</button>
                    </div>
                    <hr className={styles.divider} />
                </div>
                ))}
        </div>
    )
}

export default HabitItem