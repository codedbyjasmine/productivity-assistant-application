import { createContext, useState, useContext } from "react";

export const HabitContext = createContext();


export const HabitProvider = ({ children }) => {
    
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [habits, setHabits] = useState([
        { id: 1, title: "Morning Run", priority: "High", repetitions: 5 },
        { id: 2, title: "Read Book", priority: "Medium", repetitions: 3 },
    ]);

    const handleAddHabit = (newHabit) => {

        setHabits([...habits, newHabit]);
        setTitle("")
    }

    return (
        <HabitContext value={{ habits, setHabits, title, setTitle, handleAddHabit, priority, setPriority }}>
            {children}
        </HabitContext>
    );
}



