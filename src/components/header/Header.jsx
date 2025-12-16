import { useState } from "react"
import { useContext } from "react"
import EventPlanner from "../event-planner/EventPlanner"
import Todos from "../todos-and-activities/Todos/Todos"
import Overview from "../overview/Overview"
import { AuthContext } from "../../context/Context"

const Header = () => {

    const[mode,setMode] = useState("overview");
    const {currentUser} = useContext(AuthContext);

    return(
        <div>
            <div>
                <h2>Hello {currentUser?.username}!</h2>
                <h3>Random quote here</h3>
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