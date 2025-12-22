import { useEffect, useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import s from './Header.module.css'

const Header = () => {

    const  { setMode,currentUser} = useContext(AuthContext);
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
        <div className={s.bgColorCont}>
            <div className={s.welcomeContainer}>
                <h2>Hello {currentUser?.username}!</h2>
                <p><i>"{randomQuote.quote}" - {randomQuote.author}</i></p>
            </div>
            <div className={s.introWrapper}>
                    <h3>My tasks</h3>
                    <p>Manage and track your tasks efficiently</p>
                <div className={s.navContainer}>
                    <button onClick={()=>setMode("overview")}>Overview</button>
                    <button onClick={()=>setMode("todos")}>Todos</button>
                    <button onClick={()=>setMode("habits")}>Habit</button>
                    <button onClick={()=>setMode("eventplanner")}>Event Planner</button>
                </div>
            </div>
        </div>
    )
}

export default Header