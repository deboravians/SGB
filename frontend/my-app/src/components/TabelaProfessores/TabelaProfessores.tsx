import React from "react";
import { Link } from "react-router-dom";
import styles from "./tabelaProfessores.module.css";
import { Professor } from "../../types/professores";

interface TabelaProfessoresProps {
    professores: Professor[];
}

const TabelaProfessores: React.FC<TabelaProfessoresProps> = ({ professores }) => {
    return (
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

                            <button className={styles.icone} onClick={() => alert("Deseja deletar o professor? Essa ação é irreversível.")}>
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
    );
};

export default TabelaProfessores;