import { Emprestimo } from "../types/emprestimos";
import { Professor } from "../types/professores";
import { tratarErroResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

export const cadastrarProfessor = async (
  professor: Professor
): Promise<Professor> => {
  const response = await fetch(`${API_URL}/professores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(professor),
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const listarProfessores = async (): Promise<Professor[]> => {
  const response = await fetch(`${API_URL}/professores`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const deletarProfessor = async (cpf: string): Promise<void> => {
  const response = await fetch(`${API_URL}/professores/${cpf}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};

export const atualizarProfessor = async (
  professor: Professor
): Promise<Professor> => {
  const response = await fetch(`${API_URL}/professores/${professor.cpf}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cpf: professor.cpf,
      disciplina: professor.disciplina,
      nome: professor.nome,
      telefone: professor.telefone,
      rua: professor.rua,
      bairro: professor.bairro,
    }),
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const informacoesProfessor = async (cpf: string): Promise<Professor> => {
  const response = await fetch(`${API_URL}/professores/${cpf}`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const historicoProfessor = async (
  cpf: string
): Promise<Emprestimo[]> => {
  const response = await fetch(
    `${API_URL}/emprestimos/professores/${cpf}`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};