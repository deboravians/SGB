import { Link } from "react-router-dom";
import styles from "./tabelaAlunos.module.css";
import { Aluno } from "../../types/alunos";
import { useState } from "react";
import ModalExcluirAluno from "../ModalExcluirAluno/ModalExcluirAluno";
interface TabelaAlunosProps {
  alunos: Aluno[];
  atualizarLista: () => void;
}

const TabelaAlunos: React.FC<TabelaAlunosProps> = ({ alunos, atualizarLista }) => {
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
                  onClick={() => handleOpenModal(aluno)}
                >
                  <img src="/public/assets/iconlixeira.svg" alt="Apagar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmação de exclusão */}
      {selectedAluno && (
        <ModalExcluirAluno
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          aluno={selectedAluno} 
          onSuccess={atualizarLista}
        />
      )}
    </div>
  );
};

export default TabelaAlunos;