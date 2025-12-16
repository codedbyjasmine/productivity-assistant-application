import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/Context"
import s from './EventForm.module.css'

const EventForm = () => {
    const {onEdit, setOnEdit, addEvent, updateEvent} = useContext(AuthContext)

    const [eventName,setEventName] = useState("")
    const [startDate,setStartDate] = useState("")
    const [endDate,setEndDate] = useState("")
    const [showEventForm,setShowEventForm] = useState(false)
    
    useEffect(()=>{
        if(onEdit){
            setShowEventForm(true)
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
        setShowEventForm(false)
    }

    return(
        <div>
            <button onClick={()=> setShowEventForm(!showEventForm)}>Add new event</button>

            {showEventForm && 
            <>
            <div className={s.backdrop} onClick={()=> setShowEventForm(false)}></div>
            <div  className={s.formContainer}>
            <div>
                <h2>{onEdit ? "Edit event" : "Add event"}</h2>
            </div>
            <form onSubmit={handleSubmit} className={s.form}>
                <div className={s.inputFormContainer}>
                    <div className={s.labelContainer}><label htmlFor="eventName">Event name:</label></div>
                    <div className={s.inputContainer}>
                        <input
                        type="text"
                        id="eventName"
                        value={eventName}
                        onChange={(e)=> setEventName(e.target.value)} />
                    </div>
                </div>

                <div className={s.inputFormContainer}>
                    <div className={s.labelContainer}><label htmlFor="startDate">Date start:</label></div>
                    <div className={s.inputContainer}>
                        <input
                        type="datetime-local"
                        id="startDate"
                        value={startDate}
                        onChange={(e)=>setStartDate(e.target.value)} />
                    </div>
                </div>

                <div className={s.inputFormContainer}>
                    <div className={s.labelContainer}><label htmlFor="endDate">Date end:</label></div>
                    <div className={s.inputContainer}>
                        <input
                        type="datetime-local"
                        id="endDate"
                        value={endDate}
                        onChange={(e)=>setEndDate(e.target.value)} />
                    </div>
                </div>
                <div className={s.inputFormBtn}>
                    <button type="submit">{onEdit ? "Update Event" : "Add event"}</button>
                    {onEdit && <button type="button" onClick={() => {
                        setOnEdit(null)
                        setShowEventForm(false)}}>Cancel</button>}
                </div>
            </form></div>
            </>
            }
        </div>
    )
}

export default EventForm