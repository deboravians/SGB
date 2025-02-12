import { Professor } from "../types/professores";

export const cadastrarProfessor = async (professor: Professor): Promise<Professor> => {
  const response = await fetch("http://localhost:8080/professores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(professor),
  });

  if (!response.ok) {
    throw new Error("Erro, preencha todos os campos!");
  }

  return response.json();
};

export const listarProfessores = async () : Promise<Professor[]> => {
  const response = await fetch("http://localhost:8080/professores");

  if(!response.ok) {
    throw new Error("Erro ao buscar os professores.");
  }

  return response.json();
}

export const deletarProfessor = async (cpf: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/professores/${cpf}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o professor. Tente novamente.");
  }
};