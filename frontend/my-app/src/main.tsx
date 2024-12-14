import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './pages/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>
  },
  {
    path: "/",
    element:<App/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)