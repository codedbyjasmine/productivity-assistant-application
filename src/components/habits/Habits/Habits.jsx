import { useContext } from "react";
import HabitForm from "../HabitForm/HabitForm.jsx"
import HabitItem from "../HabitItem/HabitItem.jsx";
import SortHabits from "../SortHabits/SortHabits.jsx";
import { HabitContext } from "../../../context/Habitcontext.jsx";


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