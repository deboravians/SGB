import { useState, useEffect, useCallback } from "react";
import TabelaEdicoes from "../../components/TabelaEdicoes/TabelaEdicoes";
import styles from "./GerenciamentoDoAcervo.module.css";
import { Edicao } from "../../types/edicoes";
import CardInfors from "../../components/CardInfors/CardInfors";
import { listarEdicoes } from "../../api/edicoes";
import ModalCadastroDeEdicoes from "../../components/ModalCadastroDeEdicoes/ModalCadastroDeEdicoes";
import {
  totalCopiasDisponiveis,
  totalCopiasEmprestadas,
} from "../../api/estatisticas";
import { toast } from "react-toastify";

function GerenciamentoDoAcervo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edicoes, setEdicoes] = useState<Edicao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  const [estatisticas, setEstatisticas] = useState({
    totalCopiasDisponiveis: 0,
    totalCopiasEmprestadas: 0,
  });

  const carregarDados = useCallback(async () => {
    try {
      const [copiasDisponiveis, copiasEmprestadas, edicoesData] =
        await Promise.all([
          totalCopiasDisponiveis(),
          totalCopiasEmprestadas(),
          listarEdicoes(),
        ]);

      setEstatisticas({
        totalCopiasDisponiveis: copiasDisponiveis,
        totalCopiasEmprestadas: copiasEmprestadas,
      });

      setEdicoes(edicoesData);
    } catch (error) {
      toast.warn("Erro ao carregar dados do acervo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

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
          <CardInfors quantidade={estatisticas.totalCopiasDisponiveis} descricao="Cópias disponíveis" />
          <CardInfors quantidade={estatisticas.totalCopiasEmprestadas} descricao="Cópias Emprestadas" />
        </div>

        <div className={styles.acoesContainer}>
          <input
            type="text"
            placeholder="Pesquisar por título ou ISBN..."
            className={styles.campoPesquisa}
            value={filtro}
            onChange={handleFiltroChange}
          />
          <button className={styles.botaoCadastrar} onClick={toggleModal}>
            <img src="/assets/iconCadastrar.svg" alt="Cadastrar" className={styles.icone} />
            Cadastrar Edição
          </button>
        </div>

        <ModalCadastroDeEdicoes isOpen={isModalOpen} onClose={toggleModal} carregarEdicoes={carregarDados} />

        {/* Tabela */}
        {loading ? (
          <p>Carregando edições...</p>
        ) : (
          <TabelaEdicoes edicoes={edicoesFiltradas} atualizarLista={carregarDados} />
        )}
      </div>
    </div>
  );
}

export default GerenciamentoDoAcervo;
