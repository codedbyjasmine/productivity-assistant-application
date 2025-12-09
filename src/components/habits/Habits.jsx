import { useContext } from "react";
import HabitForm from "./HabitForm"
import { HabitContext } from "../../context/Habitcontext";
import HabitItem from "./HabitItem";


const Habits = () => {
    
    const { habits } = useContext(HabitContext);
    
    return (
        <div>
            <h2>My Habit Tracker</h2>
            <HabitForm />
            <HabitItem />
        </div>
    )
}

export default Habits