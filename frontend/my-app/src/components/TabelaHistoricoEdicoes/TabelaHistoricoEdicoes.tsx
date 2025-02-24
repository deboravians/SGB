import styles from "./TabelaHistoricoEdicoes.module.css";
import StatusTag from "../StatusTag/StatusTag";
import { historicoEdicao } from "../../api/edicoes";
import { Emprestimo } from "../../types/emprestimos";
import { useEffect, useState } from "react";

interface TabelaHistoricoEdicoesProps {
  isbn: string;
}

const TabelaHistoricoEdicoes: React.FC<TabelaHistoricoEdicoesProps> = ({ isbn }) => {
  const [historicos, setHistoricos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const dados = await historicoEdicao(isbn);

        setHistoricos(dados);
      } catch (error) {
        setError("Erro ao carregar o histórico de empréstimos.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [isbn]);

  if (loading) return <p>Carregando histórico...</p>;
  if (error) return <p className={styles.erro}>{error}</p>;

  return (
    <div className={styles.historicoContainer}>
      <h3 className={styles.titu}>Histórico de cópias emprestadas</h3>

      {/* Contêiner com rolagem interna para a tabela */}
      <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
          <thead className={styles.tabelaHeader}>
            <tr>
              <th>ID da cópia</th>
              <th>Data de Devolução</th>
              <th>Leitor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historicos.map((historico, index) => (
              <tr key={index}>
                <td>{historico.copia.id}</td>
                <td>{historico.dataDevolucao ? historico.dataDevolucao : "Não devolvido"}</td>
                <td>{historico.professor ? historico.professor.nome : historico.aluno?.nome}</td>
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
      </div>
    </div>
  );
};

export default TabelaHistoricoEdicoes;
