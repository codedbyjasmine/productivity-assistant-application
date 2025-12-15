import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Homepage'
import Login from './pages/login/Login'
import Register from './pages/login/Register'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<HomePage/>}/>
    </Routes>
  )
}

export default App
