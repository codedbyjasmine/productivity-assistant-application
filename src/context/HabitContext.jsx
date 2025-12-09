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
            repetitions: 0
        }
        setHabits([...habits, newHabit]);
        setTitle("")
    }

    const removeHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id))
    }

    const increaseReps = (id) => {
        setHabits(habits.map(habit => {
            if (habit.id === id) {
                return { ...habit, repetitions: habit.repetitions + 1 };
            }
            return habit;
        }))
    }

    const decreaseReps = (id) => {
        setHabits(habits.map(habit => {
            if (habit.id === id && habit.repetitions > 0) {
                return { ...habit, repetitions: habit.repetitions - 1 };
            }
            return habit;
        }))
    }

    const resetReps = (id) => {
        setHabits(habits.map(habit => {
            if(habit.id === id) {
                return { ...habit, repetitions: 0 };
            }
            return habit;
        }))

    }
    return (
        <HabitContext.Provider value={{ increaseReps, decreaseReps, resetReps, habits, removeHabit, setHabits, title, setTitle, priority, setPriority, addHabit }}>
            {children}
        </HabitContext.Provider>
    );
}



