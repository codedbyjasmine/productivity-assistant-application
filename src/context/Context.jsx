import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const[mode,setMode] = useState("overview");
    const [users,setUsers] = useState(()=>{
        const stored = localStorage.getItem("users")
        return stored ? JSON.parse(stored) : [];
    })
    const [currentUser, setCurrentUser] = useState(() => {
        const stored = sessionStorage.getItem("currentUser")
        return stored ? JSON.parse(stored) : null;
    })

    const [usernameErr,setUsernameErr] = useState(false)
    const [passwordErr,setPasswordErr] = useState(false)
    const [confirmErr,setConfirmErr] = useState(false)
    const [userErr,setUserErr] = useState(false)

    // ========= Användare ========== //
    useEffect(()=>{
        console.log("Saving users:", users)
        localStorage.setItem("users",JSON.stringify(users))
    },[users])

    useEffect(()=>{
        console.log("saving currentuser:", currentUser)
        sessionStorage.setItem("currentUser",JSON.stringify(currentUser))
    },[currentUser])
    
    const handleLogin = (username,password) => {
        setUsernameErr(false)
        setPasswordErr(false)
        setUserErr(false)
        
        if(!username && !password) {
            setUsernameErr(true)
            setPasswordErr(true)
            return;
        }

        if(!username && password) {setUsernameErr(true); return}
        if(!password && username) {setPasswordErr(true); return}

        const user = users.find(u => u.username === username && u.password === password)

        if(!user) {setUserErr(true); return}
        
        if(user){
            setCurrentUser(user)
            // sessionStorage.setItem("currentUser",JSON.stringify(user))
            navigate("/home")
        }
    }

    const handleRegister = (username,password,confirmP) => {
        setUsernameErr(false)
        setPasswordErr(false)
        setConfirmErr(false)
        setUserErr(false)

        if(!username) {
            setUsernameErr(true)
            if(!password) setPasswordErr(true)
            if(!confirmP) setConfirmErr(true)
            return
        }
        if(!password) {
            setPasswordErr(true)
            if(!confirmP) setConfirmErr(true)
            return
        }
        if(!confirmP) {
            setConfirmErr(true)
            return
        }
        if(password !== confirmP) {setConfirmErr(true); return}

        const existingUser = users.find(u => u.username === username)
        if(existingUser) {setUserErr(true); return}

        const newUser = {
            id: crypto.randomUUID(),
            username,
            password,
            events: [],
            todos: [],
            habits: [],
        }
        
        setUsers([...users,newUser])
        setCurrentUser(newUser)

        navigate("/")
    }

    const handleLogout = () => {
        sessionStorage.removeItem("currentUser")
        setCurrentUser(null)
        navigate("/")
    }

    // ========= Event Planner ========= //

    const addEvent = (newEvent) => {
        if(!currentUser) return

        // Skapa event med unikt ID
        const eventWithId = {
            ...newEvent,
            id: crypto.randomUUID()
        }
        
        // Lägg till eventet i användarens eventlista
        const updatedUser = {
            ...currentUser,
            events: [...currentUser.events, eventWithId]
        }
        
        // Uppdatera användaren i users-arrayen
        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        )

        setUsers(updatedUsers);
        setCurrentUser(updatedUser)
    }

    const updateEvent = (updatedEvent) => {
        if(!currentUser) return
        
        // Uppdatera eventet i använaderens event lista
        const updatedEvents = currentUser.events.map(event => 
            event.id === updatedEvent.id ? updatedEvent : event
        )
        
        const updatedUser = {
            ...currentUser,
            events: updatedEvents
        }
        
        // Uppdatera användaren
        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        )
        
        setUsers(updatedUsers)
        setCurrentUser(updatedUser)
    }

    const deleteEvent = (eventId) => {
        if(!currentUser) return
  
        const updatedEvents = currentUser.events.filter(event => event.id !== eventId)
        
        const updatedUser = {
            ...currentUser,
            events: updatedEvents
        }
        
        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        )
        
        setUsers(updatedUsers)
        setCurrentUser(updatedUser)
    }   

    // ========= Todos ========= // 

    const addUserTodo = (title, description, status, estimatedTime, category, deadline) => {
        if(!currentUser) return;

        const newTodo = {
            id: Date.now(),
            title,
            description,
            status,
            estimatedTime,
            category,
            deadline
        };

        // Lägg till todo i användarens todo lista
        const updatedUser = {
            ...currentUser,
            todos: [...currentUser.todos, newTodo]
        }

        // Uppdatera användaren i users-arrayen
        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        )

        setUsers(updatedUsers)
        setCurrentUser(updatedUser)
    }

    const updateUserTodoStatus = (id) => {
        if(!currentUser) return;

        const updatedTodos = currentUser.todos.map(todo => 
            todo.id === id ? { ...todo, status: todo.status === "Completed" ? "Pending" : "Completed" } : todo
        );

        const updatedUser = {
            ...currentUser,
            todos: updatedTodos
        };

        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        setUsers(updatedUsers);
        setCurrentUser(updatedUser);
    };

    const removeUserTodo = (id) => {
        if(!currentUser) return;

        const updatedTodos = currentUser.todos.filter(todo => todo.id !== id);

        const updatedUser = {
            ...currentUser,
            todos: updatedTodos
        };

        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        setUsers(updatedUsers);
        setCurrentUser(updatedUser);
    };

    const updateUserTodo = (id, updatedTodo) => {
        if(!currentUser) return;

        const updatedTodos = currentUser.todos.map(todo => 
            todo.id === id ? { ...todo, ...updatedTodo } : todo
        );

        const updatedUser = {
            ...currentUser,
            todos: updatedTodos
        };

        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        setCurrentUser(updatedUser);
    }

        // ============ HABITS ============ //

    const addHabit = (title, priority) => {
        // console.log("Adding habit:", title, priority);
        if(!currentUser) return;
        const newHabit = {
                    
        id: crypto.randomUUID(), 
        title, 
        priority, 
        repetitions: 0

    }
                
    const updatedUser = {
        ...currentUser,
        habits: [...currentUser.habits, newHabit]
    }

    const updatedUsers = users.map(user => 
        user.id === currentUser.id ? updatedUser : user
        )

        setUsers(updatedUsers)
        setCurrentUser(updatedUser)
    }

    const removeHabit = (id) => {
        if(!currentUser) return;

        const updatedHabits = currentUser.habits.filter(habit => habit.id !==id);

        const updatedUser = {
            ...currentUser,
            habits: updatedHabits
        };

        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        setUsers(updatedUsers);
        setCurrentUser(updatedUser);
    };

    const increaseReps = (id) => {
        if(!currentUser) return;
        const updatedHabits = currentUser.habits.map(habit => {
            if (habit.id === id) {
                return { ...habit, repetitions: habit.repetitions + 1 };
            }
            return habit;
        });

        const updatedUser = {
            ...currentUser,
            habits: updatedHabits
        };

        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        setUsers(updatedUsers);
        setCurrentUser(updatedUser);
    };

    const decreaseReps = (id) => {
        if(!currentUser) return
        const updatedHabits = currentUser.habits.map(habit => {
            if (habit.id === id && habit.repetitions > 0) {
                return { ...habit, repetitions: habit.repetitions - 1 };
            }
            return habit;
        })

        const updatedUser = {
            ...currentUser,
            habits: updatedHabits
        }
        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        )

        setUsers(updatedUsers)
        setCurrentUser(updatedUser)
    }

    const resetReps = (id) => {
        if(!currentUser) return
        const updatedHabits = currentUser.habits.map(habit => {
            if(habit.id === id) {
                return { ...habit, repetitions: 0 };
            }
            return habit;
        })

        const updatedUser = {
            ...currentUser,
            habits: updatedHabits
        }

        const updatedUsers = users.map(user => 
            user.id === currentUser.id ? updatedUser : user
        )

        setUsers(updatedUsers)
        setCurrentUser(updatedUser)
    }


    return (
        <AuthContext.Provider 
        value={{users, currentUser, setUsers, 
        usernameErr, setUsernameErr,
        passwordErr, setPasswordErr,
        userErr, setUserErr,
        confirmErr,setConfirmErr,
        mode,setMode,
        handleLogin, handleRegister, handleLogout,
        addEvent, updateEvent, deleteEvent,
        addUserTodo, updateUserTodoStatus, removeUserTodo,
        updateUserTodo, addHabit, removeHabit, increaseReps,
        decreaseReps, resetReps
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider