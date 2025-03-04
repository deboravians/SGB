import { Copia } from "../types/copias";
import { tratarErroResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

export const cadastrarCopia = async (
  copia: Copia,
  isbnEdicao: string
): Promise<Copia> => {
  const response = await fetch(`${API_URL}/copias?isbnEdicao=${isbnEdicao}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(copia),
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const listarCopias = async (isbn: string): Promise<Copia[]> => {
  const response = await fetch(`${API_URL}/copias/${isbn}`);

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  return response.json();
};

export const deletarCopia = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/copias/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await tratarErroResponse(response);
  }
};
