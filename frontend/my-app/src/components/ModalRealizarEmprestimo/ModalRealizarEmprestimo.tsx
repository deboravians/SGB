import React, { useState } from "react";
import styles from "./ModalRealizarEmprestimo.module.css";
import DropdownLivros from "../DropdownLivros/DropdownLivros";
//import DropdownLeitores from "../../../../../../modais/DropdownLeitores/DropdownLeitores";

const ModalRealizarEmprestimo = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [ano, setAno] = useState("");
  const [leitorSelecionado, setLeitorSelecionado] = useState<any>(null);

   const handleLivroSelecionado = (livro: any) => {
    setLivroSelecionado(livro); // Atualiza o livro selecionado
  };

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Realizar Empréstimo</h3>
        <div className={styles.form}>
          <div className={styles.row}>
          <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Livro</label>
              <DropdownLivros onSelectLivro={handleLivroSelecionado} />
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Data de Empréstimo</label>
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

export default ModalRealizarEmprestimo;
2




