import { useState } from "react";
import styles from "./ModalEmprestimoExtraviado.module.css";
import { registrarExtravio } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";

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
  const [erro, setErro] = useState("");

  const handleConfirmarExtravio = async () => {
    if (!emprestimo) return;
    setLoading(true);
    setErro("");

    try {
      await registrarExtravio(emprestimo.id);
      onConfirm();
      onSuccess();
      onClose();
    } catch (error) {
      setErro("Erro ao registrar extravio. Tente novamente.");
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
        <p className={styles.p1}>Deseja definir esse empréstimo como extraviado?</p>
        {erro && <p className={styles.erro}>{erro}</p>}
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