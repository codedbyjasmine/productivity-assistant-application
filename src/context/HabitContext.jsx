import { createContext, useState } from "react";

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
    
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [habits, setHabits] = useState([
        { id: 1, title: "Morning Run", priority: "High", repetitions: 5 },
        { id: 2, title: "Read Book", priority: "Medium", repetitions: 3 },
    ]);

    const [filterPriority, setFilterPriority] = useState("All")
    const [sortBy, setSortBy] = useState('none')
    const [order, setOrder] = useState('ascending')

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

    const getFilteredHabits = () => {
        if (filterPriority === "All") {
            return habits
        } else {
            return habits.filter(habit => habit.priority === filterPriority)        }
    }
        return (
        <HabitContext.Provider value={{ 
            increaseReps, 
            decreaseReps, 
            resetReps, 
            habits, 
            removeHabit, 
            setHabits, 
            title, 
            setTitle, 
            priority, 
            setPriority, 
            addHabit, 
            filterPriority, 
            setFilterPriority, 
            sortBy, 
            setSortBy, 
            order, 
            setOrder,
            filterPriority, 
            setFilterPriority,
            sortBy, 
            setSortBy,
            order, 
            setOrder
             }}>
            {children}
        </HabitContext.Provider>
    );
}



