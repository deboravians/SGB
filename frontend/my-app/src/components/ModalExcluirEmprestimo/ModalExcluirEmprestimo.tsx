import styles from "./ModalExcluirEmprestimo.module.css";

interface ModalExcluirEmprestimoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalExcluirEmprestimo = ({ isOpen, onClose, onConfirm }: ModalExcluirEmprestimoProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.h3}>Excluir empréstimo</h3>
        <p className={styles.p1}>Tem certeza que deseja excluir esse Empréstimo?</p>
        <div className={styles.p2}><p>Ao realizar essa ação, as informações do empréstimo serão apagadas permanentemente do banco de dados!</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirEmprestimo;