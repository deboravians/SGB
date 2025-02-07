import { Aluno } from "./alunos";
import { Professor } from "./professores";
import { Copia } from "./copias";

export interface Emprestimo {
    id: string;
    dataEmprestimo: string;
    dataDevolucao: string | null;
    dataPrevistaDevolucao: string;
    status: string;
    aluno?: Aluno;
    professor?: Professor;
    copia: Copia;
  }