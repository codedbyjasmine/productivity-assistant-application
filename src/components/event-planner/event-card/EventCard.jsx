import { useContext } from "react"
import { AuthContext } from "../../../context/Context"
import s from './EventCard.module.css'

const EventCard = ({event,isPast}) => {
    const {setOnEdit, deleteEvent} = useContext(AuthContext)

    const dayMonthYear = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.toLocaleString('en-US', { month: 'short' })
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
    }

    const dayAndTime = (dateString) => {
        const date = new Date(dateString)
        const day = date.toLocaleString('en-US', { weekday: 'long' })
        const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        return `${day} ${time}`
    }

    return(
        <div className={isPast ? s.cardWrapperPast : s.cardWrapper}>
            <div className={isPast ? s.cardInfoDatePast : s.cardInfoDate}>
                <p>{dayMonthYear(event.startDate)}</p>
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