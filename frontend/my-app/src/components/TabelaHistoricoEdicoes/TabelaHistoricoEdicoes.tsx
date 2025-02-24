import styles from "./TabelaHistoricoEdicoes.module.css";
import StatusTag from "../StatusTag/StatusTag";

const TabelaHistoricoEdicoes = ({ historicos }) => {
  return (
    <div className={styles.historicoContainer}>
      <h3 className={styles.titu}>Histórico de cópias emprestadas</h3>

      {/* Contêiner com rolagem interna para a tabela */}
      <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
          <thead className={styles.tabelaHeader}>
            <tr>
              <th>ID da cópia</th>
              <th>Nome da cópia</th>
              <th>Data de Devolução</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historicos.map((historico, index) => (
              <tr key={index}>
                <td>{historico.id}</td>
                <td>{historico.nome}</td>
                <td>{historico.dataDevolucao}</td>
                <td>
                  <StatusTag status={historico.status} tipo="historico" />
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


