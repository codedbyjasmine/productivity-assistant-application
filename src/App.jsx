import './App.css'
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
