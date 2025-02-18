import { useState } from "react";
import styles from "./ModalCadastroCopia.module.css";
import { Edicao } from "../../types/edicoes";
import { cadastrarCopia } from "../../api/copias";
import { Copia } from "../../types/copias";
import { toast } from "react-toastify";

interface ModalCadastroCopiaProps {
  edicao: Edicao;
  isOpen: boolean;
  onClose: () => void;
  onCopiaCadastrada: () => void;
}

const ModalCadastroCopia: React.FC<ModalCadastroCopiaProps> = ({
  edicao,
  isOpen,
  onClose,
  onCopiaCadastrada,
}) => {
  const [idCopia, setIdCopia] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastrar = async () => {
    if (!idCopia.trim()) {
      toast.warn("O ID da cópia é obrigatório.");
      return;
    }

    setLoading(true);

    try {
      const novaCopia: Copia = {
        id: idCopia,
        status: "Disponível",
        edicao,
      };

      await cadastrarCopia(novaCopia, edicao.isbn);
      onCopiaCadastrada();
      toast.success("Cópia cadastrada com sucesso!");
      onClose();
    } catch (error) {
      toast.error(
        "Erro ao cadastrar a cópia. Verifique o ID e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Cadastrar Cópia</h3>
        <p className={styles.sectionTitle}>{edicao.titulo}</p>

        <input
          type="text"
          placeholder="Digite o ID da cópia..."
          value={idCopia}
          onChange={(e) => setIdCopia(e.target.value)}
          className={styles.campoTexto}
        />
        <div className={styles.modalActions}>
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
    </div>
  );
};

export default ModalCadastroCopia;
