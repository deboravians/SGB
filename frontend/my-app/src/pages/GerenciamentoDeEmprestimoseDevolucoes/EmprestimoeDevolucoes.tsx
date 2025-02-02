import { useState } from "react";
////import TabelaEmprestimos from "../../components/TabelaEmprestimos/TabelaEmprestimos";
import styles from "./EmprestimoseDevolucoes.module.css";
import CardInfors from "../../components/CardInfors/CardInfors";
////import ModalLeitor from "../../components/ModalLeitor/ModalLeitor";

function GerenciamentoEmprestimos() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className={styles.mainContent}>
      <div className={styles.cadastroLivros}>
        <h1 className={styles.titulo}>Gerenciamento de empréstimos e devoluções</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>Visão geral de empréstimos</p>

        <div className={styles.resumo}>
          <CardInfors quantidade={35} descricao="Livros Emprestados" />
          <CardInfors quantidade={15} descricao="Empréstimos em atraso" />
        </div>

        <div className={styles.acoesContainer}>
          <input
            type="text"
            placeholder="Pesquisar livros..."
            className={styles.campoPesquisa}
          />
          <button
            className={styles.botaoCadastrar}
            onClick={toggleModal}>
            <img
              src="/public/assets/iconCadastrar.svg"
              alt="Cadastrar"
              className={styles.icone}
            />
            Realizar empréstimo
          </button>
        </div> 
        {/* Tabela */}
      </div>
    </div>
  );
}

export default GerenciamentoEmprestimos;
