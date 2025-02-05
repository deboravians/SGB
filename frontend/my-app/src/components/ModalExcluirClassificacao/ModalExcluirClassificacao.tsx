import { deletarClassificacao } from "../../api/classificacoes";
import { Classificacao } from "../../types/classificacoes";
import styles from "./ModalExcluirClassificacao.module.css";

interface ModalExcluirClassificacaoProps {
  isOpen: boolean;
  onClose: () => void;
  classificacao: Classificacao;
  onSuccess: () => void;
}

const ModalExcluirClassificacao = ({ isOpen, onClose, classificacao, onSuccess }: ModalExcluirClassificacaoProps) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await deletarClassificacao(classificacao.codigo);
      onSuccess();
      onClose();
    } catch {
      alert("Erro ao excluir a classificação. Tente novamente.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Excluir Classificação</h3>
        <p>
          Tem certeza que deseja excluir <strong>{classificacao.titulo}</strong>?
        </p>
        <br></br>
        <p>
          As informações da classificação com código <strong>{classificacao.codigo}</strong> serão apagadas permanentemente!
        </p>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirClassificacao;