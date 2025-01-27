import React from "react";
import { Link } from "react-router-dom";
import styles from "./TabelaLivros.module.css";


interface Livro {
  id: number;
  isbn: string;
  titulo: string;
  status: string;
}


interface TabelaLivrosProps {
  livros: Livro[];
}

const TabelaLivros: React.FC<TabelaLivrosProps> = ({ livros }) => {
  return (
    <table className={styles.tabelaLivros}>
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
        {livros.map((livro, index) => (
          <tr key={index}>
            <td>{livro.isbn}</td>
            <td>{livro.titulo}</td>
            <td>{livro.status}</td>
            <td className={styles.acoes}>
              <Link to={`/visualizar/${livro.id}`} title="Visualizar">
                <img
                  src="/public/assets/iconOlho.svg"
                  alt="Visualizar"
                  className={styles.icone}
                />
              </Link>
              <Link to={`/editar/${livro.id}`} title="Editar">
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

export default TabelaLivros;
