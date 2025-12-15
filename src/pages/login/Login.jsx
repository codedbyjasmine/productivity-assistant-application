import { useContext, useState } from "react"
import { AuthContext } from "../../context/Context"
import { Link } from "react-router-dom"

const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const {handleLogin} = useContext(AuthContext)

    const onSubmit = (e) => {
        e.preventDefault()
        handleLogin(username,password)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <p><Link to="register">Register your account</Link></p>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login