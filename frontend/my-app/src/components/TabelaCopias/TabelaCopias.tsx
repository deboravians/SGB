import { useState } from "react";
import styles from "./TabelaCopias.module.css";
import StatusTag from "../StatusTag/StatusTag";
import { Copia } from "../../types/copias";
import ModalExcluirCopia from "../ModalExcluirCopia/ModalExcluirCopia";

interface TabelaCopiasProps {
  copias: Copia[];
  atualizarLista: () => void;
}

const TabelaCopias: React.FC<TabelaCopiasProps> = ({ copias, atualizarLista }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCopia, setSelectedCopia] = useState<Copia | null>(null);

  const handleOpenModal = (copia: Copia) => {
    setSelectedCopia(copia);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCopia(null);
    setIsModalOpen(false);
  };

  return (
    <>
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
              <td>
                <StatusTag
                  status={copia.status as "Extraviada" | "Disponível" | "Emprestada"}
                  tipo="copia"
                />
              </td>
              <td className={styles.acoes}>
                <button
                  className={styles.icone}
                  title="Excluir cópia"
                  onClick={() => handleOpenModal(copia)}
                >
                  <img src="/assets/iconlixeira.svg" alt="Excluir cópia" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmação de exclusão */}
      {selectedCopia && (
        <ModalExcluirCopia
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          id={selectedCopia.id}
          onSuccess={atualizarLista}
        />
      )}
    </>
  );
};

export default TabelaCopias;
