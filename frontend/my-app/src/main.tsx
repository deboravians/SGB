import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home/Home'
import Leitores from './pages/Leitores/Leitores'

const router = createBrowserRouter([
  {
  path: "/",
  element:<Login/>
  },
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/leitores",
        element: <Leitores />
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)