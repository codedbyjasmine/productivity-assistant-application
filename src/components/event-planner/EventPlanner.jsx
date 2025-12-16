import {useState} from "react"
import EventList from "./event-list/EventList"
import EventForm from "./event-form/EventForm"
import { AuthContext } from "../../context/Context"
import { useContext } from "react"
import s from './EventPlanner.module.css'

const EventPlanner = () => {
    const {currentUser} = useContext(AuthContext)
    const [showUpcomingEvents,setShowUpcomingEvents] = useState(true)
    const [showPastEvents,setShowPastEvents] = useState(false)

    const today = new Date();
    
    const upcomingEvents = currentUser?.events.filter((e)=> new Date(e.endDate) >= today)
    const pastEvents = currentUser?.events.filter ((e)=> new Date(e.endDate) < today)

    return (
        <div>
            <EventForm />
            <div>
                <h2 onClick={()=>setShowUpcomingEvents(!showUpcomingEvents)}>Kommande händelser</h2>
                {showUpcomingEvents &&
                    <EventList events={upcomingEvents} isPast={false}/>
                }
            </div>
            <div>
                <h2 onClick={()=>setShowPastEvents(!showPastEvents)}>Passerade händelser</h2>
                {showPastEvents &&
                    <EventList events={pastEvents} isPast={true} />
                }
            </div>
        </div>
    )

}

export default EventPlanner