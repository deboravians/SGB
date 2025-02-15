import React, { useState, useEffect, useCallback } from "react";
import styles from "./LeitoresAlunos.module.css";
import ModalCadastroAluno from "../../components/ModalCadastroAluno/ModalCadastroAluno";
import CardInfors from "../../components/CardInfors/CardInfors";
import TabelaAlunos from "../../components/TabelaAlunos/TabelaAlunos";
import { Aluno } from "../../types/alunos";
import { listarAlunos } from "../../api/alunos";
import { totalAlunos } from "../../api/estatisticas";
import { toast } from "react-toastify";

const LeitoresAlunos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  const carregarDados = useCallback(async () => {
    try {
      const [dadosAlunos, totalDeAlunos] = await Promise.all([
        listarAlunos(),
        totalAlunos(),
      ]);

      setAlunos(dadosAlunos);
      setTotal(totalDeAlunos);
    } catch (error) {
      toast.warn("Erro ao carregar os alunos.");
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

  const alunosFiltrados = alunos.filter(
    (aluno) =>
      aluno.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      aluno.matricula.includes(filtro)
  );

  return (
    <div className={styles.mainContent}>
      <div className={styles.cadastroAlunos}>
        <h1 className={styles.titulo}>Gerenciamento de Alunos</h1>
        <div className={styles.divisao}></div>

        <p className={styles.descricao}>Visão geral dos alunos cadastrados</p>

        <div className={styles.resumo}>
          <CardInfors quantidade={total} descricao="Alunos cadastrados" />
        </div>

        <div className={styles.acoesContainer}>
          <input
            type="text"
            placeholder="Pesquisar por nome ou matrícula..."
            className={styles.campoPesquisa}
            value={filtro}
            onChange={handleFiltroChange}
          />
          <button className={styles.botaoCadastrar} onClick={toggleModal}>
            <div className={styles.textAndIcon}>
              <img
                src="/assets/iconCadastrar.svg"
                alt="Cadastrar"
                className={styles.icone}
              />
              Cadastrar Aluno
            </div>
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalCadastroAluno
            fecharModal={toggleModal}
            salvarAluno={carregarDados}
          />
        )}

        {/* Tabela */}
        {loading ? (
          <p>Carregando alunos...</p>
        ) : (
          <TabelaAlunos
            alunos={alunosFiltrados}
            atualizarLista={carregarDados}
          />
        )}
      </div>
    </div>
  );
};

export default LeitoresAlunos;
