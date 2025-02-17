import { Professor } from "../types/professores";
import { tratarErroResponse } from "./utils";

export const cadastrarProfessor = async (
  professor: Professor
): Promise<Professor> => {
  const response = await fetch("http://localhost:8080/professores", {
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
  const response = await fetch("http://localhost:8080/professores");

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const deletarProfessor = async (cpf: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/professores/${cpf}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};

export const atualizarProfessor = async (
  professor: Professor
): Promise<Professor> => {
  const response = await fetch(
    `http://localhost:8080/professores/${professor.cpf}`,
    {
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
    }
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};
