import { useState, useEffect } from "react";
import TabelaEdicoes from "../../components/TabelaEdicoes/TabelaEdicoes";
import styles from "./GerenciamentoDoAcervo.module.css";
import { Edicao } from "../../types/edicoes";
import CardInfors from "../../components/CardInfors/CardInfors";
import { listarEdicoes } from "../../api/edicoes";
import ModalCadastroDeEdicoes from "../../components/ModalCadastroDeEdicoes/ModalCadastroDeEdicoes";

function GerenciamentoDoAcervo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edicoes, setEdicoes] = useState<Edicao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState(""); // Estado do campo de pesquisa

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

  useEffect(() => {
    carregarEdicoes();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const edicoesFiltradas = edicoes.filter(
    (edicao) =>
      edicao.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      edicao.isbn.includes(filtro)
  );

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
            placeholder="Pesquisar por título ou ISBN..."
            className={styles.campoPesquisa}
            value={filtro}
            onChange={handleFiltroChange} // Atualiza o estado ao digitar
          />
          <button className={styles.botaoCadastrar} onClick={toggleModal}>
            <img
              src="/assets/iconCadastrar.svg"
              alt="Cadastrar"
              className={styles.icone}
            />
            Cadastrar Edição
          </button>
        </div>

        <ModalCadastroDeEdicoes
          isOpen={isModalOpen}
          onClose={toggleModal}
          carregarEdicoes={carregarEdicoes}
        />

        {/* Tabela */}
        {loading ? (
          <p>Carregando edições...</p>
        ) : (
          <TabelaEdicoes
            edicoes={edicoesFiltradas}
            atualizarLista={carregarEdicoes}
          />
        )}
      </div>
    </div>
  );
}

export default GerenciamentoDoAcervo;
