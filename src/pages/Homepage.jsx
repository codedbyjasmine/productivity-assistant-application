import { useContext } from "react";
import Header from "../components/header/Header";
import { AuthContext } from "../context/Context";


const HomePage = () => {
    const {handleLogout} = useContext(AuthContext)

    return(
        <>
        <h1>Productivity Assistant</h1>
        <button onClick={handleLogout}>Log Out</button>
        <Header/>
        </>
    )
}

export default HomePage