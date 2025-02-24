import styles from "./PerfilEdicao.module.css";
import TabelaHistoricoEdicoes from "../../components/TabelaHistoricoEdicoes/TabelaHistoricoEdicoes";


const PerfilEdicao = () => {
  const edicao = {
    nome: "Harry Potter",
    isbn: "222222222222",
    autor: "Anaildo Silva",
    classificacao: "Fantasia",
    numerodecopias: "123 cópias cadastradas",
  };
  const historicos = [
    {
      id: "1",
      nome: "Harry Potter",
      dataDevolucao: "15/10/2024 12:34",
      status: "Extraviada",
    },

    {
      id: "1",
      nome: "Harry Potter",
      dataDevolucao: "15/10/2024 12:34",
      status: "Extraviada",
    },

    {
      id: "1",
      nome: "Harry Potter",
      dataDevolucao: "15/10/2024 12:34",
      status: "Extraviada",
    },
   
  ];
  return (
    <div className={styles.mainContent}>
      <div className={styles.dadosPessoais}>
        <h1 className={styles.titulo}>Informações da edição</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>
          Visão geral dos dados da edição
        </p>
        <div className={styles.infoCard}>
          <div className={styles.avatar}>{edicao.nome.charAt(0)}</div>
          <div className={styles.informacoes}>
            <h3>{edicao.nome}</h3>
            <p><strong>ISBN:</strong> {edicao.isbn}</p>
            <p><strong>Autor(a):</strong> {edicao.autor}</p>
          </div>
          <div className={styles.dadosComplementares}>
            <p><strong>Classificação:</strong> {edicao.classificacao}</p>
            <p><strong>Número de cópias:</strong> {edicao.numerodecopias}</p>
          </div>
        </div>
        <TabelaHistoricoEdicoes historicos={historicos} />
      </div>
    </div>
  );
};

export default PerfilEdicao;