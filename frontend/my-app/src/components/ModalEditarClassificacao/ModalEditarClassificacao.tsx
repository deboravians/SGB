import ReactDOM from "react-dom";
import React, { useState } from "react";
import styles from "./ModalEditarClassificacao.module.css";

const ModalEditarClassificacao = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {

  const [titulo, setTitulo] = useState("");

  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    // Impede o clique dentro da modal de fechar a mesma
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modalContent} onClick={handleModalClick}>
        <h3>Editar Classificação</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Título</label>
              <input
                type="text"
                placeholder="Insira o titulo da classificação"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.botaoCadastrar}>Cadastrar</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarClassificacao;