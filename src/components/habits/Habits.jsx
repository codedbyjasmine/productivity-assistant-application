import { useContext } from "react";
import HabitForm from "./HabitForm"
import HabitItem from "./HabitItem";
import SortHabits from "./SortHabits";
import { HabitContext } from "../../context/Habitcontext";


const Habits = () => {
    
    const { habits, getDisplayedHabits } = useContext(HabitContext);

    const displayedHabits = getDisplayedHabits();
    
    return (
        <div>
            <h2>My Habit Tracker</h2>
            <HabitForm />
            <SortHabits />
            <HabitItem />
        </div>
    )
}

export default Habits