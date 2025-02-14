import { Emprestimo } from "../types/emprestimos";
import { tratarErroResponse } from "./utils";

export const listarEmprestimos = async (): Promise<Emprestimo[]> => {
  const response = await fetch("http://localhost:8080/emprestimos");

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
      ? `http://localhost:8080/emprestimos/alunos?idCopia=${idCopia}&matriculaAluno=${identificador}`
      : `http://localhost:8080/emprestimos/professores?idCopia=${idCopia}&cpfProfessor=${identificador}`;

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
  const response = await fetch(`http://localhost:8080/devolucoes?id=${id}`, {
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
    `http://localhost:8080/emprestimos/registrarExtravio/${id}`,
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
    `http://localhost:8080/emprestimos/aumentarPrazo/${id}`,
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
  const response = await fetch(`http://localhost:8080/emprestimos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};
