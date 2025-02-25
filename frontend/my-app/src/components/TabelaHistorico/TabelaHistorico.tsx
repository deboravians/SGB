import { useEffect, useState } from "react";
import styles from "./TabelaHistorico.module.css";
import StatusTag from "../StatusTag/StatusTag";
import { historicoAluno } from "../../api/alunos";
import { Emprestimo } from "../../types/emprestimos";
import { historicoProfessor } from "../../api/professores";
import Paginacao from "../Paginacao/Paginacao";
interface TabelaHistoricoProps {
  identificador: string;
  tipo: "aluno" | "professor";
}
const ITENS_POR_PAGINA = 10;
const TabelaHistorico: React.FC<TabelaHistoricoProps> = ({
  identificador,
  tipo,
}) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [historicos, setHistoricos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPaginas = Math.ceil(historicos.length / ITENS_POR_PAGINA);
  const inicioIndex = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const historicosPaginados = historicos.slice(inicioIndex, inicioIndex + ITENS_POR_PAGINA);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const dados =
          tipo === "aluno"
            ? await historicoAluno(identificador)
            : await historicoProfessor(identificador);

        setHistoricos(dados);
      } catch (error) {
        setError("Erro ao carregar o histórico de empréstimos.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [identificador, tipo]);

  if (loading) return <p>Carregando histórico...</p>;
  if (error) return <p className={styles.erro}>{error}</p>;

  return (
    <div className={styles.historicoContainer}>
      <h3 className={styles.titu}>Histórico de Empréstimos e Devoluções</h3>

      <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
          <thead className={styles.tabelaHeader}>
            <tr>
              <th>Edição</th>
              <th>Data do Empréstimo</th>
              <th>Data Prevista de Devolução</th>
              <th>Data de Devolução</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historicosPaginados.map((historico) => (
              <tr key={historico.id}>
                <td>{historico.copia?.edicao?.titulo || "Desconhecido"}</td>
                <td>{historico.dataEmprestimo}</td>
                <td>{historico.dataPrevistaDevolucao}</td>
                <td>{historico.dataDevolucao || "Não devolvido"}</td>
                <td>
                  <StatusTag
                    status={
                      historico.status as
                        | "Atrasado"
                        | "Em Andamento"
                        | "Extraviado"
                        | "Devolvido"
                    }
                    tipo="emprestimo"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onPageChange={setPaginaAtual}
      />
      </div>
    </div>
  );
};

export default TabelaHistorico;
