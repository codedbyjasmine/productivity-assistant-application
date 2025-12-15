import { useContext, useState } from "react"
import { AuthContext } from "../../context/Context"

const Register = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const {handleRegister} = useContext(AuthContext)

    const onSubmit = (e) => {
        e.preventDefault()
        handleRegister(username,password)

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
                
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default Register