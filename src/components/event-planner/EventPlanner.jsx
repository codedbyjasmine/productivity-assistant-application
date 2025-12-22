import {useState} from "react"
import EventList from "./event-list/EventList"
import EventForm from "./event-form/EventForm"
import { AuthContext } from "../../context/Context"
import { useContext } from "react"
import s from './EventPlanner.module.css'
import { EventContext } from "../../context/EventContext"

const EventPlanner = () => {
    const {upcomingEvents,pastEvents} = useContext(EventContext)
    const [showUpcomingEvents,setShowUpcomingEvents] = useState(true)
    const [showPastEvents,setShowPastEvents] = useState(false)

    return (
        <div>
            <EventForm />
            <h2 onClick={()=>setShowUpcomingEvents(!showUpcomingEvents)}>Upcoming events</h2>
                {showUpcomingEvents &&
                    <EventList events={upcomingEvents()} isPast={false}/>
                }
            <h2 onClick={()=>setShowPastEvents(!showPastEvents)}>Past events</h2>
                {showPastEvents &&
                    <EventList events={pastEvents()} isPast={true} />
                }
        </div>
    )

}

export default EventPlanner