import React from "react";
import { Link } from "react-router-dom";
import styles from "./TabelaEdicoes.module.css";
import { Edicao } from "../../types/edicoes";


interface TabelaEdicoesProps {
  edicoes: Edicao[];
}

const TabelaEdicoes: React.FC<TabelaEdicoesProps> = ({ edicoes }) => {
  return (
    <table className={styles.tabelaEdicoes}>
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Livro</th>
          <th>Status</th>
          <th>Ações</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {edicoes.map((edicao, index) => (
          <tr key={index}>
            <td>{edicao.isbn}</td>
            <td>{edicao.titulo}</td>
            <td>{edicao.status}</td>
            <td className={styles.acoes}>
              <Link to={`/visualizar/${edicao.isbn}`} title="Visualizar">
                <img
                  src="/public/assets/iconOlho.svg"
                  alt="Visualizar"
                  className={styles.icone}
                />
              </Link>
              <Link to={`/editar/${edicao.isbn}`} title="Editar">
                <img
                  src="/public/assets/iconLapis.svg"
                  alt="Editar"
                  className={styles.icone}
                />
              </Link>
              <button
                className={styles.icone}
                title="Apagar"
                onClick={() => alert("Deseja apagar?")}
              >
                <img src="/public/assets/iconlixeira.svg" alt="Apagar" />
              </button>
            </td>
            <td className={styles.gerenciarCopias}> 
        <button
          className={styles.gerenciarCopiass}
          onClick={() => alert("Gerenciar Cópias")}
        >
          <img
            src="/public/assets/iconGerenciarcópias.svg"
            alt="Gerenciar Cópias"
            className={styles.icone}
          />
          Gerenciar cópias
        </button>
      </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaEdicoes;
