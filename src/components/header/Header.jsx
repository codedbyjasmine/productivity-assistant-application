import { useState } from "react"
import EventPlanner from "../event-planner/EventPlanner"
import Habits from "../habits/Habits"
import Todos from "../todos-and-activities/Todos/Todos"

const Header = () => {

    const[mode,setMode] = useState("todos")

    return(
        <div>
            <div>
                <h1>My tasks</h1>
            </div>
            <div>
                <button onClick={()=>setMode("todos")}>Todos</button>
                <button onClick={()=>setMode("habits")}>Habit</button>
                <button onClick={()=>setMode("eventplanner")}>Event Planner</button>
            </div>
            {mode === "todos" && <Todos/> }
            {mode === "habits" && <Habits/> }
            {mode === "eventplanner" && <EventPlanner/> }
        </div>
    )
}

export default Header