import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./tabelaProfessores.module.css";
import { Professor } from "../../types/professores";
import ModalExcluirProfessor from "../ModalExcluirProfessor/ModalExcluirProfessor";
import ModalEditarProfessor from "../ModalEditarProfessor/ModalEditarProfessor";
import Paginacao from "../Paginacao/Paginacao";

interface TabelaProfessoresProps {
  professores: Professor[];
  atualizarLista: () => void;
}
const ITENS_POR_PAGINA = 10;

const TabelaProfessores: React.FC<TabelaProfessoresProps> = ({
  professores,
  atualizarLista,
}) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState<Professor | null>(null);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const totalPaginas = Math.ceil(professores.length / ITENS_POR_PAGINA);
  const inicioIndex = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const professoresPaginados = professores.slice(inicioIndex, inicioIndex + ITENS_POR_PAGINA);


  const handleOpenModal = (professor: Professor) => {
    setSelectedProf(professor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProf(null);
  };

  const handleOpenEditarModal = (professor: Professor) => {
    setSelectedProf(professor);
    setIsModalEditarOpen(true); // Abrindo o modal de edição
  };

  const handleCloseEditarModal = () => {
    setIsModalEditarOpen(false);
    setSelectedProf(null);
  };

  return (
    <div>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Disciplina</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professoresPaginados.map((professor) => (
            <tr key={`${professor.nome}-${professor.telefone}`}>
              <td>{professor.nome}</td>
              <td>{professor.telefone}</td>
              <td>{professor.disciplina}</td>
              <td>
                <Link
                  to={`/leitores/professores/${professor.cpf}`}
                  title="Visualizar"
                >
                  <img
                    src="assets/iconOlho.svg"
                    alt="Visualizar"
                    className={styles.icone}
                  />
                </Link>

                <button
                  title="Editar"
                  onClick={() => handleOpenEditarModal(professor)}
                  className={styles.icone}
                >
                  <img src="assets/iconLapis.svg" alt="Editar" />
                </button>

                <button
                  className={styles.icone}
                  onClick={() => handleOpenModal(professor)}
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


      {/* Modal de confirmação de exclusão */}
      {selectedProf && (
        <ModalExcluirProfessor
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          professor={selectedProf}
          onSuccess={atualizarLista}
        />
      )}

      {/* Modal de edição */}
      {selectedProf && (
        <ModalEditarProfessor
          professor={selectedProf}
          isOpen={isModalEditarOpen}
          onClose={handleCloseEditarModal}
          onSuccess={atualizarLista}
        />
      )}
    </div>
  );
};

export default TabelaProfessores;
