import React, { useState, useEffect } from "react";
import styles from "./ModalEditarProfessor.module.css";
import { Professor } from "../../types/professores";

interface ModalEditarProfessorProps {
  fecharModal: () => void;
  salvarProfessor: (professor: Professor) => void;
  professor: Professor;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedProfessor: Professor) => void;
}

const ModalEditarProfessor: React.FC<ModalEditarProfessorProps> = ({
  fecharModal,
  salvarProfessor,
  professor,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Professor>({
    bairro: "",
    nome: "",
    rua: "",
    telefone: "",
    disciplina: "",
    cpf: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (isOpen) {
      setFormData({ ...professor });
    }
  }, [isOpen, professor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
  
  try {
    salvarProfessor(formData); // Salva as alterações
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
      <h3>Editar professor</h3>
      {errorMessage && (
          <div className={styles.errorMessageContainer}>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <div className={styles.progressBar}></div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h3 className={styles.sectionTitle}>Informações Gerais</h3>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome:</label>
              <input
                value={formData.nome}
                onChange={handleChange}
                type="text"
                id="nome"
                placeholder="Digite o nome do professor"
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="telefone">Telefone:</label>
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
                <label htmlFor="disciplina">Disciplina:</label>
                <input
                  value={formData.disciplina}
                  onChange={handleChange}
                  type="text"
                  id="disciplina"
                  placeholder="Português"
                  className={styles.inputField3}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cpf">CPF:</label>
                <input
                  value={formData.cpf}
                  onChange={handleChange}
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  className={styles.inputField2}
                  readOnly
                />
              </div>
            </div>
         

          <h3 className={styles.sectionTitle}>Endereço</h3>
          <div className={styles.addressInfo}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="rua">Rua:</label>
                <input
                  value={formData.rua}
                  onChange={handleChange}
                  type="text"
                  id="rua"
                  placeholder="Digite a rua"
                  className={styles.inputField1}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="numero">Número:</label>
                <input
                  type="text"
                  id="numero"
                  placeholder="0000"
                  className={styles.inputField3}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bairro">Bairro:</label>
              <input
                value={formData.bairro}
                onChange={handleChange}
                type="text"
                id="bairro"
                placeholder="Digite o bairro"
                className={styles.inputField2}
              />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={fecharModal} // Fecha a modal
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.botaoCadastrar} disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarProfessor;
