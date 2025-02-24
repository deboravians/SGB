import { Aluno } from "../types/alunos";
import { Emprestimo } from "../types/emprestimos";
import { tratarErroResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

export const cadastrarAluno = async (aluno: Aluno): Promise<Aluno> => {
  const response = await fetch(`${API_URL}/alunos`, {
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
  const response = await fetch(`${API_URL}/alunos`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const deletarAluno = async (matricula: string): Promise<void> => {
  const response = await fetch(`${API_URL}/alunos/${matricula}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};

export const atualizarAluno = async (aluno: Aluno): Promise<Aluno> => {
  const response = await fetch(`${API_URL}/alunos/${aluno.matricula}`, {
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

export const informacoesAluno = async (matricula: string): Promise<Aluno> => {
  const response = await fetch(`${API_URL}/alunos/${matricula}`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const historicoAluno = async (
  matricula: string
): Promise<Emprestimo[]> => {
  const response = await fetch(`${API_URL}/emprestimos/alunos/${matricula}`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};
