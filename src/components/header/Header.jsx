import { useEffect, useState } from "react"
import { useContext } from "react"
import EventPlanner from "../event-planner/EventPlanner"
import Todos from "../todos-and-activities/Todos/Todos"
import Overview from "../overview/Overview"
import { AuthContext } from "../../context/Context"
import Habits from "../habits/Habits/Habits"

const Header = () => {

    const [mode, setMode] = useState("overview");
    const {currentUser} = useContext(AuthContext);
    const [randomQuote, setRandomQuote] = useState("");

    useEffect(() => {
        const fetchRandomQuote = async () => {
            try {
                const response = await fetch("https://dummyjson.com/quotes/random");
                const data = await response.json();
                setRandomQuote(data);
            } catch (error) {
                console.error("Error fetching random quote:", error);
            }
        };
        fetchRandomQuote();
    }, []);

    return(
        <div>
            <div>
                <h2>Hello {currentUser?.username}!</h2>
                <p><i>"{randomQuote.quote}" - {randomQuote.author}</i></p>
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