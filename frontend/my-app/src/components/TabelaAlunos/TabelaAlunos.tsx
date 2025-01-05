import React from "react";
import { Link } from "react-router-dom";
import styles from "./tabelaAlunos.module.css";
import { Aluno } from "../../types/alunos";

interface TabelaAlunosProps {
  alunos: Aluno[];
}

const TabelaAlunos: React.FC<TabelaAlunosProps> = ({ alunos }) => {
  return (
    <table className={styles.tabela}>
      <thead>
        <tr>
          <th>Matrícula</th>
          <th>Nome</th>
          <th>Série</th>
          <th>Turma</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {alunos.map((aluno) => (
          <tr key={aluno.matricula}>
            <td>{aluno.matricula}</td>
            <td>{aluno.nome}</td>
            <td>{aluno.serie}</td>
            <td>{aluno.turma}</td>
            <td>
              <Link to={`/visualizar/${aluno.matricula}`} title="Visualizar">
                <img
                  src="/public/assets/iconOlho.svg"
                  alt="Visualizar"
                  className={styles.icone}
                />
              </Link>
              <Link to={`/editar/${aluno.matricula}`} title="Editar">
                <img
                  src="/public/assets/iconLapis.svg"
                  alt="Editar"
                  className={styles.icone}
                />
              </Link>

              <button className={styles.icone} onClick={() => alert("Deseja deletar o aluno? Essa ação é irreversível.")}>
                <img src="/public/assets/iconlixeira.svg" alt="Apagar" />
              </button>

              <Link to={`/devolucao/1`} title="Devolução">
                <img
                  src="/public/assets/iconOk.svg"
                  alt="Devolução"
                  className={styles.icone}
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaAlunos;