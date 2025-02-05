import { Emprestimo } from "../types/emprestimos";

export const listarEmprestimos = async () : Promise<Emprestimo[]> => {
    const response = await fetch("http://localhost:8080/emprestimos");

    if(!response.ok){
        throw new Error("Erro ao buscar os empréstimos.");
    }

    return response.json();
}