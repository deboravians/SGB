import styles from "./ModalLivroExtraviado.module.css";


interface ModalLivroExtraviadoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalLivroExtraviado = ({ isOpen, onClose, onConfirm }: ModalLivroExtraviadoProps) => {
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

export default ModalLivroExtraviado;