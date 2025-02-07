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
    throw new Error("Erro, preencha todos os campos!");
  }

 
  return response.json();
};

export const listarAlunos = async () : Promise<Aluno[]> => {
  const response = await fetch("http://localhost:8080/alunos");

  if(!response.ok) {
    throw new Error("Erro ao buscar os alunos.");
  }

  return response.json();
}

export const deletarAluno = async (matricula: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/alunos/${matricula}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o aluno. Tente novamente.");
  }
};