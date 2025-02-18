import { Edicao } from "../types/edicoes";
import { tratarErroResponse } from "./utils";

export const getEdicao = async (isbn: string): Promise<Edicao> => {
  const response = await fetch(`http://localhost:8080/edicoes/${isbn}`);

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
    `http://localhost:8080/edicoes?classificacao_codigo=${classificacaoCodigo}`,
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
  const response = await fetch("http://localhost:8080/edicoes");

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const deletarEdicao = async (isbn: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/edicoes/${isbn}`, {
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
    `http://localhost:8080/edicoes/${edicao.isbn}?classificacao_codigo=${classificacao_codigo}`,
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
