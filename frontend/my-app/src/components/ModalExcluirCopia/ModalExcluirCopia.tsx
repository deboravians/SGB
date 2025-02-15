import styles from "./ModalExcluirCopia.module.css";

interface ModalExcluirCopiaProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalExcluirCopia = ({ isOpen, onClose, onConfirm }: ModalExcluirCopiaProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.h3}>Excluir Cópia</h3>
        <p className={styles.p1}> Tem certeza que deseja excluir essa Cópia?</p>
        <div className={styles.p2}><p>Ao realizar essa ação as informações dessa cópia serão apagadas permanentemente do banco de dados!</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirCopia;



