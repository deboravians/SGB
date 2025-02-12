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

const TabelaAlunos: React.FC<TabelaAlunosProps> = ({ alunos, atualizarLista }) => {
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

  // Funções para abrir/fechar modal de exclusão
  const handleOpenExcluirModal = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setIsModalExcluirOpen(true);
  };

  const handleCloseExcluirModal = () => {
    setIsModalExcluirOpen(false);
    setSelectedAluno(null);
  };

  // Funções para abrir/fechar modal de edição
  const handleOpenEditarModal = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setIsModalEditarOpen(true);
  };

  const handleCloseEditarModal = () => {
    setIsModalEditarOpen(false);
    setSelectedAluno(null);
  };

  const handleSalvarAlteracoes = (alunoAtualizado: Aluno) => {
    // Atualize os dados no backend ou state (ajuste conforme necessário)
    console.log("Alterações salvas para o aluno:", alunoAtualizado);
    atualizarLista(); // Atualize a lista de alunos após salvar
    handleCloseEditarModal();
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
                <button
                  className={styles.icone}
                  onClick={() => handleOpenEditarModal(aluno)}
                  title="Editar"
                >
                  <img src="/public/assets/iconLapis.svg" alt="Editar" />
                </button>
                <button
                  className={styles.icone}
                  onClick={() => handleOpenExcluirModal(aluno)}
                  title="Excluir"
                >
                  <img src="/public/assets/iconlixeira.svg" alt="Apagar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de exclusão */}
      {selectedAluno && (
        <ModalExcluirAluno
          isOpen={isModalExcluirOpen}
          onClose={handleCloseExcluirModal}
          aluno={selectedAluno}
          onSuccess={atualizarLista}
        />
      )}

      {/* Modal de edição */}
      {selectedAluno && (
        <ModalEditarAluno
          fecharModal={handleCloseEditarModal}
          salvarAlteracoes={handleSalvarAlteracoes}
          aluno={selectedAluno}
          isOpen={isModalEditarOpen}
          onClose={handleCloseEditarModal}
          onSuccess={handleSalvarAlteracoes}
        />
      )}
    </div>
  );
};

export default TabelaAlunos;
