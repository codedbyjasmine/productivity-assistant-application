import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import s from './EventCard.module.css'
import { EventContext } from "../../../context/EventContext"

const EventCard = ({event,isPast}) => {
    const {deleteEvent} = useContext(AuthContext)
    const {dayAndTime,dayMonthYear,setOnEdit} = useContext(EventContext)

    return(
        <div className={isPast ? s.cardWrapperPast : s.cardWrapper}>
            <div className={isPast ? s.cardInfoDatePast : s.cardInfoDate}>
                <p>{dayMonthYear(event.startDate)}</p>
                <p>-</p>
                <p>{dayMonthYear(event.endDate)}</p>
            </div>
            <div className={isPast ? s.cardContainerPast : s.cardContainer}>
                <h3>{event.eventName}</h3>
                <div className={s.cardInfoWrapper}>
                    <div className={isPast ? s.cardInfoPast1 : s.cardInfo1}>
                        <p>Start:</p>
                        <p>End:</p>
                    </div>
                    <div className={isPast ? s.cardInfoPast2 : s.cardInfo2}>
                        <p>{dayAndTime(event.startDate)}</p>
                        <p>{dayAndTime(event.endDate)}</p>
                    </div>
                </div>
            </div>
            <div className={s.cardBtns}>
                <button onClick={() => setOnEdit(event)}>EDIT</button>
                <button onClick={()=> deleteEvent(event.id)}>REMOVE</button>
            </div>
        </div>
    )
}

export default EventCard