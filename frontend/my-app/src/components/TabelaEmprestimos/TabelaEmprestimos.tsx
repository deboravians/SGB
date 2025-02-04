import { Link } from "react-router-dom";
import styles from "./TabelaEmprestimos.module.css";
import StatusTag from "../StatusTag/StatusTag";
import React, { useState } from "react";
import ModalExcluirEmprestimo from '../ModalExcluirEmprestimo/ModalExcluirEmprestimo';
import ModalProrrogarPrazo from '../ModalProrrogarPrazo/ModalProrrogarPrazo';
import ModalLivroExtraviado from "../ModalLivroExtraviado/ModalLivroExtraviado";
interface Emprestimo {
  livro: string;
  leitor: string;
  isbn: string;
  status: string;
}

interface TabelaEmprestimosProps {
  emprestimos: Emprestimo[];
}

const TabelaEmprestimos: React.FC<TabelaEmprestimosProps> = ({ emprestimos }) => {
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [isProrrogarModalOpen, setIsProrrogarModalOpen] = useState(false);
  const [isExtraviadoModalOpen, setIsExtraviadoModalOpen] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState<Emprestimo | null>(null);

  const handleOpenExcluirModal = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsExcluirModalOpen(true);
    setIsProrrogarModalOpen(false); 
    setIsExtraviadoModalOpen(false); 
  };

  const handleOpenProrrogarModal = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsProrrogarModalOpen(true);
    setIsExcluirModalOpen(false); 
    setIsExtraviadoModalOpen(false); 
  };

  const handleOpenExtraviadoModal = (emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setIsProrrogarModalOpen(false);
    setIsExcluirModalOpen(false); 
    setIsExtraviadoModalOpen(true); 
  };
  const handleCloseModal = () => {
    setIsExcluirModalOpen(false);
    setIsProrrogarModalOpen(false);
    setSelectedEmprestimo(null);
    setIsExtraviadoModalOpen(false); 
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
          <th>ISBN</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {emprestimos.map((emprestimo, index) => (
          <tr key={index}>
            <td>{emprestimo.livro}</td>
            <td>{emprestimo.leitor}</td>
            <td>{emprestimo.isbn}</td>
            <td><StatusTag status={emprestimos.status as "Disponivel" | "Indisponivel"} tipo="edicao" /></td>
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
              <Link to={`/visualizar/${emprestimo}`} title="Editar">
                <img
                  src="/public/assets/iconLapis.svg"
                  alt="Editar"
                  className={styles.icone}
                />
              </Link>
              <button
                className={styles.icone}
                title="Excluir empréstimo"
                onClick={() => handleOpenExcluirModal(emprestimo)} // Abre a modal de exclusão
              >
                <img src="/public/assets/iconlixeira.svg" alt="Devolvido" />
              </button>
              <button
                className={styles.icone}
                title="Marcar como devolvido"
              >
                <img src="/public/assets/iconOk.svg" alt="Devolvido" />
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
    </table>
  );
};

export default TabelaEmprestimos;
