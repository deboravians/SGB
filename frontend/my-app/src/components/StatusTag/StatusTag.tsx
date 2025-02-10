import styles from "./StatusTag.module.css";

type Status = "Em Andamento" | "Emprestada" | "Disponível" | "Indisponível" | "Pendente" | "Extraviado" | "Devolvido" | "Atrasado";
type TipoStatus = "edicao" | "emprestimo" | "copia";

interface StatusTagProps {
  status: Status;
  tipo: TipoStatus;
}

// classes CSS
const cores: Record<TipoStatus, Record<string, string>> = {
  copia: {
    "Disponível": "disponivel",
    "Emprestada": "emprestada",
    "Extraviada": "extraviada",
  },
  edicao: {
    "Disponível": "disponivel",
    "Indisponível": "indisponivel",
  },
  emprestimo: {
    "Atrasado": "atrasado",
    "Em Andamento": "emAndamento",
    "Extraviado": "extraviado",
    "Devolvido": "devolvido",
  },
};


const StatusTag: React.FC<StatusTagProps> = ({ status, tipo }) => {
  const classeStatus = cores[tipo]?.[status] ?? "default";

  return <span className={`${styles.status} ${styles[classeStatus]}`}>{status}</span>;
};

export default StatusTag;