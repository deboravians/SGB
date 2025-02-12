import React, { useState, useEffect } from "react";
import styles from "./modalEditarAluno.module.css";
import { Aluno } from "../../types/alunos";

interface ModalEditarAlunoProps {
  fecharModal: () => void;
  salvarAlteracoes: (aluno: Aluno) => void;
  aluno: Aluno;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedAluno: Aluno) => void;
}

const ModalEditarAluno: React.FC<ModalEditarAlunoProps> = ({
  fecharModal,
  salvarAlteracoes,
  aluno,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Aluno>({ ...aluno });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...aluno });
    }
  }, [isOpen, aluno]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      salvarAlteracoes(formData); // Salva as alterações
      onSuccess(formData); // Retorna o aluno atualizado
      fecharModal(); // Fecha o modal
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "Erro desconhecido.";
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  if (!isOpen) {
    return null; // Não renderiza nada se o modal não estiver aberto
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Editar aluno</h3>
        {errorMessage && (
          <div className={styles.errorMessageContainer}>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <div className={styles.progressBar}></div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h3 className={styles.sectionTitle}>Informações Gerais</h3>
          <div className={styles.form}>
            <label className={styles.titu} htmlFor="nome">Nome:</label>
            <input
              value={formData.nome}
              onChange={handleChange}
              type="text"
              id="nome"
              placeholder="Digite o nome do aluno"
              className={styles.input}
            />
          </div>
          
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.titu} htmlFor="matricula">Matricula:</label>
              <input
                value={formData.matricula}
                onChange={handleChange}
                type="text"
                id="matricula"
                placeholder="1111111"
                className={styles.inputField2}
                readOnly
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.titu} htmlFor="telefone">Telefone:</label>
              <input
                value={formData.telefone}
                onChange={handleChange}
                type="text"
                id="telefone"
                placeholder="(00) 00000-0000"
                className={styles.inputField2}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.titu} htmlFor="serie">Série:</label>
              <select
                value={formData.serie}
                onChange={handleChange}
                id="serie"
                className={styles.inputField3}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.titu} htmlFor="turma">Turma:</label>
              <input
                value={formData.turma}
                onChange={handleChange}
                type="text"
                id="turma"
                placeholder="A"
                className={styles.inputField3}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.titulo} htmlFor="anoLetivo">Ano Letivo</label>
              <input
                type="text"
                id="anoLetivo"
                placeholder="Ano letivo"
                value={formData.anoLetivo}
                onChange={handleChange}
                className={styles.inputFielddd}
              />
            </div>

          </div>

          <h3 className={styles.sectionTitle}>Endereço</h3>
          <div className={styles.addressInfo}>
          <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.titu} htmlFor="rua">Rua:</label>
                <input
                  value={formData.rua}
                  onChange={handleChange}
                  type="text"
                  id="rua"
                  placeholder="Digite a rua"
                  className={styles.inputField2}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.titu} htmlFor="numero">Número:</label>
                <input
                  type="text"
                  id="numero"
                  placeholder="0000"
                  className={styles.inputField}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.titu} htmlFor="bairro">Bairro:</label>
              <input
                value={formData.bairro}
                onChange={handleChange}
                type="text"
                id="bairro"
                placeholder="Digite o bairro"
                className={styles.inputFieldd}
              />
            </div>
          </div>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={fecharModal}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.botaoSalvar} disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarAluno;
