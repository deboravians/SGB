import React from "react";
import { Link } from "react-router-dom";
import styles from "./TabelaEmprestimos.module.css";
import StatusTag from "../StatusTag/StatusTag";

interface Emprestimo {
  livro: string;
  leitor: string;
  isbn: string;
  status: string;
}

interface TabelaEmprestimosProps {
  emprestimos: Emprestimo[];
}

const TabelaEmprestimos: React.FC<TabelaEmprestimosProps> = ({ emprestimos }) => {
  return (
    <table className={styles.tabelaEmprestimos}>
      <thead>
        <tr>
          <th>Livro</th>
          <th>Leitor(a)</th>
          <th>ISBN</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {emprestimos.map((emprestimo, index) => (
          <tr key={index}>
            <td>{emprestimo.livro}</td>
            <td>{emprestimo.leitor}</td>
            <td>{emprestimo.isbn}</td>
            <td><StatusTag status={emprestimos.status as "Disponivel" | "Indisponivel"} tipo="edicao" /></td>
            <td className={styles.acoes}>
              <Link to={`/visualizar/${emprestimo}`} title="Prorrogar prazo">
                <img
                  src="/public/assets/iconProrrogar.svg"
                  alt="Prorrogar prazo"
                  className={styles.icone0}
                />
              </Link>
              <Link to={`/visualizar/${emprestimo}`} title="Livro extraviado">
                <img
                  src="/public/assets/iconExtraviado.svg"
                  alt="Livro extraviado"
                  className={styles.icone1}
                />
              </Link>
              <Link to={`/visualizar/${emprestimo}`} title="Editar">
                <img
                  src="/public/assets/iconLapis.svg"
                  alt="Editar"
                  className={styles.icone}
                />
              </Link>
              <button
                className={styles.icone}
                title="Excluir empréstimo"
         
              >
                <img src="/public/assets/iconlixeira.svg" alt="Devolvido" />
              </button>
              <button
                className={styles.icone}
                title="Marcar como devolvido"
                onClick={() => alert("Marcar como devolvido")}
              >
                <img src="/public/assets/iconOk.svg" alt="Devolvido" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaEmprestimos;




 



      
        