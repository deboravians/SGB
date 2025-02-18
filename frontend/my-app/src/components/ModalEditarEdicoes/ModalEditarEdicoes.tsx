import { useState, useEffect } from "react";
import styles from "./ModalEditarEdicoes.module.css";
import DropdownClassificacao from "../DropdownClassificacao/DropdownClassificacao";
import { Classificacao } from "../../types/classificacoes";
import { toast } from "react-toastify";
import { Edicao } from "../../types/edicoes";
import { atualizarEdicao, getEdicao } from "../../api/edicoes";

interface ModalDeEditarEdicoesProps {
  isOpen: boolean;
  onClose: () => void;
  edicao: Edicao;
  onSuccess: (updatedEdicao: Edicao) => void;
}

const ModalDeEditarEdicoes: React.FC<ModalDeEditarEdicoesProps> = ({
  isOpen,
  onClose,
  edicao,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Edicao>({ ...edicao });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classificacaoSelecionada, setClassificacaoSelecionada] =
    useState<Classificacao | null>(null);

  useEffect(() => {
    if (isOpen) {
      const buscarEdicaoCompleta = async () => {
        try {
          const edicaoCompleta = await getEdicao(edicao.isbn);
          setFormData(edicaoCompleta);
          if (edicaoCompleta.classificacao) {
            setClassificacaoSelecionada(edicaoCompleta.classificacao);
          }
        } catch (error) {
          toast.error("Erro ao buscar os dados da edição.");
        }
      };
      buscarEdicaoCompleta();
    }
  }, [isOpen, edicao]);

  const handleClassificacaoSelecionada = (classificacao: Classificacao) => {
    setClassificacaoSelecionada(classificacao);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!classificacaoSelecionada) {
      toast.warn("Classificação não selecionada.");
      setIsSubmitting(false);
      return;
    }

    try {
      const updatedEdicao = await atualizarEdicao(
        formData,
        classificacaoSelecionada.codigo
      );

      onSuccess(updatedEdicao);
      toast.success(
        `Dados da edição ${updatedEdicao.titulo} atualizados com sucesso!`
      );
      onClose();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "Erro desconhecido.";
      toast.error(errorMessage);
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

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Editar Edição</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Título</label>
              <input
                type="text"
                id="titulo"
                placeholder="Título"
                value={formData.titulo}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                value={formData.isbn}
                className={styles.input}
                required
                readOnly
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Autor</label>
              <input
                type="text"
                id="autor"
                placeholder="Autor"
                value={formData.autor}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Ano de Publicação</label>
              <input
                type="number"
                id="anoPublicacao"
                placeholder="Ano de Publicação"
                value={formData.anoPublicacao}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <DropdownClassificacao
            onSelectClassificacao={handleClassificacaoSelecionada}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.botaoCadastrar}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeEditarEdicoes;
