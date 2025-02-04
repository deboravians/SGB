import styles from "./ModalLivroExtraviado.module.css";


interface ModalProrrogarPrazoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalProrrogarPrazo = ({ isOpen, onClose, onConfirm }: ModalProrrogarPrazoProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p className={styles.p1}>Deseja definir esse livro como extraviado?</p>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalProrrogarPrazo;