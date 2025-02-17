import React from "react";
import styles from "./InformacoesProfessor.module.css";
import TabelaHistorico from "../../components/TabelaHistorico/TabelaHistorico";

const InformacoesProfessor = () => {
  // Dados fictícios do aluno
  const aluno = {
    nome: "Maria José de Oliveira",
    disciplina: "Português",
    telefone: "(88) 9 9999-9999",
    endereco: {
      rua: "Rua Francisco Eneas",
      numero: 123,
      bairro: "Centro",
    },
  };
  const historicos = [
    {
      livro: "Harry Potter",
      dataEmprestimo: "15/10/2024 12:34",
      dataDevolucao: "15/10/2024 12:34",
      status: "Extraviada",
    },
    {
      livro: "O Senhor dos Anéis",
      dataEmprestimo: "25/10/2024 15:25",
      dataDevolucao: "15/10/2024 12:34",
      status: "Devolvido",
    },
    {
      livro: "O Senhor dos Anéis",
      dataEmprestimo: "25/10/2024 15:25",
      dataDevolucao: "15/10/2024 12:34",
      status: "Devolvido",
    },
    {
      livro: "O Senhor dos Anéis",
      dataEmprestimo: "25/10/2024 15:25",
      dataDevolucao: "15/10/2024 12:34",
      status: "Devolvido",
    },
  ];

  return (
    <div className={styles.mainContent}>
      <div className={styles.dadosPessoais}>
        <h1 className={styles.titulo}>Informações do Professor</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>
          Visão geral dos dados pessoais do(a) professor
        </p>
        <div className={styles.infoCard}>
          <div className={styles.avatar}>{aluno.nome.charAt(0)}</div>
          <div className={styles.informacoes}>
            <h3>{aluno.nome}</h3>
            <p><strong>Disciplina:</strong> {aluno.disciplina}</p>
            <p><strong>Telefone:</strong> {aluno.telefone}</p>
          </div>
          <div className={styles.dadosComplementares}>
            <p><strong>Endereço:</strong> {aluno.endereco.rua}, {aluno.endereco.numero} - {aluno.endereco.bairro}</p>
          </div>
        </div>
        <TabelaHistorico historicos={historicos} />
      </div>
    </div>
  );
};

export default InformacoesProfessor;
