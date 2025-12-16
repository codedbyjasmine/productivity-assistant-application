import EventCard from "../event-card/EventCard"
import s from './EventList.module.css'


const EventList = ({events,isPast}) => {

    if(events.length===0){
        return (
            <div>
                <p>No events yet! :(</p>
            </div>
        )
    }

    const sortedEvents = [...events].sort((a,b)=> new Date(a.startDate) - new Date(b.startDate))

   return(
    <div>
        <div className={s.listContainer}>
            {sortedEvents.map((event)=> 
                <EventCard key={event.id} event={event} isPast={isPast}/>)
            }
        </div>
    </div>
   )
}

export default EventList