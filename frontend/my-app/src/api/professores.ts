import { Professor } from "../types/professores";
import { tratarErroResponse } from "./utils";

export const cadastrarProfessor = async (professor: Professor): Promise<Professor> => {
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

export const listarProfessores = async () : Promise<Professor[]> => {
  const response = await fetch("http://localhost:8080/professores");

  if(!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
}

export const deletarProfessor = async (cpf: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/professores/${cpf}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};