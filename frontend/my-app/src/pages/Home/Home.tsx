import CardInfors from "../../components/CardInfors/CardInfors";
import styles from "./home.module.css";
import { Aluno } from "../../types/alunos";
import { listarAlunos } from "../../api/alunos";
import { useState, useEffect } from "react";
import { Professor } from "../../types/professores";
import { listarProfessores } from "../../api/professores";

const Home = () => {

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);

  const carregarDados = async () => {
    try {
      const [alunosData, professoresData] = await Promise.all([
        listarAlunos(), // Requisição dos alunos
        listarProfessores(), // Requisição dos professores
      ]);
      setAlunos(alunosData); // Atualiza alunos
      setProfessores(professoresData); // Atualiza professores
    } catch (error) {
      alert("Erro ao carregar dados.");
    }
  };

  useEffect(() => {
    carregarDados(); // Carrega os dados ao montar o componente
  }, []);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.home}>
          <div className={styles.header}>
            <img className={styles.icone} src="/assets/iconEscola.svg" alt="Ícone Escola" />
            <h1 className={styles.titulo}>Biblioteca Rachel de Queiroz - EEMTI Coronel Virgílio Távora</h1>
          </div>
          <div className={styles.divisao}></div>
          <div className={styles.content}>
            <div className={styles.cards}>
              <h1 className={styles.titulo2}>Seja bem-vindo! Dados gerais da biblioteca:</h1>
              <CardInfors quantidade={0} descricao="Livros Cadastrados" />
              <CardInfors quantidade={alunos.length + professores.length} descricao="Leitores Cadastrados" />
              <CardInfors quantidade={0} descricao="Empréstimos Ativos" />
              <CardInfors quantidade={0} descricao="Empréstimos em Atraso" />
            </div>
            <div className={styles.imagemContainer}>
              <img
                src="/assets/imagemEstudante.svg"
                alt="Cadastrar"
                className={styles.imagem}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;