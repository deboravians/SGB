import styles from "./StatusTag.module.css";

type Status = "Disponível" | "Indisponível" | "pendente" | "extraviado" | "devolvido";
type TipoStatus = "edicao" | "emprestimo";

interface StatusTagProps {
  status: Status;
  tipo?: TipoStatus;
}

// classes CSS
const cores: Record<TipoStatus, Record<string, string>> = {
  edicao: {
    "Disponível": "disponivel",
    "Indisponível": "indisponivel",
  },
  emprestimo: {
    "pendente": "pendente",
    "extraviado": "extraviado",
    "devolvido": "devolvido",
  },
};

const StatusTag: React.FC<StatusTagProps> = ({ status, tipo = "edicao" }) => {
  const classeStatus = cores[tipo]?.[status] ?? "default";

  return <span className={`${styles.status} ${styles[classeStatus]}`}>{status}</span>;
};

export default StatusTag;
