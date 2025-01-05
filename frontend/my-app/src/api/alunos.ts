import { Aluno } from "../types/alunos";

export const cadastrarAluno = async (aluno: Aluno): Promise<Aluno> => {
  const response = await fetch("http://localhost:8080/alunos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar os dados. Tente novamente.");
  }

  return response.json();
};
