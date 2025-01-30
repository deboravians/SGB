import React, { useState, useEffect } from "react";
import styles from "./LeitoresAlunos.module.css";
import ModalCadastroAluno from "../../components/ModalCadastroAluno/ModalCadastroAluno";
import CardInfors from "../../components/CardInfors/CardInfors";
import TabelaAlunos from "../../components/TabelaAlunos/TabelaAlunos";
import { Aluno } from "../../types/alunos";
import { listarAlunos } from "../../api/alunos";

const LeitoresAlunos: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const [loading, setLoading] = useState(true);

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      const dados = await listarAlunos();
      setAlunos(dados);
    } catch (error) {
      alert("Erro ao carregar os alunos.");
    } finally {
      setLoading(false);
    }
  };

  const salvarAluno = async () => {
    try {
      carregarAlunos();
      setIsModalOpen(false); // Fecha o modal
    } catch (error) {
      alert("Erro ao cadastrar o aluno.");
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.cadastroAlunos}>
          <h1 className={styles.titulo}>Gerenciamento de Alunos</h1>
          <div className={styles.divisao}></div>

          <p className={styles.descricao}>Visão geral dos alunos cadastrados</p>

          <div className={styles.resumo}>
            <CardInfors quantidade={alunos.length} descricao="Alunos cadastrados" />
          </div>

          <div className={styles.acoesContainer}>
            <input
              type="text"
              placeholder="Pesquisar alunos..."
              className={styles.campoPesquisa}
            />
            <button
              className={styles.botaoCadastrar}
              onClick={toggleModal} // Abre a modal
            >
              <div className={styles.textAndIcon}>
                <img
                  src="/public/assets/iconCadastrar.svg"
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
              salvarAluno={salvarAluno}
            />
          )}

          {/* Tabela */}
          {loading ? (
            <p>Carregando alunos...</p>
          ) : (
            <TabelaAlunos alunos={alunos} atualizarLista={carregarAlunos} />
          )}

        </div>
      </div>
    </>
  );
}

export default LeitoresAlunos;