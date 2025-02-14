import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client'
import Login from './pages/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home/Home'
import LeitoresAlunos from './pages/LeitoresAlunos/LeitoresAlunos'
import LeitoresProfessores from './pages/LeitoresProfessores/LeitoresProfessores'
import GerenciamentoDeEmprestimoseDevolucoes from './pages/GerenciamentoDeEmprestimoseDevolucoes/GerenciamentoDeEmprestimoseDevolucoes';
import GerenciamentoAcervo from './pages/GerenciamentoDoAcervo/GerenciamentoDoAcervo'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/leitores/alunos",
        element: <LeitoresAlunos />
      },
      {
        path: "/leitores/professores",
        element: <LeitoresProfessores />
      },

      {
        path: "/edicoes",
        element: <GerenciamentoAcervo />
      },
  
      {
        path: "/emprestimos",
        element: <GerenciamentoDeEmprestimoseDevolucoes />
      },
  
      
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)