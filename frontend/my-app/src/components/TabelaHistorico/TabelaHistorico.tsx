import React from "react";
import styles from "./TabelaHistorico.module.css";
import StatusTag from "../StatusTag/StatusTag";

const TabelaHistorico = ({ historicos }) => {
  return (
    <div className={styles.historicoContainer}>
      <h3 className={styles.titu}>Histórico de Empréstimos e Devoluções</h3>

      {/* Contêiner com rolagem interna para a tabela */}
      <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
          <thead className={styles.tabelaHeader}>
            <tr>
              <th>Livro</th>
              <th>Data do Empréstimo</th>
              <th>Data de Devolução</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historicos.map((historico, index) => (
              <tr key={index}>
                <td>{historico.livro}</td>
                <td>{historico.dataEmprestimo}</td>
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

export default TabelaHistorico;



