import styles from "./ModalExcluirClassificacao.module.css";

interface ModalExcluirClassificacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalExcluirClassificacao = ({ isOpen, onClose, onConfirm }: ModalExcluirClassificacaoProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.h3}>Excluir classificação</h3>
        <p className={styles.p1}>Tem certeza que deseja excluir essa classificação?</p>
        <div className={styles.p2}><p>Ao realizar essa ação as informações da classificação serão apagadas permanentemente do banco de dados!</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirClassificacao;