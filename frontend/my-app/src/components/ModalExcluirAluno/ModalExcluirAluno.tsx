import { deletarAluno } from "../../api/alunos";
import { Aluno } from "../../types/alunos";
import styles from "./ModalExcluirAluno.module.css";

interface ModalExcluirAlunoProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: Aluno;
  onSuccess: () => void;
}

const ModalExcluirAluno = ({ isOpen, onClose, aluno, onSuccess }: ModalExcluirAlunoProps) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await deletarAluno(aluno.matricula);
      onSuccess();
      onClose();
    } catch {
      alert("Erro ao excluir o aluno. Tente novamente.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Excluir Aluno</h3>
        <p>
          Tem certeza que deseja excluir o(a) aluno(a) <strong>{aluno.nome}</strong>?
        </p>
        <br></br>
        <p>
          As informações do aluno com matrícula <strong>{aluno.matricula}</strong> serão apagadas permanentemente!
        </p>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirAluno;