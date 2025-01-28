import React from "react";
import styles from "./ModalExcluirAluno.module.css";

interface ModalExcluirAlunoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalExcluirAluno = ({ isOpen, onClose, onConfirm }: ModalExcluirAlunoProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.h3}>Excluir Aluno</h3>
        <p className={styles.p1}> Tem certeza que deseja excluir esse Aluno?</p>
        <div className={styles.p2}><p>Ao realizar essa ação as informações do aluno serão apagadas permanentemente do banco de dados!</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoConfirmar} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirAluno;
