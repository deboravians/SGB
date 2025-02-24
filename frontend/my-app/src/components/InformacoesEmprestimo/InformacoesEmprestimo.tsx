import styles from "./InformacoesEmprestimo.module.css";

interface EmprestimoProps {
  edicao: string;
  copia: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  tipoLeitor: string;
  nomeLeitor: string;
  onClose: () => void;
}

const InformacoesEmprestimo: React.FC<EmprestimoProps> = ({
  edicao,
  copia,
  dataEmprestimo,
  dataDevolucao,
  tipoLeitor,
  nomeLeitor,
  onClose,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}><img src="assets/iconSair.svg" alt="" /></button>
        <h2 className={styles.title}>Informações do empréstimo</h2>
        <div className={styles.divisao}></div>
        <p className={styles.subtitle}>Visão geral das informações do empréstimo</p>

        <div className={styles.infoContainer}>
          <button className={styles.sectionTitle}>Informações gerais</button>

          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <strong>Edição:</strong> {edicao}
            </div>
            <div className={styles.infoBlock}>
              <strong>Tipo do leitor(a):</strong> {tipoLeitor}
            </div>
            <div className={styles.infoBlock}>
              <strong>Cópia:</strong> {copia}
            </div>
            <div className={styles.infoBlock}>
              <strong>Nome do leitor(a):</strong> {nomeLeitor}
            </div>
            <div className={styles.infoBlock}>
              <strong>Data de empréstimo:</strong>
              <span className={styles.date}>{dataEmprestimo}</span>
            </div>
            <div className={styles.infoBlock}>
              <strong>Data prevista de devolução:</strong>
              <span className={styles.date}>{dataDevolucao}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacoesEmprestimo;
