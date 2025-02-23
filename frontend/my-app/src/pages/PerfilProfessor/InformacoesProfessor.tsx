import styles from "./InformacoesProfessor.module.css";
import TabelaHistorico from "../../components/TabelaHistorico/TabelaHistorico";
import { informacoesProfessor } from "../../api/professores";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Professor } from "../../types/professores";
import { toast } from "react-toastify";

const InformacoesProfessor = () => {
  const { cpf } = useParams<{ cpf: string }>();
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        if (cpf) {
          const dadosProfessor = await informacoesProfessor(cpf);
          setProfessor(dadosProfessor);
        }
      } catch (error) {
        toast.warn("Erro ao buscar informações do professor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessor();
  }, [cpf]);

  if (loading) return <p>Carregando...</p>;
  if (!professor) return <p>Professor não encontrado.</p>;

  return (
    <div className={styles.mainContent}>
      <div className={styles.dadosPessoais}>
        <h1 className={styles.titulo}>Informações do Professor</h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>
          Visão geral dos dados pessoais do(a) professor
        </p>
        <div className={styles.infoCard}>
          <div className={styles.avatar}>{professor.nome.charAt(0)}</div>
          <div className={styles.informacoes}>
            <h3>{professor.nome}</h3>
            <p>
              <strong>Disciplina:</strong> {professor.disciplina}
            </p>
            <p>
              <strong>Telefone:</strong> {professor.telefone}
            </p>
          </div>
          <div className={styles.dadosComplementares}>
            <p>
              <strong>Endereço:</strong> {professor.rua} - {professor.bairro}
            </p>
          </div>
        </div>
        {professor?.cpf && (
          <TabelaHistorico identificador={professor.cpf} tipo="professor" />
        )}
      </div>
    </div>
  );
};

export default InformacoesProfessor;
