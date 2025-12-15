import './App.css'
import HomePage from './pages/Homepage.jsx'
import { HabitProvider } from './context/Habitcontext.jsx'
import Homepage from './pages/Homepage.jsx'

function App() {


  return (
    <>
    <HabitProvider>
      <Homepage />
    </HabitProvider>
    </>
  )
}

export default App
