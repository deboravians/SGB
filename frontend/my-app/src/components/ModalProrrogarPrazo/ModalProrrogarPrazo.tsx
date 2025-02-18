import { useState } from "react";
import { aumentarPrazo } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";
import styles from "./ModalProrrogarPrazo.module.css";
import { toast } from "react-toastify";

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

  const handleConfirmarPrazo = async () => {
    if (!emprestimo) return;
    setLoading(true);

    try {
      await aumentarPrazo(emprestimo.id);
      onConfirm();
      toast.success("Prazo do empréstimo estendido com sucesso!")
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handleFecharModal = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p className={styles.p1}>Deseja prorrogar o prazo de devolução?</p>
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
