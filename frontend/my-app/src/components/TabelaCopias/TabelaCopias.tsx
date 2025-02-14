import styles from "./TabelaCopias.module.css";
import StatusTag from "../StatusTag/StatusTag";
import { Copia } from "../../types/copias";

interface TabelaCopiasProps {
  copias: Copia[];
  // atualizarLista: () => void;
}

const TabelaCopias: React.FC<TabelaCopiasProps> = ({
  copias,
  // atualizarLista,
}) => {
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
                <button className={styles.icone} title="Excluir cópia">
                  <img src="/assets/iconlixeira.svg" alt="Devolvido" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmação de exclusão
      {selectedCopia && (
        <ModalExcluirCopia
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          copia={selectedCopia}
          onSuccess={atualizarLista}
        />
      )} */}
    </>
  );
};

export default TabelaCopias;