import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/Context"
import s from './LoginRegister.module.css'
import { Link } from "react-router-dom"


const Register = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [confirmP,setConfirmP] = useState("")
    const {handleRegister,usernameErr,setUsernameErr,
        passwordErr,setPasswordErr,
        userErr, setUserErr,
        confirmErr,setConfirmErr} = useContext(AuthContext)

    useEffect(() => {
    setUserErr(false)
    setUsernameErr(false)
    setPasswordErr(false)
    setConfirmErr(false)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        handleRegister(username,password,confirmP)

    }
    return (
        <div className={s.userContainer}>
            <div className={s.welcomeContainer}>
                <h2>Get started now!</h2>
                <p>Register with your username and create your account!</p>
            </div>
            <form onSubmit={onSubmit} className={s.formContainer}>
                <div className={s.inputContainer}>
                    <label htmlFor="username">Username</label>
                    <input
                    className={usernameErr ? s.inputError : s.input}
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e)=>{
                        setUsernameErr(false)
                        setUserErr(false)
                        setUsername(e.target.value)}} />
                </div>
                {usernameErr && 
                <div className={s.errorMessage}>
                    <p>❗Usernamw is required</p>
                </div>}

                <div className={s.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input
                    className={passwordErr ? s.inputError : s.input} 
                    type="text"
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

                <div className={s.inputContainer}>
                    <label htmlFor="password">Confirm password</label>
                    <input
                    className={confirmErr ? s.inputError : s.input} 
                    type="text"
                    placeholder="Enter password"
                    value={confirmP}
                    onChange={(e)=>{
                        setConfirmErr(false)
                        setUserErr(false)
                        setConfirmP(e.target.value)}} />
                </div>
                {confirmErr && 
                <div className={s.errorMessage}>
                    <p>❗Confirm your password</p>
                </div>}
                {userErr && 
                <div className={s.errorMessage}>
                    <p>❗Username already exists</p>
                </div>}
                
                <div className={s.navigateContainer}>
                    <button type="submit">Create</button>
                     <div>
                        <p>Already have an account? <Link to="/">Login</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register