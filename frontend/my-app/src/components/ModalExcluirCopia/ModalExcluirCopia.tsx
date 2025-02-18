import { toast } from "react-toastify";
import styles from "./ModalExcluirCopia.module.css";
import { deletarCopia } from "../../api/copias";

interface ModalExcluirCopiaProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  onSuccess: () => void;
}

const ModalExcluirCopia = ({
  isOpen,
  onClose,
  id,
  onSuccess,
}: ModalExcluirCopiaProps) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await deletarCopia(id);
      onSuccess();
      toast.success(`Cópia com ID ${id} deletada com sucesso!`);
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Excluir Cópia</h3>
        <p>
          Tem certeza que deseja excluir a cópia com ID <strong>{id}</strong>?
        </p>
        <br></br>
        <p>As informações da cópia serão apagadas permanentemente!</p>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.botaoConfirmar} onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirCopia;