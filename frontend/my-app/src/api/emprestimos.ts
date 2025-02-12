import { Emprestimo } from "../types/emprestimos";

export const listarEmprestimos = async (): Promise<Emprestimo[]> => {
  const response = await fetch("http://localhost:8080/emprestimos");

  if (!response.ok) {
    throw new Error("Erro ao buscar os empréstimos.");
  }

  return response.json();
};

export const cadastrarEmprestimo = async (
  tipoLeitor: "aluno" | "professor",
  idCopia: string,
  identificador: string,
  dataEmprestimo: string
): Promise<Emprestimo> => {
  if (!idCopia || !identificador || !dataEmprestimo) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const endpoint =
    tipoLeitor === "aluno"
      ? `http://localhost:8080/emprestimos/alunos?idCopia=${idCopia}&matriculaAluno=${identificador}`
      : `http://localhost:8080/emprestimos/professores?idCopia=${idCopia}&cpfProfessor=${identificador}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dataEmprestimo }),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar o empréstimo. Tente novamente.");
  }

  return response.json();
};