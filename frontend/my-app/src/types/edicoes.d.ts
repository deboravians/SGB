import { Classificacao } from "./classificacoes";

export interface Edicao {
    isbn: string;
    titulo: string;
    autor: string;
    anoPublicacao: string;
    status: string;
    qtdCopias: number;
    classificacao?: Classificacao;
}
