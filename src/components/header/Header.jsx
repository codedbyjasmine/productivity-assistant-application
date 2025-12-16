import { useState } from "react"
import EventPlanner from "../event-planner/EventPlanner"
import Habits from "../habits/Habits"
import Todos from "../todos-and-activities/Todos/Todos"
import Overview from "../overview/Overview"

const Header = () => {

    const[mode,setMode] = useState("overview");

    return(
        <div>
            <div>
                <h1>My tasks</h1>
            </div>
            <div>
                <button onClick={()=>setMode("overview")}>Overview</button>
                <button onClick={()=>setMode("todos")}>Todos</button>
                <button onClick={()=>setMode("habits")}>Habit</button>
                <button onClick={()=>setMode("eventplanner")}>Event Planner</button>
            </div>
            {mode === "overview" && <Overview/> }
            {mode === "todos" && <Todos/> }
            {mode === "habits" && <Habits/> }
            {mode === "eventplanner" && <EventPlanner/> }
        </div>
    )
}

export default Header