import { createContext, useState, useContext } from "react";

export const HabitContext = createContext();


export const HabitProvider = ({ children }) => {
    
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [habits, setHabits] = useState([
        { id: 1, title: "Morning Run", priority: "High", repetitions: 5 },
        { id: 2, title: "Read Book", priority: "Medium", repetitions: 3 },
    ]);

    const addHabit = (title, priority) => {
       const newHabit = {
            id: Date.now(), 
            title, 
            priority, 
            reps: 0
        }
        setHabits([...habits, newHabit]);
        setTitle("")
    }

    const removeHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id))
    }

    return (
        <HabitContext.Provider value={{ habits, removeHabit, setHabits, title, setTitle, priority, setPriority, addHabit }}>
            {children}
        </HabitContext.Provider>
    );
}



