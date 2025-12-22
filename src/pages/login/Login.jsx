import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/Context"
import { Link } from "react-router-dom"
import s from './LoginRegister.module.css'

const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const {handleLogin, usernameErr,setUsernameErr,
        passwordErr,setPasswordErr,
        userErr, setUserErr} = useContext(AuthContext)

    const onSubmit = (e) => {
        e.preventDefault()
        handleLogin(username,password)
    }

    useEffect(() => {
    setUserErr(false)
    setUsernameErr(false)
    setPasswordErr(false)
    }, [])
    
    return (
        <div className={s.body}>
            <div className={s.userContainer}>
                <div className={s.welcomeContainer}>
                    <h2>Hi, welcome back!</h2>
                    <p>Please log in with the username and password you created before</p>
                </div>
                <form onSubmit={onSubmit} className={s.formContainer}>
                    <div className={s.inputContainer}>
                        <label htmlFor="username">Username</label>
                        <input
                        className={usernameErr ? s.inputError : s.input}
                        type="text"
                        id="usernameId"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e)=> {
                            setUsernameErr(false)
                            setUserErr(false)
                            setUsername(e.target.value)
                        }} />
                    </div>
                    {usernameErr &&
                    <div className={s.errorMessage}>
                        <p>❗Username is required</p>
                    </div>}
                    <div className={s.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <input
                        className={passwordErr ? s.inputError : s.input}
                        type="password"
                        id="passwordId"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>{
                            setPasswordErr(false)
                            setUserErr(false)
                            setPassword(e.target.value)}} />
                    </div>
                    {passwordErr &&
                    <div className={s.errorMessage}>
                        <p>❗Password is required</p>
                    </div>}
                    {userErr &&
                    <div className={s.errorMessage}>
                        <p>❗User not found</p>
                    </div>}
                    <div className={s.navigateContainer}>
                        <button type="submit">Login now</button>
                        <div>
                            <p>Don't have an account? <Link to="register">Create account</Link></p>
                        </div>
                    </div>
            
                </form>
            </div>
        </div>
    )
}

export default Login