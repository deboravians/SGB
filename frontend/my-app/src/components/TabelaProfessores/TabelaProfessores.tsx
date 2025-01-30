import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./tabelaProfessores.module.css";
import { Professor } from "../../types/professores";
import ModalExcluirProfessor from "../ModalExcluirProfessor/ModalExcluirProfessor";

interface TabelaProfessoresProps {
    professores: Professor[];
    atualizarLista: () => void;
}

const TabelaProfessores: React.FC<TabelaProfessoresProps> = ({ professores, atualizarLista }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProf, setSelectedProf] = useState<Professor | null>(null);


    const handleOpenModal = (professor: Professor) => {
        setSelectedProf(professor);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                    {professores.map((professor) => (
                        <tr key={`${professor.nome}-${professor.telefone}`}>
                            <td>{professor.nome}</td>
                            <td>{professor.telefone}</td>
                            <td>{professor.disciplina}</td>
                            <td>
                                <Link to={`/visualizar/${professor.nome}`} title="Visualizar">
                                    <img
                                        src="/public/assets/iconOlho.svg"
                                        alt="Visualizar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <Link to={`/editar/${professor.nome}`} title="Editar">
                                    <img
                                        src="/public/assets/iconLapis.svg"
                                        alt="Editar"
                                        className={styles.icone}
                                    />
                                </Link>

                                <button className={styles.icone} onClick={() => handleOpenModal(professor)}>
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
            {selectedProf && (
                <ModalExcluirProfessor
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    professor={selectedProf}
                    onSuccess={atualizarLista}
                />
            )}
        </div>
    );
};

export default TabelaProfessores;