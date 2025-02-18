import React, { useState } from "react";
import TabelaRelatorios from "../../components/TabelaRelatorios/TabelaRelatorios";
import styles from "./RelatoriosEstatisticas.module.css";

const Relatorios = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const alunos = [
    { nome: "Francisco Werley", matricula: "20250101", turma: "1", emprestimos: 10, colocacao: 1 },
    { nome: "Anaildo Silva", matricula: "20250102", turma: "2", emprestimos: 8, colocacao: 2 },
    { nome: "Camile Isidório", matricula: "20250103", turma: "1", emprestimos: 7, colocacao: 3 },
    { nome: "Debora Viana", matricula: "20250104", turma: "3", emprestimos: 6, colocacao: 4 },
  ];
  
  return (
    <div className={styles.mainContent}>
      <div className={styles.cadastroLivros}>
        <h1 className={styles.titulo}>Relatórios e Estatísticas</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>
          Insira o período de tempo que deseja saber quais alunos mais leram:
        </p>

        <div className={styles.acoesContainer}>
          <div className={styles.inputWrapper}>
            <label htmlFor="dataInicio" className={styles.inputLabel}>
              Data Início
            </label>
            <input
              type="date"
              id="dataInicio"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="dataFim" className={styles.inputLabel}>
              Data Fim
            </label>
            <input
              type="date"
              id="dataFim"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className={styles.inputField}
            />
          </div>

        </div>
        <button className={styles.botaoCadastrar}>Gerar Estatísticas</button>
        <TabelaRelatorios alunos={alunos} />
      </div>
    </div>
  );
};

export default Relatorios;
