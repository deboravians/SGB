import { useState } from "react";
import TabelaEmprestimos from "../../components/TabelaEmprestimos/TabelaEmprestimos";
import styles from "./EmprestimoseDevolucoes.module.css";
import CardInfors from "../../components/CardInfors/CardInfors";
import ModalLeitor from "../../components/ModalLeitor/ModalLeitor";
import ModalRealizarEmprestimo from "../../components/ModalRealizarEmprestimo/ModalRealizarEmprestimo";

const emprestimos = [
  { livro: "O pequeno príncipe", leitor: "Francisco Werley", isbn: "000-00-00000-00-0", status: "", ações: "" },
  { livro: "O pequeno príncipe", leitor: "Francisco Werley", isbn: "000-00-00000-00-0", status: "", ações: "" },
];


function GerenciamentoEmprestimos() {
  const [isModalLeitorOpen, setIsModalLeitorOpen] = useState(false);
  const [isModalEmprestimoOpen, setIsModalEmprestimoOpen] = useState(false);

  const toggleModalLeitor = () => setIsModalLeitorOpen(!isModalLeitorOpen);
  const toggleModalEmprestimo = () => setIsModalEmprestimoOpen(!isModalEmprestimoOpen);

  const handleConfirmLeitor = () => {
    // Fecha a ModalLeitor e abre a ModalEmprestimo
    setIsModalLeitorOpen(false);
    setIsModalEmprestimoOpen(true);
  };

  const handleConfirmEmprestimo = () => {
    // Fecha todas as modais
    setIsModalLeitorOpen(false);
    setIsModalEmprestimoOpen(false);
  };

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
            placeholder="Pesquisar Empréstimos..."
            className={styles.campoPesquisa}
          />
          <button
            className={styles.botaoCadastrar}
            onClick={toggleModalLeitor}>
            <img
              src="/public/assets/iconCadastrar.svg"
              alt="Cadastrar"
              className={styles.icone}
            />
            Realizar empréstimo
          </button>
        </div>
        {/* Tabela */}
        <TabelaEmprestimos emprestimos={emprestimos} />
        {isModalLeitorOpen && (
          <ModalLeitor
            isOpen={isModalLeitorOpen}
            onClose={toggleModalLeitor}
            onConfirm={handleConfirmLeitor} // Passa a função de confirmação
          />
        )}

        {isModalEmprestimoOpen && (
          <ModalRealizarEmprestimo
            isOpen={isModalEmprestimoOpen}
            onClose={toggleModalEmprestimo}
            onConfirm={handleConfirmEmprestimo} // Passa a função de confirmação
          />
        )}
      </div>
    </div>
  );
}

export default GerenciamentoEmprestimos;
