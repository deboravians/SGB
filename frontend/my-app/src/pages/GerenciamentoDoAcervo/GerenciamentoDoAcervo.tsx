import React from "react";
import CardLivros from "../../components/CardLivros/CardLivros";
import TabelaLivros from "../../components/TabelaLivros/TabelaLivros";
import styles from "./GerenciamentoDoAcervo.module.css";

const livros = [
  { id: 1, isbn: "000-00-00000-00-0", titulo: "O pequeno príncipe", status: "" },
  { id: 2, isbn: "000-00-00000-00-0", titulo: "O pequeno príncipe", status: "" },
];

function GerenciamentoAcervo() {
  return (
    <div className={styles.mainContent}>
      <div className={styles.cadastroLivros}>
        <h1 className={styles.titulo}>Gerenciamento do acervo</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>Visão geral do acervo</p>

        <div className={styles.resumo}>
          <CardLivros value="50" label="Livros disponíveis" />
          <CardLivros value="35" label="Livros Emprestados" />
          <CardLivros value="15" label="Empréstimos em atraso" />
        </div>

        <div className={styles.acoesContainer}>
          <input
            type="text"
            placeholder="Pesquisar livros..."
            className={styles.campoPesquisa}
          />
          <button className={styles.botaoCadastrar}>
            <img
              src="/public/assets/iconCadastrar.svg"
              alt="Cadastrar"
              className={styles.icone}
            />
            Cadastrar Edição
          </button>
        </div>

        {/* Modal de Cadastrar Edição - Comentado */}
        {/* Modal de Gerenciar Cópias - Comentado */}

        <TabelaLivros livros={livros} />
      </div>
    </div>
  );
}

export default GerenciamentoAcervo;

