import React, { useState } from "react";
import styles from "./ModalRegistrarDevolucao.module.css";

const ModalRegistrarDevolução = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [ano, setAno] = useState("");
 


  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Deseja marcar esse empréstimo como devolvido?</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Data de devolução</label>
              <input
                type="date"
                placeholder="Data de Empréstimo"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Botões de Ação no canto inferior direito */}
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoCadastrar} onClick={onConfirm}>Cadastrar</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalRegistrarDevolução;
2




