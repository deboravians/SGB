import { useState, useEffect, useCallback } from "react";
import styles from "./LeitoresProfessores.module.css";
import ModalCadastroProfessor from "../../components/ModalCadastroProfessor/ModalCadastroProfessor";
import CardInfors from "../../components/CardInfors/CardInfors";
import TabelaProfessores from "../../components/TabelaProfessores/TabelaProfessores";
import { Professor } from "../../types/professores";
import { listarProfessores } from "../../api/professores";
import { totalProfessores } from "../../api/estatisticas";
import { toast } from "react-toastify";

const LeitoresProfessores: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  const carregarDados = useCallback(async () => {
    try {
      const [dadosProfessores, totalDeProfessores] = await Promise.all([
        listarProfessores(),
        totalProfessores(),
      ]);

      setProfessores(dadosProfessores);
      setTotal(totalDeProfessores);
    } catch (error) {
      toast.warn("Erro ao carregar os professores.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const professoresFiltrados = professores.filter(
    (professor) =>
      professor.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      professor.cpf.includes(filtro)
  );

  return (
    <div className={styles.mainContent}>
      <div className={styles.cadastroProfessores}>
        <h1 className={styles.titulo}>Gerenciamento de Professores</h1>
        <div className={styles.divisao}></div>

        <p className={styles.descricao}>
          Visão geral dos professores cadastrados
        </p>

        <div className={styles.resumo}>
          <CardInfors quantidade={total} descricao="Professores cadastrados" />
        </div>

        <div className={styles.acoesContainer}>
          <input
            type="text"
            placeholder="Pesquisar por nome ou CPF..."
            className={styles.campoPesquisa}
            value={filtro}
            onChange={handleFiltroChange}
          />
          <button className={styles.botaoCadastrar} onClick={toggleModal}>
            <div className={styles.textAndIcon}>
              <img
                src="/assets/iconCadastrar.svg"
                alt="Cadastrar"
                className={styles.icone}
              />
              Cadastrar Professor
            </div>
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalCadastroProfessor
            fecharModal={toggleModal}
            salvarProfessor={carregarDados}
          />
        )}

        {/* Tabela */}
        {loading ? (
          <p>Carregando professores...</p>
        ) : (
          <TabelaProfessores
            professores={professoresFiltrados}
            atualizarLista={carregarDados}
          />
        )}
      </div>
    </div>
  );
};

export default LeitoresProfessores;
