import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/Context"
import s from './EventForm.module.css'

const EventForm = () => {
    const {onEdit, setOnEdit, addEvent, updateEvent} = useContext(AuthContext)

    const [eventName,setEventName] = useState("")
    const [startDate,setStartDate] = useState("")
    const [endDate,setEndDate] = useState("")
    
    useEffect(()=>{
        if(onEdit){
            setEventName(onEdit.eventName)
            setStartDate(onEdit.startDate)
            setEndDate(onEdit.endDate)
        }
        else{
            setEventName("")
            setStartDate("")
            setEndDate("")
        }
    },[onEdit])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!eventName || !startDate || !endDate) return alert ("Please fill in all fields")
        if(startDate >= endDate) return alert("End date must be after start date")
        
        const newEvent = {
            eventName,
            startDate,
            endDate
        }
    
        if(onEdit) {
            // Få med id vid uppdatering
            updateEvent({...newEvent, id: onEdit.id})
            // Nollställ onEdit för att avsluta redigeringsläget
            setOnEdit(null)
        } else {
            // 
            addEvent(newEvent)
        }

        setEventName("")
        setStartDate("")
        setEndDate("")
    }

    return(
        <div>
            <h2>{onEdit ? "Edit event" : "Add event"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="eventName">Event name:</label>
                    <input
                    type="text"
                    id="eventName"
                    value={eventName}
                    onChange={(e)=> setEventName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="startDate">Date start:</label>
                    <input
                    type="datetime-local"
                    id="startDate"
                    value={startDate}
                    onChange={(e)=>setStartDate(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="endDate">Date end:</label>
                    <input
                    type="datetime-local"
                    id="endDate"
                    value={endDate}
                    onChange={(e)=>setEndDate(e.target.value)} />
                </div>
                <div>
                    <button type="submit">{onEdit ? "Update Event" : "Add event"}</button>
                    {onEdit && <button type="button" onClick={() => setOnEdit(null)}>Cancel</button>}
                </div>
            </form>
        </div>
    )
}

export default EventForm