import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LeitoresProfessores.module.css";


function CadastroProfessores() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle da Modal

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div className={styles.mainContent}>
            <div className={styles.cadastroAlunos}>
                <h1 className={styles.titulo}>Gerenciamento de Professores</h1>
                <div className={styles.divisao}></div>

                <p className={styles.descricao}>Visão geral dos professores cadastrados</p>

                <div className={styles.resumo}>
                    <div className={`${styles.card} ${styles.cardVerde}`}>
                        <strong className={styles.strong}>50</strong>
                        <span>Professores Cadastrados</span>
                    </div>
                    <div className={`${styles.card} ${styles.cardVerde}`}>
                        <strong className={styles.strong}>20</strong>
                        <span>Livros Emprestados</span>
                    </div>
                    <div className={`${styles.card} ${styles.cardVerde}`}>
                        <strong className={styles.strong}>15</strong>
                        <span>Livros em Atraso</span>
                    </div>
                </div>

                <div className={styles.acoesContainer}>
                    <input
                        type="text"
                        placeholder="Pesquisar professores..."
                        className={styles.campoPesquisa}
                    />
                    <button
                        className={styles.botaoCadastrar}
                        onClick={toggleModal} // Abre a modal
                    >
                        <img
                            src="/public/assets/iconCadastrar.svg"
                            alt="Cadastrar"
                            className={styles.icone}
                        />
                        Cadastrar Professor
                    </button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>Cadastrar Professor</h2>
                            <form>
                                <h3 className={styles.sectionTitle}>Informações Gerais</h3>
                                <div className={styles.generalInfo}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="nome">Nome:</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            placeholder="Digite o nome do professor"
                                            className={styles.inputField}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="matricula">Disciplina:</label>
                                        <input
                                            type="text"
                                            id="disciplins"
                                            placeholder="Matematica"
                                            className={styles.inputFild}
                                        />
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="telefone">Telefone:</label>
                                            <input
                                                type="text"
                                                id="telefone"
                                                placeholder="(00) 00000-0000"
                                                className={styles.inputFild}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h3 className={styles.sectionTitle}>Endereço</h3>
                                <div className={styles.addressInfo}>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="rua">Rua:</label>
                                            <input
                                                type="text"
                                                id="rua"
                                                placeholder="Digite a rua"
                                                className={styles.inputField}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="numero">Número:</label>
                                            <input
                                                type="text"
                                                id="numero"
                                                placeholder="0000"
                                                className={styles.inputFieldd}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="bairro">Bairro:</label>
                                        <input
                                            type="text"
                                            id="bairro"
                                            placeholder="Digite o bairro"
                                            className={styles.inputFild}
                                        />
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        className={styles.botaoCancelar}
                                        onClick={toggleModal} // Fecha a modal
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className={styles.botaoCadastrar}>
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <table className={styles.tabelaAlunos}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Materia</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>João Silva</td>
                            <td>(88) 0000-0000</td>
                            <td>Matematica</td>
                            <td className={styles.acoes}>
                                <Link to={`/visualizar/1`} title="Visualizar">
                                    <img
                                        src="/public/assets/iconOlho.svg"
                                        alt="Visualizar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <Link to={`/editar/1`} title="Editar">
                                    <img
                                        src="/public/assets/iconLapis.svg"
                                        alt="Editar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <button
                                    className={styles.icone}
                                    title="Apagar"
                                    onClick={() => alert("Deseja apagar?")}
                                >
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
                        <tr>
                            <td>João Silva</td>
                            <td>(88) 0000-0000</td>
                            <td>Matematica</td>
                            <td className={styles.acoes}>
                                <Link to={`/visualizar/1`} title="Visualizar">
                                    <img
                                        src="/public/assets/iconOlho.svg"
                                        alt="Visualizar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <Link to={`/editar/1`} title="Editar">
                                    <img
                                        src="/public/assets/iconLapis.svg"
                                        alt="Editar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <button
                                    className={styles.icone}
                                    title="Apagar"
                                    onClick={() => alert("Deseja apagar?")}
                                >
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
                        <tr>
                            <td>João Silva</td>
                            <td>(88) 0000-0000</td>
                            <td>Matematica</td>
                            <td className={styles.acoes}>
                                <Link to={`/visualizar/1`} title="Visualizar">
                                    <img
                                        src="/public/assets/iconOlho.svg"
                                        alt="Visualizar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <Link to={`/editar/1`} title="Editar">
                                    <img
                                        src="/public/assets/iconLapis.svg"
                                        alt="Editar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <button
                                    className={styles.icone}
                                    title="Apagar"
                                    onClick={() => alert("Deseja apagar?")}
                                >
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
                        <tr>
                            <td>João Silva</td>
                            <td>(88) 0000-0000</td>
                            <td>Matematica</td>
                            <td className={styles.acoes}>
                                <Link to={`/visualizar/1`} title="Visualizar">
                                    <img
                                        src="/public/assets/iconOlho.svg"
                                        alt="Visualizar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <Link to={`/editar/1`} title="Editar">
                                    <img
                                        src="/public/assets/iconLapis.svg"
                                        alt="Editar"
                                        className={styles.icone}
                                    />
                                </Link>
                                <button
                                    className={styles.icone}
                                    title="Apagar"
                                    onClick={() => alert("Deseja apagar?")}
                                >
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
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CadastroProfessores;
