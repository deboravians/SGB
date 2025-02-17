import React from "react";
import styles from "./InformacoesAluno.module.css";
//import TabelaHistorico from "../../components/TabelaHistorico/TabelaHistorico";

const InformacoesAluno = () => {
  // Dados fictícios do aluno
  const aluno = {
    nome: "Maria José de Oliveira",
    matricula: "202320456",
    telefone: "(88) 9 9999-9999",
    serie: "3º Ano",
    turma: "B",
    anoLetivo: "2024",
    endereco: {
      rua: "Rua Francisco Eneas",
      numero: 123,
      bairro: "Centro",
    },
  };

  // Histórico fictício de empréstimos e devoluções
  

  return (
    <div className={styles.mainContent}>
      {/* Seção de informações do aluno */}
      <div className={styles.dadosPessoais}>
        <h1 className={styles.titulo}>Informações do Aluno</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>
          Visão geral dos dados pessoais do(a) estudante
        </p>
        <div className={styles.infoCard}>
          <div className={styles.avatar}>{aluno.nome.charAt(0)}</div>
          <div className={styles.informacoes}>
            <h3>{aluno.nome}</h3>
            <p><strong>Matrícula:</strong> {aluno.matricula}</p>
            <p><strong>Telefone:</strong> {aluno.telefone}</p>
          </div>
          <div className={styles.dadosComplementares}>
            <p><strong>Série:</strong> {aluno.serie} | <strong>Turma:</strong> {aluno.turma} | <strong>Ano:</strong> {aluno.anoLetivo}</p>
            <p><strong>Endereço:</strong> {aluno.endereco.rua}, {aluno.endereco.numero} - {aluno.endereco.bairro}</p>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default InformacoesAluno;
