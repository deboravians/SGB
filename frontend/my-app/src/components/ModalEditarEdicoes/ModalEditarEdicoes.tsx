import { useState, useEffect } from "react";
import styles from "./ModalEditarEdicoes.module.css";
import DropdownClassificacao from "../DropdownClassificacao/DropdownClassificacao";
import { Classificacao } from "../../types/classificacoes";
import { toast } from "react-toastify";

interface ModalDeEditarEdicoesProps {
  isOpen: boolean;
  onClose: () => void;
  edicao: Edicao;
}

const ModalDeEditarEdicoes: React.FC<ModalDeEditarEdicoesProps> = ({ isOpen, onClose, edicao }) => {
  const [nome, setNome] = useState("");
  const [isbn, setIsbn] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [classificacaoSelecionada, setClassificacaoSelecionada] = useState<Classificacao | null>(null);

  useEffect(() => {
    if (isOpen && edicao) {
      setNome(edicao.nome || "");
      setIsbn(edicao.isbn || "");
      setAutor(edicao.autor || "");
      setAno(edicao.ano || "");
      setClassificacaoSelecionada(edicao.classificacaoSelecionada || null);
    }
  }, [isOpen, edicao]);

  const handleClassificacaoSelecionada = (classificacao: Classificacao) => {
    setClassificacaoSelecionada(classificacao);
  };

  const handleSalvar = () => {
    if (!isbn) {
      toast.warn("O ISBN é obrigatório.");
      return;
    }

    if (!classificacaoSelecionada) {
      toast.warn("Classificação não selecionada.");
      return;
    }

    toast.success("Alterações salvas com sucesso!");
    onClose();
  };

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Editar Edição</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Nome</label>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Autor</label>
              <input
                type="text"
                placeholder="Autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Ano de Publicação</label>
              <input
                type="number"
                placeholder="Ano de Publicação"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <DropdownClassificacao onSelectClassificacao={handleClassificacaoSelecionada} />
        </div>

        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.botaoCadastrar} onClick={handleSalvar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalDeEditarEdicoes;
