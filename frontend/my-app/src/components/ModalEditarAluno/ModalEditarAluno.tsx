import { useState, useEffect } from "react";
import styles from "./modalEditarAluno.module.css";
import { Aluno } from "../../types/alunos";
import { atualizarAluno } from "../../api/alunos";
import { toast } from "react-toastify";

interface ModalEditarAlunoProps {
  aluno: Aluno;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedAluno: Aluno) => void;
}

const ModalEditarAluno: React.FC<ModalEditarAlunoProps> = ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const updatedAluno = await atualizarAluno(formData);
      onSuccess(updatedAluno);
      toast.success(`Dados do(a) aluno(a) ${updatedAluno.nome} atualizados com sucesso!`);
      onClose();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "Erro desconhecido.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  if (!isOpen) return null;

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
              <label className={styles.titu} htmlFor="matricula">Matrícula:</label>
              <input
                value={formData.matricula}
                type="text"
                id="matricula"
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
                className={styles.inputField2}
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
                  className={styles.inputField2}
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
                className={styles.inputFieldd}
              />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={onClose}
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
