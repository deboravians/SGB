import { Link } from "react-router-dom";
import styles from "./tabelaAlunos.module.css";
import { Aluno } from "../../types/alunos";
import { useState } from "react";
import ModalExcluirAluno from "../ModalExcluirAluno/ModalExcluirAluno";
import ModalEditarAluno from "../ModalEditarAluno/ModalEditarAluno";
import Paginacao from "../Paginacao/Paginacao";

interface TabelaAlunosProps {
  alunos: Aluno[];
  atualizarLista: () => void;
}

const ITENS_POR_PAGINA = 10; 

const TabelaAlunos: React.FC<TabelaAlunosProps> = ({
  alunos,
  atualizarLista,
}) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

  const totalPaginas = Math.ceil(alunos.length / ITENS_POR_PAGINA);
  const inicioIndex = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const alunosPaginados = alunos.slice(inicioIndex, inicioIndex + ITENS_POR_PAGINA);

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
          {alunosPaginados.map((aluno) => (
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

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onPageChange={setPaginaAtual}
      />

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
