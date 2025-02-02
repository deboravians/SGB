import { Edicao } from "../types/edicoes";

export const cadastrarEdicao = async (edicao: Edicao): Promise<Edicao> => {
  const response = await fetch("http://localhost:8080/edicoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(edicao),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar os dados. Tente novamente.");
  }

  return response.json();
};

export const listarEdicoes = async (): Promise<Edicao[]> => {
  const response = await fetch("http://localhost:8080/edicoes");

  if (!response.ok) {
    throw new Error("Erro ao buscar as edições.");
  }

  return response.json();
}