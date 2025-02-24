import styles from "./TabelaTopAlunos.module.css";
import { TopAlunos } from "../../types/topAlunos";

interface TabelaTopAlunosProps {
  alunos: TopAlunos[];
}

const medalhas: Record<number, string> = {
  1: "assets/iconOuro.svg",
  2: "assets/iconPrata.svg",
  3: "assets/iconBronze.svg",
};

const medalhaNomes: Record<number, string> = {
  1: "Medalha de Ouro",
  2: "Medalha de Prata",
  3: "Medalha de Bronze",
};

const TabelaTopAlunos: React.FC<TabelaTopAlunosProps> = ({ alunos }) => {
  return (
    <table className={styles.tabela}>
      <thead>
        <tr>
          <th>Aluno(a)</th>
          <th>Matrícula</th>
          <th>Quantidade de Empréstimos</th>
          <th>Colocação</th>
        </tr>
      </thead>
      <tbody>
        {alunos.length === 0 ? (
          <tr>
            <td colSpan={5} className={styles.mensagemVazia}>
              Nenhum aluno encontrado no período selecionado.
            </td>
          </tr>
        ) : (
          alunos.map((aluno) => (
            <tr key={aluno.matricula}>
              <td>{aluno.nome}</td>
              <td>{aluno.matricula}</td>
              <td>{aluno.totalEmprestimos}</td>
              <td>
                <div className={styles.colocacaoContainer}>
                  <span>{aluno.colocacao}</span>
                  {aluno.colocacao <= 3 ? (
                    <img
                      src={medalhas[aluno.colocacao]}
                      alt={medalhaNomes[aluno.colocacao]}
                      className={styles.icone}
                    />
                  ) : (
                    <span className={styles.placeholderIcon}></span>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TabelaTopAlunos;
