import { Aluno } from "../types/alunos";
import { tratarErroResponse } from "./utils";

export const cadastrarAluno = async (aluno: Aluno): Promise<Aluno> => {
  const response = await fetch("http://localhost:8080/alunos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const listarAlunos = async (): Promise<Aluno[]> => {
  const response = await fetch("http://localhost:8080/alunos");

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const deletarAluno = async (matricula: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/alunos/${matricula}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};

export const atualizarAluno = async (aluno: Aluno): Promise<Aluno> => {
    const response = await fetch(`http://localhost:8080/alunos/${aluno.matricula}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matricula: aluno.matricula,
          serie: aluno.serie,
          turma: aluno.turma,
          anoLetivo: aluno.anoLetivo,
          nome: aluno.nome,
          telefone: aluno.telefone,
          rua: aluno.rua,
          bairro: aluno.bairro,
        }),
    });

    if (!response.ok) {
        await tratarErroResponse(response);
    }

    return response.json();
};