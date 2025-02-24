import styles from "./TabelaTopAlunos.module.css";
import { TopAlunos } from "../../types/topAlunos";
import Paginacao from "../Paginacao/Paginacao";
import { useState } from "react";
interface TabelaTopAlunosProps {
  alunos: TopAlunos[];
}

const ITENS_POR_PAGINA = 4;
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
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(alunos.length / ITENS_POR_PAGINA);
  const inicioIndex = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const alunosPaginados = alunos.slice(inicioIndex, inicioIndex + ITENS_POR_PAGINA);

  return (
    <div>
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
          alunosPaginados.map((aluno) => (
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
    <Paginacao
    paginaAtual={paginaAtual}
    totalPaginas={totalPaginas}
    onPageChange={setPaginaAtual}
  /></div>
  );
};

export default TabelaTopAlunos;
