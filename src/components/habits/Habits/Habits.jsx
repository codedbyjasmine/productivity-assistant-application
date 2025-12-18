import { useContext } from "react";
import HabitForm from "../HabitForm/HabitForm.jsx"
import HabitItem from "../HabitItem/HabitItem.jsx";
import SortHabits from "../SortHabits/SortHabits.jsx";
import { HabitContext } from "../../../context/HabitContext.jsx";
import styles from "./Habits.module.css";

const Habits = () => {
    
    const { habits, getDisplayedHabits } = useContext(HabitContext);

    const displayedHabits = getDisplayedHabits();
    
    return (
        <div className={styles.container}>
            <h2>My Habit Tracker</h2>
            <HabitForm />
            <SortHabits />
            <HabitItem />
        </div>
    )
}

export default Habits