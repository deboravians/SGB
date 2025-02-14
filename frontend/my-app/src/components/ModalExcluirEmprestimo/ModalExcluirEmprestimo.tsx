import { useState } from "react";
import { deletarEmprestimo } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";
import styles from "./ModalExcluirEmprestimo.module.css";

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
  const [erro, setErro] = useState("");

  const handleConfirmarDeletar = async () => {
    if (!emprestimo) return;
    setLoading(true);
    setErro("");

    try {
      await deletarEmprestimo(emprestimo.id);
      onConfirm();
      onSuccess();
      onClose();
    } catch (error) {
      setErro("Erro ao deletar empréstimo. Tente novamente.");
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
        <h3 className={styles.h3}>Excluir empréstimo</h3>
        <p className={styles.p1}>
          Tem certeza que deseja excluir esse Empréstimo?
        </p>
        {erro && <p className={styles.erro}>{erro}</p>}
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