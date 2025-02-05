import styles from "./TabelaEmprestimos.module.css";
import StatusTag from "../StatusTag/StatusTag";
import { useState } from "react";
import ModalExcluirEmprestimo from '../ModalExcluirEmprestimo/ModalExcluirEmprestimo';
import ModalProrrogarPrazo from '../ModalProrrogarPrazo/ModalProrrogarPrazo';
import ModalLivroExtraviado from "../ModalLivroExtraviado/ModalLivroExtraviado";
import ModalRegistrarDevolucao from "../ModalRegistrarDevolucao/ModalRegistrarDevolucao";
import ModalEditarEmprestimo from "../ModalEditarEmprestimo/ModalEditarEmprestimo";
import { Emprestimo } from "../../types/emprestimos";

interface TabelaEmprestimosProps {
  emprestimos: Emprestimo[];
}

const TabelaEmprestimos: React.FC<TabelaEmprestimosProps> = ({ emprestimos }) => {
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [isProrrogarModalOpen, setIsProrrogarModalOpen] = useState(false);
  const [isExtraviadoModalOpen, setIsExtraviadoModalOpen] = useState(false);
  const [isDevolvidoModalOpen, setIsDevolvidoModalOpen] = useState(false);
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState<Emprestimo | null>(null);

  const handleOpenExcluirModal = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsExcluirModalOpen(true);
    setIsProrrogarModalOpen(false);
    setIsExtraviadoModalOpen(false);
    setIsDevolvidoModalOpen(false);
    setIsEditarModalOpen(false);
  };

  const handleOpenProrrogarModal = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsProrrogarModalOpen(true);
    setIsExcluirModalOpen(false);
    setIsExtraviadoModalOpen(false);
    setIsDevolvidoModalOpen(false);
    setIsEditarModalOpen(false);
  };

  const handleOpenExtraviadoModal = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsProrrogarModalOpen(false);
    setIsExcluirModalOpen(false);
    setIsExtraviadoModalOpen(true);
    setIsDevolvidoModalOpen(false);
    setIsEditarModalOpen(false);
  };

  const handleOpenDevolvidoModal = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsProrrogarModalOpen(false);
    setIsExcluirModalOpen(false);
    setIsExtraviadoModalOpen(false);
    setIsDevolvidoModalOpen(true);
    setIsEditarModalOpen(false);
  };

  const handleOpenEditarModal = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsProrrogarModalOpen(false);
    setIsExcluirModalOpen(false);
    setIsExtraviadoModalOpen(false);
    setIsDevolvidoModalOpen(false);
    setIsEditarModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsExcluirModalOpen(false);
    setIsProrrogarModalOpen(false);
    setSelectedEmprestimo(null);
    setIsExtraviadoModalOpen(false);
    setIsDevolvidoModalOpen(false);
    setIsEditarModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedEmprestimo) {
      // Lógica para deletar o aluno via backend pode ser adicionada aqui
      handleCloseModal();
    }
  };

  return (
    <table className={styles.tabelaEmprestimos}>
      <thead>
        <tr>
          <th>Livro</th>
          <th>Leitor(a)</th>
          <th>Data prevista de devolução</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {emprestimos.map((emprestimo) => (
          <tr key={emprestimo.id}>
            <td>{emprestimo.copia.edicao.titulo}</td>
            <td>{emprestimo.aluno?.nome ?? emprestimo.professor?.nome ?? "Não informado"}</td>
            <td>{emprestimo.dataPrevistaDevolucao}</td>
            <td><StatusTag status={emprestimo.status as "Atrasado" | "Pendente" | "Extraviado" | "Devolvido"} tipo="emprestimo" /></td>
            <td className={styles.acoes}>
              <button
                className={styles.icone0}
                onClick={() => handleOpenProrrogarModal(emprestimo)}
                title="Prorrogar prazo">
                <img
                  src="/public/assets/iconProrrogar.svg"
                  alt="Prorrogar prazo"
                />
              </button>
              <button
                className={styles.icone1}
                onClick={() => handleOpenExtraviadoModal(emprestimo)}
                title="Livro Extraviado">
                <img
                  src="/public/assets/iconExtraviado.svg"
                  alt="Livro Extraviado"
                />
              </button>
              <button
                className={styles.icone1}
                onClick={() => handleOpenEditarModal(emprestimo)}
                title="Editar livro">
                <img
                  src="/public/assets/iconLapis.svg"
                  alt="Editar livro"
                />
              </button>
              <button
                className={styles.icone}
                title="Excluir empréstimo"
                onClick={() => handleOpenExcluirModal(emprestimo)} // Abre a modal de exclusão
              >
                <img src="/public/assets/iconlixeira.svg" alt="Devolvido" />
              </button>
              <button
                className={styles.icone}
                onClick={() => handleOpenDevolvidoModal(emprestimo)}
                title="Registrar Devolução">
                <img
                  src="/public/assets/iconOk.svg"
                  alt="Registrar Devolução"
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <ModalExcluirEmprestimo
        isOpen={isExcluirModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <ModalProrrogarPrazo
        isOpen={isProrrogarModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <ModalLivroExtraviado
        isOpen={isExtraviadoModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <ModalRegistrarDevolucao
        isOpen={isDevolvidoModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <ModalEditarEmprestimo
        isOpen={isEditarModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </table>
  );
};

export default TabelaEmprestimos;
