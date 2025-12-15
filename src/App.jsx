import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Homepage'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import HomePage from './pages/Homepage.jsx'
import { HabitProvider } from './context/Habitcontext.jsx'
import Homepage from './pages/Homepage.jsx'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    <HabitProvider>
      <Route path="/home" element={<HomePage/>}/><Homepage />
    </HabitProvider>
    </Routes>
  )
}

export default App
