import styles from "./PerfilEdicao.module.css";
import TabelaHistoricoEdicoes from "../../components/TabelaHistoricoEdicoes/TabelaHistoricoEdicoes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Edicao } from "../../types/edicoes";
import { informacoesEdicao } from "../../api/edicoes";
import { toast } from "react-toastify";


const PerfilEdicao = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [edicao, setEdicao] = useState<Edicao | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdicao = async () => {
      try {
        if (isbn) {
          const dadosEdicao = await informacoesEdicao(isbn);
          setEdicao(dadosEdicao);
        }
      } catch (error) {
        toast.warn("Erro ao buscar informações da edição.");
      } finally {
        setLoading(false);
      }
    };

    fetchEdicao();
  }, [isbn]);

  if (loading) return <p>Carregando...</p>;
  if (!edicao) return <p>Edição não encontrada.</p>;
  return (
    <div className={styles.mainContent}>
      <div className={styles.dadosEdicao}>
        <h1 className={styles.titulo}>Informações da edição</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>
          Visão geral dos dados da edição
        </p>
        <div className={styles.infoCard}>
          <div className={styles.avatar}>{edicao.titulo.charAt(0)}</div>
          <div className={styles.informacoes}>
            <h3>{edicao.titulo}</h3>
            <p><strong>ISBN:</strong> {edicao.isbn}</p>
            <p><strong>Autor(a):</strong> {edicao.autor}</p>
          </div>
          <div className={styles.dadosComplementares}>
            <p><strong>Classificação:</strong> {edicao.classificacao?.titulo}</p>
            <p><strong>Número de cópias:</strong> {edicao.qtdCopias}</p>
          </div>
        </div>
        {edicao?.isbn && (
          <TabelaHistoricoEdicoes isbn={edicao.isbn} />
        )}
      </div>
    </div>
  );
};

export default PerfilEdicao;