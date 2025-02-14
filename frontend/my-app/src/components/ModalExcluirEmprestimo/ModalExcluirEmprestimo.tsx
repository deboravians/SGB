import { useState } from "react";
import { deletarEmprestimo } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";
import styles from "./ModalExcluirEmprestimo.module.css";
import { toast } from "react-toastify";

interface ModalExcluirEmprestimoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSuccess: () => void;
  emprestimo: Emprestimo | null;
}

const ModalExcluirEmprestimo = ({
  isOpen,
  onClose,
  onConfirm,
  onSuccess,
  emprestimo,
}: ModalExcluirEmprestimoProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmarDeletar = async () => {
    if (!emprestimo) return;
    setLoading(true);
    try {
      await deletarEmprestimo(emprestimo.id);
      onConfirm();
      toast.success("Empréstimo deletado com sucesso!");
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
        <h3 className={styles.h3}>Excluir empréstimo</h3>
        <p className={styles.p1}>
          Tem certeza que deseja excluir esse Empréstimo?
        </p>
        <div className={styles.p2}>
          <p>
            Ao realizar essa ação as informações do empréstimo serão apagadas
            permanentemente do banco de dados!
          </p>
        </div>
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
            onClick={handleConfirmarDeletar}
            disabled={loading}
          >
            {loading ? "Deletando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirEmprestimo;
