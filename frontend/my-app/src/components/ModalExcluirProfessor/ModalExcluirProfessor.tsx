import { deletarProfessor } from "../../api/professores";
import { Professor } from "../../types/professores";
import styles from "./ModalExcluirProfessor.module.css";

interface ModalExcluirProfessorProps {
  isOpen: boolean;
  onClose: () => void;
  professor: Professor;
  onSuccess: () => void;
}

const ModalExcluirProfessor = ({ isOpen, onClose, professor, onSuccess }: ModalExcluirProfessorProps) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await deletarProfessor(professor.cpf);
      onSuccess();
      onClose();
    } catch {
      alert("Erro ao excluir o professor. Tente novamente.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Excluir Professor</h3>
        <p>
          Tem certeza que deseja excluir o(a) professor(a) <strong>{professor.nome}</strong>?
        </p>
        <br></br>
        <p>
          As informações do professor com cpf <strong>{professor.cpf}</strong> serão apagadas permanentemente!
        </p>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirProfessor;