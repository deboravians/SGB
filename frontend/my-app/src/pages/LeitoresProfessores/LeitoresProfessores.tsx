import React, { useState, useEffect } from "react";
import styles from "./LeitoresProfessores.module.css";
import ModalCadastroProfessor from "../../components/ModalCadastroProfessor/ModalCadastroProfessor";
import CardInfors from "../../components/CardInfors/CardInfors";
import TabelaProfessores from "../../components/TabelaProfessores/TabelaProfessores";
import { Professor } from "../../types/professores";
import { listarProfessores } from "../../api/professores";

const LeitoresProfessores: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [professores, setProfessores] = useState<Professor[]>([]);

  const [loading, setLoading] = useState(true);

  const carregarProfessores = async () => {
    try {
      setLoading(true);
      const dados = await listarProfessores();
      setProfessores(dados);
    } catch (error) {
      alert("Erro ao carregar os professores.");
    } finally {
      setLoading(false);
    }
  };

  const salvarProfessor = async () => {
    try {
      carregarProfessores();
      setIsModalOpen(false); // Fecha o modal
    } catch (error) {
      alert("Erro ao cadastrar o aluno.");
    }
  };

  useEffect(() => {
    carregarProfessores();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.cadastroProfessores}>
          <h1 className={styles.titulo}>Gerenciamento de Professores</h1>
          <div className={styles.divisao}></div>

          <p className={styles.descricao}>Visão geral dos professores cadastrados</p>

          <div className={styles.resumo}>
            <CardInfors quantidade={professores.length} descricao="Professores Cadastrados" />
          </div>

          <div className={styles.acoesContainer}>
            <input
              type="text"
              placeholder="Pesquisar professores..."
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
                Cadastrar Professor
              </div>
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <ModalCadastroProfessor
              fecharModal={toggleModal}
              salvarProfessor={salvarProfessor}
            />
          )}

          {/* Tabela */}
          {loading ? (
            <p>Carregando professores...</p>
          ) : (
            <TabelaProfessores professores={professores} />
          )}

        </div>
      </div>
    </>
  );
}

export default LeitoresProfessores;