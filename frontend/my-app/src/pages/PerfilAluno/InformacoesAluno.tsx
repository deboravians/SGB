import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./InformacoesAluno.module.css";
import TabelaHistorico from "../../components/TabelaHistorico/TabelaHistorico";
import { informacoesAluno } from "../../api/alunos";
import { Aluno } from "../../types/alunos";
import { toast } from "react-toastify";

const InformacoesAluno = () => {
  const { matricula } = useParams<{ matricula: string }>();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        if (matricula) {
          const dadosAluno = await informacoesAluno(matricula);
          setAluno(dadosAluno);
        }
      } catch (error) {
        toast.warn("Erro ao buscar informações do aluno.");
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
  }, [matricula]);

  if (loading) return <p>Carregando...</p>;
  if (!aluno) return <p>Aluno não encontrado.</p>;

  return (
    <div className={styles.mainContent}>
      <div className={styles.dadosPessoais}>
        <h1 className={styles.titulo}>Informações do Aluno</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>
          Visão geral dos dados pessoais do(a) estudante
        </p>
        <div className={styles.infoCard}>
          <div className={styles.avatar}>{aluno.nome.charAt(0)}</div>
          <div className={styles.informacoes}>
            <h3>{aluno.nome}</h3>
            <p>
              <strong>Matrícula:</strong> {aluno.matricula}
            </p>
            <p>
              <strong>Telefone:</strong> {aluno.telefone}
            </p>
          </div>
          <div className={styles.dadosComplementares}>
            <p>
              <strong>Série:</strong> {aluno.serie} | <strong>Turma:</strong>{" "}
              {aluno.turma} | <strong>Ano:</strong> {aluno.anoLetivo}
            </p>
            <p>
              <strong>Endereço:</strong> {aluno.rua}, {aluno.bairro}
            </p>
          </div>
        </div>
        {aluno?.matricula && (
          <TabelaHistorico identificador={aluno.matricula} tipo="aluno" />
        )}
      </div>
    </div>
  );
};

export default InformacoesAluno;
