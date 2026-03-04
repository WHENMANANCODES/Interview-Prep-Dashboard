import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Problemspage from './components/Problemspage.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Streak from './components/Streak.jsx'
import Weekly from './components/Weekly.jsx'
import Hard from './components/Hard.jsx'

const router =  createBrowserRouter([
  {
    path:"/",
    element : <App/>
  },
  {
    path:"/problems",
    element : <Problemspage/>
  },
  {
    path:"/streak",
    element : <Streak/>
  },
  {
    path:"/weekly",
    element:<Weekly/>
  },
  {
    path : "/hard",
    element : <Hard/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
