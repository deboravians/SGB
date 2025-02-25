import { Classificacao } from "../types/classificacoes";
import { tratarErroResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

export const cadastrarClassificacao = async (classificacao: Classificacao): Promise<Classificacao> => {
    const response = await fetch(`${API_URL}/classificacoes`, {
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
    const response = await fetch(`${API_URL}/classificacoes`);

    if (!response.ok) {
        await tratarErroResponse(response);
    }

    return response.json();
}

export const deletarClassificacao = async (codigo: string): Promise<void> => {
    const response = await fetch(`${API_URL}/classificacoes/${codigo}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        await tratarErroResponse(response);
    }
};

export const atualizarClassificacao = async (codigo: string, titulo: string): Promise<Classificacao> => {
    const response = await fetch(`${API_URL}/classificacoes/${codigo}`, {
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
