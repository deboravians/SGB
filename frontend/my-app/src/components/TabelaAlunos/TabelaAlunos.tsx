import { Link } from "react-router-dom";
import styles from "./tabelaAlunos.module.css";
import { Aluno } from "../../types/alunos";
import { useState } from "react";
import ModalExcluirAluno from "../ModalExcluirAluno/ModalExcluirAluno";
import ModalEditarAluno from "../ModalEditarAluno/ModalEditarAluno";

interface TabelaAlunosProps {
  alunos: Aluno[];
  atualizarLista: () => void;
}

const TabelaAlunos: React.FC<TabelaAlunosProps> = ({
  alunos,
  atualizarLista,
}) => {
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

  const handleOpenExcluirModal = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setIsModalExcluirOpen(true);
  };

  const handleCloseExcluirModal = () => {
    setIsModalExcluirOpen(false);
    setSelectedAluno(null);
  };

  const handleOpenEditarModal = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setIsModalEditarOpen(true);
  };

  const handleCloseEditarModal = () => {
    setIsModalEditarOpen(false);
    setSelectedAluno(null);
  };

  return (
    <div>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.matricula}>
              <td>{aluno.matricula}</td>
              <td>{aluno.nome}</td>
              <td>
                <Link
                  to={`/leitores/alunos/${aluno.matricula}`}
                  title="Visualizar"
                >
                  <img
                    src="assets/iconOlho.svg"
                    alt="Visualizar"
                    className={styles.icone}
                  />
                </Link>

                <button
                  className={styles.icone}
                  onClick={() => handleOpenEditarModal(aluno)}
                  title="Editar"
                >
                  <img src="assets/iconLapis.svg" alt="Editar" />
                </button>
                <button
                  className={styles.icone}
                  onClick={() => handleOpenExcluirModal(aluno)}
                  title="Excluir"
                >
                  <img src="assets/iconlixeira.svg" alt="Apagar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalExcluirOpen && selectedAluno && (
        <ModalExcluirAluno
          isOpen={isModalExcluirOpen}
          onClose={handleCloseExcluirModal}
          aluno={selectedAluno}
          onSuccess={atualizarLista}
        />
      )}

      {isModalEditarOpen && selectedAluno && (
        <ModalEditarAluno
          aluno={selectedAluno}
          isOpen={isModalEditarOpen}
          onClose={handleCloseEditarModal}
          onSuccess={atualizarLista}
        />
      )}
    </div>
  );
};

export default TabelaAlunos;
