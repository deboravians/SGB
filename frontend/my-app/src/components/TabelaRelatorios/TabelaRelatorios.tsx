import React from "react";
import styles from "./TabelaRelatorios.module.css";

interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  turma: number;
  emprestimos: number;
  colocacao: number;
}

interface TabelaRelatoriosProps {
  alunos: Aluno[];
}

const TabelaRelatorios: React.FC<TabelaRelatoriosProps> = ({ alunos }) => {
  return (
    <table className={styles.tabela}>
      <thead>
        <tr>
          <th>Aluno(a)</th>
          <th>Matrícula</th>
          <th>Turma</th>
          <th>Quantidade de Empréstimos</th>
          <th>Colocação</th>
        </tr>
      </thead>
      <tbody>
        {alunos.map((aluno) => (
          <tr key={aluno.id}>
            <td>{aluno.nome}</td>
            <td>{aluno.matricula}</td>
            <td>{aluno.turma}</td>
            <td>{aluno.emprestimos}</td>
            <td>
              <div className={styles.colocacaoContainer}>
                <span>{aluno.colocacao}</span>
                {aluno.colocacao <= 3 ? (
                  <img
                    src={
                      aluno.colocacao === 1
                        ? "/assets/iconOuro.svg"
                        : aluno.colocacao === 2
                          ? "/assets/iconPrata.svg"
                          : "/assets/iconBronze.svg"
                    }
                    alt={`Medalha de ${aluno.colocacao}`}
                    className={styles.icone}
                  />
                ) : (
                  <span className={styles.placeholderIcon}></span>
                )}
              </div>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaRelatorios;


 
