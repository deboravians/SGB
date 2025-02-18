import { useState } from "react";
import TabelaTopAlunos from "../../components/TabelaTopAlunos/TabelaTopAlunos";
import { getTopAlunos } from "../../api/estatisticas";
import { TopAlunos } from "../../types/topAlunos";
import styles from "./RelatoriosEstatisticas.module.css";
import { toast } from "react-toastify";

const Relatorios = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [alunos, setAlunos] = useState<TopAlunos[]>([]);
  const [carregando, setCarregando] = useState(false);

  const buscarTopAlunos = async () => {
    if (!dataInicio || !dataFim) {
      toast.warn("Por favor, selecione um período válido.");
      return;
    }

    // Formatar datas antes da requisição
    const formatarData = (data: string) => {
      const partes = data.split("-");
      return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : "";
    };

    const dataInicioFormatada = formatarData(dataInicio);
    const dataFimFormatada = formatarData(dataFim);

    setCarregando(true);
    try {
      const resposta = await getTopAlunos(dataInicioFormatada, dataFimFormatada);
      setAlunos(resposta);
    } catch (error) {
      toast.error("Erro ao carregar os dados dos alunos.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.cadastroLivros}>
        <h1 className={styles.titulo}>Relatórios e Estatísticas</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>
          Insira o período de tempo que deseja saber quais alunos mais leram:
        </p>

        <div className={styles.acoesContainer}>
          <div className={styles.inputWrapper}>
            <label htmlFor="dataInicio" className={styles.inputLabel}>
              Data Início
            </label>
            <input
              type="date"
              id="dataInicio"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="dataFim" className={styles.inputLabel}>
              Data Fim
            </label>
            <input
              type="date"
              id="dataFim"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className={styles.inputField}
            />
          </div>
        </div>

        <button className={styles.botaoCadastrar} onClick={buscarTopAlunos} disabled={carregando}>
          {carregando ? "Carregando..." : "Gerar Estatísticas"}
        </button>

        <TabelaTopAlunos alunos={alunos} />
      </div>
    </div>
  );
};

export default Relatorios;