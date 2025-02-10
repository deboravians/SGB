import { Copia } from "../types/copias";

export const cadastrarCopia = async (
  copia: Copia,
  isbnEdicao: string
): Promise<Copia> => {
  const response = await fetch(
    `http://localhost:8080/copias?isbnEdicao=${isbnEdicao}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(copia),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao cadastrar a cópia. Tente novamente.");
  }

  return response.json();
};

export const listarCopias = async (isbn: string): Promise<Copia[]> => {
  const response = await fetch(`http://localhost:8080/copias/${isbn}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar cópias");
  }

  return response.json();
};
