import ReactDOM from "react-dom";
import React, { useState } from "react";
import styles from "./ModalCadastroDeClassificacao.module.css";
import { cadastrarClassificacao } from "../../api/classificacoes";
import { Classificacao } from "../../types/classificacoes";

const ModalCadastroDeClassificacoes = ({
  isOpen,
  onClose,
  onClassificacaoCadastrada,
}: {
  isOpen: boolean;
  onClose: () => void;
  onClassificacaoCadastrada: () => void;
}) => {
  const [classificacao, setClassificacao] = useState<Classificacao>({
    codigo: "",
    titulo: "",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassificacao({
      ...classificacao,
      [e.target.name]: e.target.value,
    });
  };

  const handleCadastrar = async () => {
    if (!classificacao.codigo.trim() || !classificacao.titulo.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      await cadastrarClassificacao(classificacao);

      onClassificacaoCadastrada();

      setClassificacao({ codigo: "", titulo: "" });
    } catch (error) {
      setErro("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Cadastrar Classificação</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Código</label>
              <input
                type="text"
                name="codigo"
                placeholder="Insira o código"
                value={classificacao.codigo}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Título</label>
              <input
                type="text"
                name="titulo"
                placeholder="Insira o título"
                value={classificacao.titulo}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
          {erro && <p className={styles.erro}>{erro}</p>}
        </div>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.botaoCadastrar}
            onClick={handleCadastrar}
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalCadastroDeClassificacoes;
