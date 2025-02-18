import { useState } from "react";
import styles from "./ModalEditarEmprestimo.module.css";
import DropdownEdicoes from "../DropdownEdicoes/DropdownEdicoes";
import DropdownLeitores from "../DropdownLeitores/DropdownLeitores";

const ModalEditarEmprestimo = ({
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
  const [livroSelecionado, setLivroSelecionado] = useState<any>(null);

   const handleLivroSelecionado = (livro: any) => {
    setLivroSelecionado(livro); // Atualiza o livro selecionado
  };
 
const handleLeitorSelecionado = (leitor: any) => {
  setLeitorSelecionado(leitor); // Atualiza o leitor selecionado
};


  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Editar Empréstimo</h3>
        <div className={styles.form}>
          <div className={styles.row}>
          <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Livro</label>
              <DropdownEdicoes onSelectLivro={handleLivroSelecionado} />
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Leitor</label>
              <DropdownLeitores onSelectLeitor={handleLeitorSelecionado} />
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

export default ModalEditarEmprestimo;




