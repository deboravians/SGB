import { useState } from "react";
import styles from "./ModalRegistrarDevolucao.module.css";
import { registrarDevolucao } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";
import { toast } from "react-toastify";

interface ModalRegistrarDevolucaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSuccess: () => void;
  emprestimo: Emprestimo | null;
}

const ModalRegistrarDevolucao: React.FC<ModalRegistrarDevolucaoProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onSuccess,
  emprestimo,
}) => {
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [loading, setLoading] = useState(false);
  const fecharModal = () => {
    setDataDevolucao("");
    onClose();
  };

  const [ano, mes, dia] = dataDevolucao.split("-");
  const dataFormatada = `${dia}/${mes}/${ano}`;

  const handleRegistrarDevolucao = async () => {
    if (!emprestimo) return;
    setLoading(true);

    try {
      await registrarDevolucao(emprestimo.id, dataFormatada);
      onConfirm();
      onSuccess();
      toast.success("Devolução registrada com sucesso!");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Deseja marcar esse empréstimo como devolvido?</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Data de devolução</label>
              <input
                type="date"
                value={dataDevolucao}
                onChange={(e) => setDataDevolucao(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.botaoCancelar}
            onClick={fecharModal}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className={styles.botaoCadastrar}
            onClick={handleRegistrarDevolucao}
            disabled={loading || !dataDevolucao}
          >
            {loading ? "Registrando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalRegistrarDevolucao;
