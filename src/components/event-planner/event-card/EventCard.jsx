import { useContext } from "react"
import { AuthContext } from "../../../context/Context"
import s from './EventCard.module.css'

const EventCard = ({event}) => {
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
        <div className={s.cardWrapper}>
            <div className={s.cardInfoDate}>
                <p>{dayMonthYear(event.startDate)}</p>
            </div>
            <div className={s.cardContainer}>
                <div className={s.cardInfo}>
                    <h3>{event.eventName}</h3>
                </div>
                <div className={s.cardInfo}>
                    <p>{dayAndTime(event.startDate)}</p>
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