import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./Context";

export const HabitContext = createContext();

const HabitProvider = ({ children }) => {
    
    const { currentUser } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [habits, setHabits] = useState([]);


    useEffect(() => {
        if (currentUser?.habits) {
            setHabits(currentUser.habits);
        }
    }, [currentUser?.habits]);

    const [filterPriority, setFilterPriority] = useState("All")
    const [sortBy, setSortBy] = useState('none')
    const [order, setOrder] = useState('Ascending')

    // const addHabit = (title, priority) => {
    //    const newHabit = {
    //         id: Date.now(), 
    //         title, 
    //         priority, 
    //         repetitions: 0
    //     }
    //     setHabits([...habits, newHabit]);
    //     setTitle("")
    // }

    // const removeHabit = (id) => {
    //     setHabits(habits.filter(habit => habit.id !== id))
    // }

    // const increaseReps = (id) => {
    //     setHabits(habits.map(habit => {
    //         if (habit.id === id) {
    //             return { ...habit, repetitions: habit.repetitions + 1 };
    //         }
    //         return habit;
    //     }))
    // }

    // const decreaseReps = (id) => {
    //     setHabits(habits.map(habit => {
    //         if (habit.id === id && habit.repetitions > 0) {
    //             return { ...habit, repetitions: habit.repetitions - 1 };
    //         }
    //         return habit;
    //     }))
    // }

    // const resetReps = (id) => {
    //     setHabits(habits.map(habit => {
    //         if(habit.id === id) {
    //             return { ...habit, repetitions: 0 };
    //         }
    //         return habit;
    //     }))

    // }

    const getFilteredHabits = () => {
        if (filterPriority === "All") {
            return habits;
        } else {
            return habits.filter(habit => habit.priority.toLowerCase() === filterPriority.toLowerCase());
        }
    }

    const getSortedHabits = (habitsToSort) => {
        if (sortBy === "none") {
            return habitsToSort;
        }

        const sorted = [...habitsToSort].sort((a, b) => {
            if (sortBy === "Repetitions") {
                return a.repetitions - b.repetitions;
            }

            if (sortBy === "Priority") {
                const priorityOrder = { "low": 1, "medium": 2, "high": 3 };
                return priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()];
            }

            return 0;
        });

        if (order === "Descending") {
            return sorted.reverse();
        }
        return sorted;
    }

        const getDisplayedHabits = () => {
        const filtered = getFilteredHabits()
        const sorted = getSortedHabits(filtered)
        return sorted
    }

        const overviewHabits = () => {
        return habits.sort((a, b) => b.repetitions - a.repetitions).slice(0, 3);
    }

        return (
        <HabitContext.Provider value={{ 
             
            habits,  
            setHabits, 
            title, 
            setTitle, 
            priority, 
            setPriority, 
            filterPriority, 
            setFilterPriority, 
            sortBy, 
            setSortBy, 
            order, 
            setOrder,
            getDisplayedHabits,
            overviewHabits
    }}>
            {children}
        </HabitContext.Provider>
    );
}

export default HabitProvider;


