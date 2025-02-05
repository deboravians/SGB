import { deletarEdicao } from "../../api/edicoes";
import { Edicao } from "../../types/edicoes";
import styles from "./ModalExcluirEdicao.module.css";

interface ModalExcluirEdicaoProps {
  isOpen: boolean;
  onClose: () => void;
  edicao: Edicao;
  onSuccess: () => void;
}

const ModalExcluirEdicao = ({ isOpen, onClose, edicao, onSuccess }: ModalExcluirEdicaoProps) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await deletarEdicao(edicao.isbn);
      onSuccess();
      onClose();
    } catch {
      alert("Erro ao excluir a edição. Tente novamente.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Excluir Edição</h3>
        <p>
          Tem certeza que deseja excluir a edição <strong>{edicao.titulo}</strong>?
        </p>
        <br></br>
        <p>
          As informações da edição com ISBN <strong>{edicao.isbn}</strong> serão apagadas permanentemente!
        </p>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirEdicao;