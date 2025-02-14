import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./tabelaProfessores.module.css";
import { Professor } from "../../types/professores";
import ModalExcluirProfessor from "../ModalExcluirProfessor/ModalExcluirProfessor";
import ModalEditarProfessor from "../ModalEditarProfessor/ModalEditarProfessor";

interface TabelaProfessoresProps {
    professores: Professor[];
    atualizarLista: () => void;
}

const TabelaProfessores: React.FC<TabelaProfessoresProps> = ({ professores, atualizarLista }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProf, setSelectedProf] = useState<Professor | null>(null);
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);

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

    const handleSalvarProfessor = (professorAtualizado: Professor) => {
        console.log("Alterações salvas para o professor:", professorAtualizado);
        atualizarLista(); // Atualize a lista após salvar
        handleCloseEditarModal();
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
                    {professores.map((professor) => (
                        <tr key={`${professor.nome}-${professor.telefone}`}>
                            <td>{professor.nome}</td>
                            <td>{professor.telefone}</td>
                            <td>{professor.disciplina}</td>
                            <td>
                                <Link to={`/visualizar/${professor.nome}`} title="Visualizar">
                                    <img
                                        src="/assets/iconOlho.svg"
                                        alt="Visualizar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <button
                                    title="Editar"
                                    onClick={() => handleOpenEditarModal(professor)}
                                    className={styles.icone}
                                >
                                    <img
                                        src="/assets/iconLapis.svg"
                                        alt="Editar"
                                    />
                                </button>

                                <button className={styles.icone} onClick={() => handleOpenModal(professor)}>
                                    <img src="/assets/iconlixeira.svg" alt="Apagar" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                    fecharModal={handleCloseEditarModal}
                    salvarProfessor={handleSalvarProfessor}
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
