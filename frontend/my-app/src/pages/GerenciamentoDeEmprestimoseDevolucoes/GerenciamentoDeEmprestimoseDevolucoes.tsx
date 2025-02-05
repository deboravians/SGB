import { useState, useEffect } from "react";
import TabelaEmprestimos from "../../components/TabelaEmprestimos/TabelaEmprestimos";
import styles from "./GerenciamentoDeEmprestimoseDevolucoes.module.css";
import CardInfors from "../../components/CardInfors/CardInfors";
import ModalLeitor from "../../components/ModalLeitor/ModalLeitor";
import ModalRealizarEmprestimo from "../../components/ModalRealizarEmprestimo/ModalRealizarEmprestimo";
import { listarEmprestimos } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";

function GerenciamentoDeEmprestimoseDevolucoes() {
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

  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarEmprestimos = async () => {
    try {
      setLoading(true);
      const dados = await listarEmprestimos();
      setEmprestimos(dados);
    } catch (error) {
      alert("Erro ao carregar os empréstimos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEmprestimos();
  }, []);

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
        {loading ? (
          <p>Carregando empréstimos...</p>
        ) : (
          <TabelaEmprestimos emprestimos={emprestimos} />
        )}

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

export default GerenciamentoDeEmprestimoseDevolucoes;