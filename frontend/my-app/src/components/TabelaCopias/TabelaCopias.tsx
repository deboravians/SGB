import React from "react";
import styles from "./TabelaCopias.module.css";
import StatusTag from "../StatusTag/StatusTag";

interface Copia {
id: string;
status: string;
}


interface TabelaCopiasProps {
copias: Copias[];
  }

const TabelaCopias: React.FC<TabelaCopiasProps> = ({ copias }) => {
  return (
    <table className={styles.tabelaCopias}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {copias.map((copia, index) => (
          <tr key={index}>
            <td>{copia.id}</td>
            <td><StatusTag status={copias.status as "Disponivel" | "Indisponivel"} tipo="edicao" /></td>
            <td className={styles.acoes}>
              <button
                className={styles.icone}
                title="Excluir cópia"
         
              >
                <img src="/public/assets/iconlixeira.svg" alt="Devolvido" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaCopias;




 



      
        