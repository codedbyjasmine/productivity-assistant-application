import { useState } from "react"
import EventPlanner from "../event-planner/EventPlanner"

const Header = () => {

    const[mode,setMode] = useState("List")

    return(
        <div>
            <div>
                <h1>My tasks</h1>
            </div>
            <div>
                <button onClick={()=>setMode("list")}>List</button>
                <button onClick={()=>setMode("habits")}>Habit</button>
                <button onClick={()=>setMode("eventplanner")}>Event Planner</button>
            </div>
{/* 
            {mode === "list" && <List/> }
            {mode === "habits" && <Habits/> } */}
            {mode === "eventplanner" && <EventPlanner/> }
        </div>
    )
}

export default Header