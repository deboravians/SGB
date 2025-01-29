import { useState, useEffect } from "react";
import TabelaEdicoes from "../../components/TabelaEdicoes/TabelaEdicoes";
import styles from "./GerenciamentoDoAcervo.module.css";
import { Edicao } from "../../types/edicoes";
import CardInfors from "../../components/CardInfors/CardInfors";
import { listarEdicoes } from "../../api/edicoes";
import ModalCadastroDeEdicoes from "../../components/ModalCadastroDeEdicoes/ModalCadastroDeEdicoes";

function GerenciamentoAcervo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [edicoes, setEdicoes] = useState<Edicao[]>([]);

  const [loading, setLoading] = useState(true);

  const carregarEdicoes = async () => {
    try {
      setLoading(true);
      const dados = await listarEdicoes();
      setEdicoes(dados);
    } catch (error) {
      alert("Erro ao carregar as edições.");
    } finally {
      setLoading(false);
    }
  };

  // const salvarEdicao = async (edicao: Edicao) => {
  //   try {
  //     const novaEdicao = await cadastrarEdicao(edicao);
  //     setEdicoes((prevEdicoes) => [...prevEdicoes, novaEdicao]); // Atualiza a lista local
  //     setIsModalOpen(false); // Fecha o modal
  //   } catch (error) {
  //     alert("Erro ao cadastrar a edição.");
  //   }
  // };

  useEffect(() => {
    carregarEdicoes();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className={styles.mainContent}>
      <div className={styles.cadastroLivros}>
        <h1 className={styles.titulo}>Gerenciamento do acervo</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>Visão geral do acervo</p>

        <div className={styles.resumo}>
          <CardInfors quantidade={50} descricao="Livros disponíveis" />
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
            Cadastrar Edição
          </button>
        </div>
        <ModalCadastroDeEdicoes isOpen={isModalOpen} onClose={toggleModal} />
        
        {/* Tabela */}
        {loading ? (
          <p>Carregando edições...</p>
        ) : (
          <TabelaEdicoes edicoes={edicoes} />
        )}


      </div>
    </div>
  );
}

export default GerenciamentoAcervo;
