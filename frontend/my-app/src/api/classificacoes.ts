import { Classificacao } from "../types/classificacoes";
import { tratarErroResponse } from "./utils";

export const cadastrarClassificacao = async (classificacao: Classificacao): Promise<Classificacao> => {
    const response = await fetch("http://localhost:8080/classificacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(classificacao),
    });

    if (!response.ok) {
        await tratarErroResponse(response);
    }

    return response.json();
};

export const listarClassificacoes = async (): Promise<Classificacao[]> => {
    const response = await fetch("http://localhost:8080/classificacoes");

    if (!response.ok) {
        await tratarErroResponse(response);
    }

    return response.json();
}

export const deletarClassificacao = async (codigo: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/classificacoes/${codigo}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        await tratarErroResponse(response);
    }
};

export const atualizarClassificacao = async (codigo: string, titulo: string): Promise<Classificacao> => {
    const response = await fetch(`http://localhost:8080/classificacoes/${codigo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo, titulo }),
    });

    if (!response.ok) {
        await tratarErroResponse(response);
    }

    return response.json();
};
