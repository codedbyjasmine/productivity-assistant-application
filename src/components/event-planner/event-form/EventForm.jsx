import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import s from './EventForm.module.css'
import { EventContext } from "../../../context/EventContext"

const EventForm = () => {
    const {addEvent, updateEvent} = useContext(AuthContext)
    const {onEdit,setOnEdit,hasErr,setHasErr,hasDateErr,setHasDateErr} = useContext(EventContext)

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
        setHasErr(false)
        setHasDateErr(false)
        
        if(!eventName || !startDate || !endDate)  {
            setHasErr(true)
            setHasDateErr(true)
            return;
        }
        if(!eventName) {
            setHasErr(true)
            return;
        }

        if(startDate >= endDate) {
            setHasDateErr(true)
            return;
        }

        const today = new Date()

        if(new Date(startDate) < today || new Date(endDate) < today) {
            setHasDateErr(true)
            return;
        }
        
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
                        className={hasErr ? s.eventInputErr : s.eventInput}
                        id="eventName"
                        value={eventName}
                        onChange={(e)=> {
                            setHasErr(false)
                            setEventName(e.target.value)}} />
                    </div>
                </div>

                <div className={s.inputFormContainer}>
                    <div className={s.labelContainer}><label htmlFor="startDate">Date start:</label></div>
                    <div className={s.inputContainer}>
                        <input
                        type="datetime-local"
                        className={hasDateErr ? s.eventInputErr : s.eventInput}
                        id="startDate"
                        value={startDate}
                        onChange={(e)=>{
                            setHasDateErr(false)
                            setStartDate(e.target.value)}} />
                    </div>
                </div>

                <div className={s.inputFormContainer}>
                    <div className={s.labelContainer}><label htmlFor="endDate">Date end:</label></div>
                    <div className={s.inputContainer}>
                        <input
                        type="datetime-local"
                        className={hasDateErr ? s.eventInputErr : s.eventInput}
                        id="endDate"
                        value={endDate}
                        onChange={(e)=>{
                            setHasDateErr(false)
                            setEndDate(e.target.value)}} />
                    </div>
                </div>
                    {
                        hasErr ? <p className={s.errorMessage}>Please fill in all the required fields</p> :
                        hasDateErr && <p className={s.errorMessage}>Invalid or missing fields</p>
                    }
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