import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LeitoresProfessores.module.css";


function CadastroProfessores() {

    const [nome, setNome] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [telefone, setTelefone] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");

    const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagens de sucesso
    const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

    const handleCadastroProfessor = async (e: React.FormEvent) => {

        e.preventDefault(); // Previne o comportamento padrão do formulário
        setSuccessMessage(""); // Limpa mensagens de sucesso anteriores
        setErrorMessage(""); // Limpa mensagens de erro anteriores

        // Validação básica dos campos
        if (!nome || !disciplina || !telefone || !rua || !numero || !bairro){

        setErrorMessage("Todos os campos são obrigatórios.");
        return;

        }

        try{

        const response = await fetch("http://localhost:8080/professores",{

            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ nome, disciplina, telefone,  rua, numero, bairro }), // Envia os dados no corpo da requisição

        });

        if(response.ok){

            setSuccessMessage("Cadastro realizado com sucesso!");
            console.log("Aluno cadastrado com sucesso.");

        } else {

            setErrorMessage("Erro ao realizar o cadastro. Verifique os dados e tente novamente.");
            console.error("Erro no cadastro. Status:", response.status);

        }
        }catch (error){

        console.error("Erro ao conectar com o servidor:", error);
        setErrorMessage("Erro de conexão. Tente novamente.");

        }
    };

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
                            <form onSubmit={handleCadastroProfessor}>
                                <h3 className={styles.sectionTitle}>Informações Gerais</h3>
                                <div className={styles.generalInfo}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="nome">Nome:</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            placeholder="Digite o nome do professor"
                                            className={styles.inputField}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="matricula">Disciplina:</label>
                                        <input
                                            type="text"
                                            id="disciplins"
                                            value={disciplina}
                                            onChange={(e) => setDisciplina(e.target.value)}
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
                                                value={telefone}
                                                onChange={(e) => setTelefone(e.target.value)}
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
                                                value={rua}
                                                onChange={(e) => setRua(e.target.value)}
                                                placeholder="Digite a rua"
                                                className={styles.inputField}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="numero">Número:</label>
                                            <input
                                                type="text"
                                                id="numero"
                                                value={numero}
                                                onChange={(e) => setNumero(e.target.value)}
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
                                            value={bairro}
                                            onChange={(e) => setBairro(e.target.value)}
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
                            {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Exibe erros */}
                            {successMessage && <p className={styles.error}>{successMessage}</p>} {/* Exibe sucessos */}
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
