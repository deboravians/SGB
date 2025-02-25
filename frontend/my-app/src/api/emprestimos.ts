import { Emprestimo } from "../types/emprestimos";
import { tratarErroResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

export const listarEmprestimos = async (): Promise<Emprestimo[]> => {
  const response = await fetch(`${API_URL}/emprestimos`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const cadastrarEmprestimo = async (
  tipoLeitor: "aluno" | "professor",
  idCopia: string,
  identificador: string,
  dataEmprestimo: string
): Promise<Emprestimo> => {
  if (!idCopia || !identificador || !dataEmprestimo) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const endpoint =
    tipoLeitor === "aluno"
      ? `${API_URL}/emprestimos/alunos?idCopia=${idCopia}&matriculaAluno=${identificador}`
      : `${API_URL}/emprestimos/professores?idCopia=${idCopia}&cpfProfessor=${identificador}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataEmprestimo }),
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const registrarDevolucao = async (
  id: string,
  dataDevolucao: string
): Promise<Emprestimo> => {
  const response = await fetch(`${API_URL}/devolucoes?id=${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataDevolucao }),
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const registrarExtravio = async (id: string): Promise<Emprestimo> => {
  const response = await fetch(
    `${API_URL}/emprestimos/registrarExtravio/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const aumentarPrazo = async (id: string): Promise<Emprestimo> => {
  const response = await fetch(
    `${API_URL}/emprestimos/aumentarPrazo/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const deletarEmprestimo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/emprestimos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};
