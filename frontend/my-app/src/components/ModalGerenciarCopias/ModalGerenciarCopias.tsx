import { useState } from "react";
import styles from "./ModalGerenciarCopias.module.css";

interface Copia {
  id: string;
  status: "Disponível" | "Indisponível";
}

interface ModalGerenciarCopiasProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalGerenciarCopias: React.FC<ModalGerenciarCopiasProps> = ({ isOpen, onClose }) => {

  const [copias, setCopias] = useState<Copia[]>([
    { id: "1", status: "Disponível" },
    { id: "2", status: "Indisponível" },
    { id: "3", status: "Disponível" },
  ]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src="/assets/iconSair.svg" alt="Fechar" />
        </button>

        <h3>Gerenciamento de cópias de livros</h3>
        <div className={styles.nomeLivro}>
            Harry Potter
          </div>
        <div className={styles.acoesContainer}>
          <input
            type="text"
            placeholder="Pesquisar por id..."
            className={styles.campoPesquisa}
          />
          <button className={styles.botaoCadastrar}>
            <img src="/assets/iconCadastrar.svg" alt="Cadastrar" className={styles.icone} />
            Cadastrar Cópia
          </button>
        </div>
        <table className={styles.tabelaCopias}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {copias.map((copia) => (
              <tr key={copia.id}>
                <td>{copia.id}</td>
                <td>{copia.status}</td>
                <td>
                  <button
                    className={styles.excluirButton}
                  //onClick={() => handleExcluirCopia(copia.id)}
                  >
                    <img src="/assets/iconlixeira.svg" alt="Excluir" title="Excluir" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default ModalGerenciarCopias;
