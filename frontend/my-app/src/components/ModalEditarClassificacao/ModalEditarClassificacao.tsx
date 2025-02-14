import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalEditarClassificacao.module.css";
import { Classificacao } from "../../types/classificacoes";
import { atualizarClassificacao } from "../../api/classificacoes";
import { toast } from "react-toastify";

const ModalEditarClassificacao = ({
  isOpen,
  onClose,
  classificacao,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  classificacao: Classificacao | null;
  onSuccess: () => void;
}) => {
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (classificacao) {
      setTitulo(classificacao.titulo);
    }
  }, [classificacao]);

  if (!isOpen || !classificacao) return null;

  const handleSalvar = async () => {
    if (!titulo.trim()) {
      toast.warn("O título não pode estar vazio.");
      return;
    }

    setLoading(true);

    try {
      await atualizarClassificacao(classificacao.codigo, titulo);
      onSuccess();
      toast.success("Classificação editada com sucesso!")
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Editar Classificação</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Título</label>
              <input
                type="text"
                placeholder="Insira o título da classificação"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button className={styles.botaoSalvar} onClick={handleSalvar} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarClassificacao;
