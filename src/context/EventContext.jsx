import { createContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const EventContext = createContext ()

const EventProvider = ({children}) => {
    
    const {currentUser} = useContext(AuthContext)
    const [onEdit,setOnEdit] = useState(null)

    const [hasErr,setHasErr] = useState(false)
    const [hasDateErr,setHasDateErr] = useState(false)

    const dayMonthYear = (dateString) => {
            const date = new Date(dateString)
            const dayNr = date.getDate()
            const month = date.toLocaleString('en-US', { month: 'short' })
            const year = date.getFullYear()
            return `${dayNr} ${month} ${year}`
        }
    
    const dayAndTime = (dateString) => {
            const date = new Date(dateString)
            const day = date.toLocaleString('en-US', { weekday: 'short' })
            const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            return `${day} ${time}`
        }

    const upcomingEvents = () => {
        const today = new Date();
        return currentUser?.events?.filter((e)=> new Date(e.startDate) >= today)}
        
    const pastEvents = () => {
        const today = new Date();
        return currentUser?.events?.filter ((e)=> new Date(e.startDate) < today)}

    const overviewEvents = () => {
        const today = new Date();
        return currentUser?.events?.slice().filter((e)=> new Date(e.startDate) >= today)
        .sort((a,b) =>new Date(a.startDate) - new Date (b.startDate))
        .slice(0,3) || [];
    }
    
    return(
        <EventContext.Provider value={{dayMonthYear,dayAndTime, overviewEvents, onEdit,setOnEdit,
            upcomingEvents, pastEvents,hasErr,setHasErr,hasDateErr,setHasDateErr
        }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider