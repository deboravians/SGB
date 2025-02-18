import CardInfors from "../../components/CardInfors/CardInfors";
import styles from "./home.module.css";
import { useState, useEffect } from "react";
import {
  totalCopias,
  totalLeitores,
  totalEmprestimosAtivos,
  totalEmprestimosAtrasados,
} from "../../api/estatisticas";
import { toast } from "react-toastify";

const Home = () => {
  const [estatisticas, setEstatisticas] = useState({
    totalLeitores: 0,
    totalCopias: 0,
    totalEmprestimosAtivos: 0,
    totalEmprestimosAtrasados: 0,
  });

  const carregarEstatisticas = async () => {
    try {
      const [leitores, copias, emprestimosAtivos, emprestimosAtrasados] =
        await Promise.all([
          totalLeitores(),
          totalCopias(),
          totalEmprestimosAtivos(),
          totalEmprestimosAtrasados(),
        ]);

      setEstatisticas({
        totalLeitores: leitores,
        totalCopias: copias,
        totalEmprestimosAtivos: emprestimosAtivos,
        totalEmprestimosAtrasados: emprestimosAtrasados,
      });
    } catch (error) {
      toast.warn("Erro ao carregar estatísticas da biblioteca.");
    }
  };

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  return (
    <div className={styles.mainContent}>
      <div className={styles.home}>
        <div className={styles.header}>
          <img
            className={styles.icone}
            src="/assets/iconEscola.svg"
            alt="Ícone Escola"
          />
          <h1 className={styles.titulo}>
            Biblioteca Rachel de Queiroz - EEMTI Coronel Virgílio Távora
          </h1>
        </div>
        <div className={styles.divisao}></div>
        <div className={styles.content}>
          <div className={styles.cards}>
            <h1 className={styles.titulo2}>
              Seja bem-vindo! Dados gerais da biblioteca:
            </h1>
            <CardInfors
              quantidade={estatisticas.totalCopias}
              descricao="Cópias Cadastradas"
            />
            <CardInfors
              quantidade={estatisticas.totalLeitores}
              descricao="Leitores Cadastrados"
            />
            <CardInfors
              quantidade={estatisticas.totalEmprestimosAtivos}
              descricao="Empréstimos Ativos"
            />
            <CardInfors
              quantidade={estatisticas.totalEmprestimosAtrasados}
              descricao="Empréstimos em Atraso"
            />
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
  );
};

export default Home;
