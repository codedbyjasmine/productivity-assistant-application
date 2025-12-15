import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import AuthProvider from './context/Context.jsx';
import TodoProvider from './context/TodoContext.jsx'
import HabitProvider from './context/Habitcontext.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HabitProvider>
          <TodoProvider>
            <App />
          </TodoProvider>
        </HabitProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
