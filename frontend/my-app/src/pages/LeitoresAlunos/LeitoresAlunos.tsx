import React, { useState } from "react";
import styles from "./LeitoresAlunos.module.css";
import ModalCadastroAluno from "../../components/ModalCadastroAluno/ModalCadastroAluno";
import CardInfors from "../../components/CardInfors/CardInfors";
import TabelaAlunos from "../../components/TabelaAlunos/TabelaAlunos";
import { Aluno } from "../../types/alunos";

const LeitoresAlunos: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); // Controle da Modal

  const [alunos, setAlunos] = useState<Aluno[]>([
    { matricula: "1598767", nome: "Debora Silva Viana", serie: "3º", turma: "A", bairro: "Mangueiral", rua: "Rafael Santos", telefone: "88992875222", anoLetivo: "2024", numero: "1022" },
  ]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const adicionarAluno = (novoAluno: Aluno) => {
    setAlunos([...alunos, novoAluno]);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.cadastroAlunos}>
          <h1 className={styles.titulo}>Gerenciamento de Alunos</h1>
          <div className={styles.divisao}></div>

          <p className={styles.descricao}>Visão geral dos alunos cadastrados</p>

          <div className={styles.resumo}>
            <CardInfors quantidade={alunos.length} descricao="Alunos Cadastrados" />
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
              salvarAluno={adicionarAluno}
            />
          )}

          <TabelaAlunos alunos={alunos} />

        </div>
      </div>
    </>
  );
}

export default LeitoresAlunos;