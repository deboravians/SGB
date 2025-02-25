import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import LeitoresAlunos from "./pages/LeitoresAlunos/LeitoresAlunos";
import LeitoresProfessores from "./pages/LeitoresProfessores/LeitoresProfessores";
import GerenciamentoDeEmprestimoseDevolucoes from "./pages/GerenciamentoDeEmprestimoseDevolucoes/GerenciamentoDeEmprestimoseDevolucoes";
import GerenciamentoAcervo from "./pages/GerenciamentoDoAcervo/GerenciamentoDoAcervo";
import RelatoriosEstatisticas from "./pages/RelatoriosEstatisticas/RelatoriosEstatisticas";
import InformacoesAluno from "./pages/PerfilAluno/InformacoesAluno";
import InformacoesProfessor from "./pages/PerfilProfessor/InformacoesProfessor";
import PerfilEdicao from "./pages/PerfilEdicao/PerfilEdicao";

const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/leitores/alunos",
        element: <LeitoresAlunos />,
      },
      {
        path: "/leitores/professores",
        element: <LeitoresProfessores />,
      },
      {
        path: "/leitores/alunos/:matricula",
        element: <InformacoesAluno />,
      },
      {
        path: "/leitores/professores/:cpf",
        element: <InformacoesProfessor />,
      },
      {
        path: "/edicoes",
        element: <GerenciamentoAcervo />,
      },
      {
        path: "/edicoes/:isbn",
        element: <PerfilEdicao />,
      },
      {
        path: "/emprestimos",
        element: <GerenciamentoDeEmprestimoseDevolucoes />,
      },
      {
        path: "/relatorios",
        element: <RelatoriosEstatisticas />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
