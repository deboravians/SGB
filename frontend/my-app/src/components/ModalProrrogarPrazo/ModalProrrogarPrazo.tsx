import { useState } from "react";
import { aumentarPrazo } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";
import styles from "./ModalProrrogarPrazo.module.css";

interface ModalProrrogarPrazoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSuccess: () => void;
  emprestimo: Emprestimo | null;
}

const ModalProrrogarPrazo = ({
  isOpen,
  onClose,
  onConfirm,
  onSuccess,
  emprestimo,
}: ModalProrrogarPrazoProps) => {

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleConfirmarPrazo = async () => {
    if (!emprestimo) return;
    setLoading(true);
    setErro("");

    try {
      await aumentarPrazo(emprestimo.id);
      onConfirm();
      onSuccess();
      onClose();
    } catch (error) {
      setErro("Erro ao aumentar prazo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFecharModal = () => {
    setErro("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p className={styles.p1}>Deseja prorrogar o prazo de devolução?</p>
        {erro && <p className={styles.erro}>{erro}</p>}
        <div className={styles.actions}>
          <button
            className={styles.botaoCancelar}
            onClick={handleFecharModal}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className={styles.botaoConfirmar}
            onClick={handleConfirmarPrazo}
            disabled={loading}
          >
            {loading ? "Confirmando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProrrogarPrazo;
