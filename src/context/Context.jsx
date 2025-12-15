import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FakeUserList } from "../components/event-planner/fake-user-list/fakeUserList";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [users,setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null) //isLoggenIn / setIsLoggenIn

    // ========= Användare ========== //
    
    useEffect(()=>{
        //ladda registrerade användare
        const storedUsers = JSON.parse(localStorage.getItem("users")) || []
        setUsers(storedUsers)
        
        //ladda upp från session
        const loggedInUser = JSON.parse(sessionStorage.getItem("currentUser"))
        if(loggedInUser) {
            setCurrentUser(loggedInUser)
        }
    },[])
    
    const handleLogin = (username,password) => {
        if(!username || !password) return alert ("fill in fields")
            
        const user = users.find(u => u.username === username && u.password === password)

        if(user){
            setCurrentUser(user)
            sessionStorage.setItem("currentUser",JSON.stringify(user))
            navigate("/home")
        } else {
            alert("Invalid credentials")
        }
    }

    const handleRegister = (username,password) => {
        if(!username || !password) return alert ("fill in fields")

        const existingUser = users.find(u => u.username === username)
        if(existingUser) return alert("Username already exists")

        const newUser = {
            id: crypto.randomUUID(),
            username,
            password,
            events: []
        }
        
        setUsers([...users,newUser])
        setCurrentUser(newUser)
        
        localStorage.setItem("users", JSON.stringify([...users,newUser]))
        sessionStorage.setItem("currentUser", JSON.stringify(newUser))
        
        alert ("Registration successful")
        navigate("/")
    }

    const handleLogout = () => {
        sessionStorage.removeItem("currentUser")
        setCurrentUser(null)
        navigate("/")
    }

    // ========= Event Planner ========= //

    const [onEdit, setOnEdit] = useState(null)

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
        
        setUsers(updatedUsers)
        setCurrentUser(updatedUser)
        localStorage.setItem("users", JSON.stringify(updatedUsers))
        sessionStorage.setItem("currentUser", JSON.stringify(updatedUser))
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
        localStorage.setItem("users", JSON.stringify(updatedUsers))
        sessionStorage.setItem("currentUser", JSON.stringify(updatedUser))
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
        localStorage.setItem("users", JSON.stringify(updatedUsers))
        sessionStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }

    return (
        <AuthContext.Provider 
        value={{users, currentUser, setUsers,
        handleLogin, handleRegister, handleLogout,
        addEvent, updateEvent, deleteEvent,
        onEdit, setOnEdit
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider