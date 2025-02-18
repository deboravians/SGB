import { useState } from "react";
import styles from "./ModalEmprestimoExtraviado.module.css";
import { registrarExtravio } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";
import { toast } from "react-toastify";

interface ModalEmprestimoExtraviadoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSuccess: () => void;
  emprestimo: Emprestimo | null;
}

const ModalEmprestimoExtraviado = ({
  isOpen,
  onClose,
  onConfirm,
  onSuccess,
  emprestimo,
}: ModalEmprestimoExtraviadoProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmarExtravio = async () => {
    if (!emprestimo) return;
    setLoading(true);

    try {
      await registrarExtravio(emprestimo.id);
      onConfirm();
      onSuccess();
      toast.success("Empréstimo extraviado com sucesso!")
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
        <p className={styles.p1}>Deseja definir esse empréstimo como extraviado?</p>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={handleFecharModal} disabled={loading}>
            Cancelar
          </button>
          <button
            className={styles.botaoConfirmar}
            onClick={handleConfirmarExtravio}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEmprestimoExtraviado;