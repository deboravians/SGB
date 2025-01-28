
import { Link } from "react-router-dom";
import styles from "./tabelaAlunos.module.css";
import { Aluno } from "../../types/alunos";
import React, { useState } from "react";
import ModalExcluirAluno from "../ExcluirAluno/ModalExcluirAluno"; 

interface TabelaAlunosProps {
  alunos: Aluno[];
}

const TabelaAlunos: React.FC<TabelaAlunosProps> = ({ alunos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

  const handleOpenModal = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAluno(null);
  };

  const handleConfirmDelete = () => {
    if (selectedAluno) {
      console.log(`Aluno com matrícula ${selectedAluno.matricula} excluído.`);
      // Lógica para deletar o aluno via backend pode ser adicionada aqui
      handleCloseModal();
    }
  };

  return (
    <div>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Série</th>
            <th>Turma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.matricula}>
              <td>{aluno.matricula}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.serie}</td>
              <td>{aluno.turma}</td>
              <td>
                <Link to={`/visualizar/${aluno.matricula}`} title="Visualizar">
                  <img
                    src="/public/assets/iconOlho.svg"
                    alt="Visualizar"
                    className={styles.icone}
                  />
                </Link>
                <Link to={`/editar/${aluno.matricula}`} title="Editar">
                  <img
                    src="/public/assets/iconLapis.svg"
                    alt="Editar"
                    className={styles.icone}
                  />
                </Link>

                <button 
                  className={styles.icone} 
                  onClick={() => handleOpenModal(aluno)} // Abre o modal de exclusão
                >
                  <img src="/public/assets/iconlixeira.svg" alt="Apagar" />
                </button>

                <Link to={`/devolucao/1`} title="Devolução">
                  <img
                    src="/public/assets/iconOk.svg"
                    alt="Devolução"
                    className={styles.icone}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmação de exclusão */}
      <ModalExcluirAluno 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
};

export default TabelaAlunos;
