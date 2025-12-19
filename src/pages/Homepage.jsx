import { useContext, useState } from "react";
import Header from "../components/header/Header";
import { AuthContext } from "../context/Context";
import s from './Homepage.module.css'
import Overview from "../components/overview/Overview";
import Todos from "../components/todos-and-activities/Todos/Todos";
import Habits from "../components/habits/Habits/Habits";
import EventPlanner from "../components/event-planner/EventPlanner";
import '../App.css'
useState

const HomePage = () => {
    const {handleLogout,mode,currentUser} = useContext(AuthContext)

    return(
        <div className={s.body}>
            <div className={s.titleWrapper}>
                <p><strong>Productivity Assistant</strong></p>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <div className={s.bodyContainer}>
                <Header/>
                {mode === "overview" && <Overview/> }
                {mode === "todos" && <Todos/> }
                {mode === "habits" && <Habits/> }
                {mode === "eventplanner" && <EventPlanner/> }
            </div>
        </div>
    )
}

export default HomePage