import { Classificacao } from "../types/classificacoes";

export const cadastrarClassificacao = async (classificacao: Classificacao): Promise<Classificacao> => {
    const response = await fetch("http://localhost:8080/classificacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(classificacao),
    });

    if (!response.ok) {
        throw new Error("Erro ao salvar os dados. Tente novamente.");
    }

    return response.json();
};

export const listarClassificacoes = async (): Promise<Classificacao[]> => {
    const response = await fetch("http://localhost:8080/classificacoes");

    if (!response.ok) {
        throw new Error("Erro ao buscar as classificações.");
    }

    return response.json();
}

export const deletarClassificacao = async (codigo: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/classificacoes/${codigo}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Erro ao deletar a classificação. Tente novamente.");
    }
  };