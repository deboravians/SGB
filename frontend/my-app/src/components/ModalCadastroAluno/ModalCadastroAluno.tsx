import React, { useState } from "react";
import styles from "./modalCadastroAluno.module.css";
import { Aluno } from "../../types/alunos";
import { cadastrarAluno } from "../../api/alunos";
import { toast } from "react-toastify";

interface ModalCadastroAlunoProps {
  fecharModal: () => void;
  salvarAluno: (aluno: Aluno) => void;
}

const ModalCadastroAluno: React.FC<ModalCadastroAlunoProps> = ({
  fecharModal,
  salvarAluno,
}) => {
  const [formData, setFormData] = useState<Aluno>({
    nome: "",
    matricula: "",
    telefone: "",
    serie: "",
    turma: "",
    anoLetivo: "",
    rua: "",
    numero: "",
    bairro: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const savedAluno = await cadastrarAluno(formData);
      salvarAluno(savedAluno);
      toast.success(`Aluno ${savedAluno.nome} cadastrado com sucesso!`);
      fecharModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Cadastrar aluno</h3>
        <form onSubmit={handleSubmit}>
          <h3 className={styles.sectionTitle}>Informações Gerais</h3>
          <div className={styles.form}>
            <label className={styles.titu} htmlFor="nome">
              Nome:
            </label>
            <input
              value={formData.nome}
              onChange={handleChange}
              type="text"
              id="nome"
              placeholder="Digite o nome do aluno"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.titu} htmlFor="matricula">
                Matricula:
              </label>
              <input
                value={formData.matricula}
                onChange={handleChange}
                type="text"
                id="matricula"
                placeholder="1111111"
                className={styles.inputField2}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.titu} htmlFor="telefone">
                Telefone:
              </label>
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
              <label className={styles.titu} htmlFor="serie">
                Série:
              </label>
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
              <label className={styles.titu} htmlFor="turma">
                Turma:
              </label>
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
              <label className={styles.titulo} htmlFor="anoLetivo">
                Ano Letivo
              </label>
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
                <label className={styles.titu} htmlFor="rua">
                  Rua:
                </label>
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
                <label className={styles.titu} htmlFor="numero">
                  Número:
                </label>
                <input
                  type="text"
                  id="numero"
                  placeholder="0000"
                  className={styles.inputField}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.titu} htmlFor="bairro">
                Bairro:
              </label>
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

export default ModalCadastroAluno;
