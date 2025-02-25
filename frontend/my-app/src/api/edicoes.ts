import { Edicao } from "../types/edicoes";
import { Emprestimo } from "../types/emprestimos";
import { tratarErroResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

export const getEdicao = async (isbn: string): Promise<Edicao> => {
  const response = await fetch(`${API_URL}/edicoes/${isbn}`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const cadastrarEdicao = async (
  edicao: Edicao,
  classificacaoCodigo: string
): Promise<Edicao> => {
  const response = await fetch(
    `${API_URL}/edicoes?classificacao_codigo=${classificacaoCodigo}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isbn: edicao.isbn,
        titulo: edicao.titulo,
        autor: edicao.autor,
        anoPublicacao: edicao.anoPublicacao,
        status: edicao.status,
        qtdCopias: edicao.qtdCopias,
      }),
    }
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const listarEdicoes = async (): Promise<Edicao[]> => {
  const response = await fetch(`${API_URL}/edicoes`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const deletarEdicao = async (isbn: string): Promise<void> => {
  const response = await fetch(`${API_URL}/edicoes/${isbn}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};

export const atualizarEdicao = async (
  edicao: Edicao,
  classificacao_codigo: string
): Promise<Edicao> => {
  const response = await fetch(
    `${API_URL}/edicoes/${edicao.isbn}?classificacao_codigo=${classificacao_codigo}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: edicao.titulo,
        autor: edicao.autor,
        anoPublicacao: edicao.anoPublicacao,
        isbn: edicao.isbn,
      }),
    }
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const informacoesEdicao = async (isbn: string): Promise<Edicao> => {
  const response = await fetch(`${API_URL}/edicoes/${isbn}`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const historicoEdicao = async (isbn: string): Promise<Emprestimo[]> => {
  const response = await fetch(`${API_URL}/emprestimos/edicoes/${isbn}`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};
