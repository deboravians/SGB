import React, { useState } from "react";
import styles from "./ModalCadastroProfessor.module.css";
import { Professor } from "../../types/professores";
import { cadastrarProfessor } from "../../api/professores";
import { toast } from "react-toastify";



interface ModalCadastroProfessorProps {
  fecharModal: () => void;
  salvarProfessor: (professor: Professor) => void;
}

const ModalCadastroProfessor: React.FC<ModalCadastroProfessorProps> = ({
  fecharModal,
  salvarProfessor,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const savedProfessor = await cadastrarProfessor(formData);
      salvarProfessor(savedProfessor);
      toast.success(`Professor(a) ${savedProfessor.nome} cadastrado(a) com sucesso!`);
      fecharModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (id: keyof Professor, value: string) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Cadastrar professor</h3>
        <form onSubmit={handleSubmit}>
          <h3 className={styles.sectionTitle}>Informações Gerais</h3>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome:</label>
            <input
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              type="text"
              id="nome"
              placeholder="Digite o nome do professor"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
            <label htmlFor="nome">Nome:</label>
              <input
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                placeholder="(00) 00000-0000"
                className={styles.inputField2}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="disciplina">Disciplina:</label>
              <input
                value={formData.disciplina}
                onChange={(e) => handleChange("disciplina", e.target.value)}
                type="text"
                id="disciplina"
                placeholder="Português"
                className={styles.inputField3}
              />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="nome">Nome:</label>
              <input
                value={formData.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
                placeholder="000.000.000-00"
                className={styles.inputField2}
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
                  onChange={(e) => handleChange("rua", e.target.value)}
                  type="text"
                  id="rua"
                  placeholder="Digite a rua"
                  className={styles.inputField1}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bairro">Bairro:</label>
              <input
                value={formData.bairro}
                onChange={(e) => handleChange("bairro", e.target.value)}
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
              onClick={fecharModal}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.botaoCadastrar}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCadastroProfessor;
