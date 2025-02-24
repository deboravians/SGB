import React from "react";
import styles from "./paginacao.module.css";

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onPageChange: (novaPagina: number) => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({
  paginaAtual,
  totalPaginas,
  onPageChange,
}) => {
  if (totalPaginas <= 1) return null;

  return (
    <div className={styles.paginacao}>
      <button onClick={() => onPageChange(paginaAtual - 1)} disabled={paginaAtual === 1}>
        {"<"}
      </button>

      <span>{`${paginaAtual} para ${totalPaginas}`}</span>

      <button onClick={() => onPageChange(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
        {">"}
      </button>
    </div>
  );
};

export default Paginacao;

