import { useState, useEffect, useCallback } from "react";
import styles from "./ModalGerenciarCopias.module.css";
import TabelaCopias from "../TabelaCopias/TabelaCopias";
import { Edicao } from "../../types/edicoes";
import { Copia } from "../../types/copias";
import { listarCopias } from "../../api/copias";
import ModalCadastroCopia from "../ModalCadastroCopia/ModalCadastroCopia";

interface ModalGerenciarCopiasProps {
  edicao: Edicao;
  isOpen: boolean;
  onClose: () => void;
}

const ModalGerenciarCopias: React.FC<ModalGerenciarCopiasProps> = ({
  edicao,
  isOpen,
  onClose,
}) => {
  const [copias, setCopias] = useState<Copia[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const copiasFiltradas = copias.filter((copia) =>
    copia.id
      .toString()
      .toLowerCase()
      .includes(termoPesquisa.trim().toLowerCase())
  );

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const carregarCopias = useCallback(async () => {
    try {
      setLoading(true);
      const dados = await listarCopias(edicao.isbn);
      setCopias(dados);
    } finally {
      setLoading(false);
    }
  }, [edicao.isbn]);

  useEffect(() => {
    if (isOpen) {
      carregarCopias();
    }
  }, [isOpen, carregarCopias]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src="assets/iconSair.svg" alt="Fechar" />
        </button>
        <h3>Gerenciamento de cópias de livros</h3>
        <div className={styles.nomeLivro}>{edicao.titulo}</div>

        <div className={styles.acoesContainer}>
          <input
            type="text"
            placeholder="Pesquisar por id..."
            className={styles.campoPesquisa}
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />

          <button onClick={toggleModal} className={styles.botaoCadastrar}>
            <img
              src="assets/iconCadastrar.svg"
              alt="Cadastrar"
              className={styles.icone}
            />
            Cadastrar Cópia
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalCadastroCopia
            edicao={edicao}
            isOpen={isModalOpen}
            onClose={toggleModal}
            onCopiaCadastrada={carregarCopias} // Atualiza lista após cadastro
          />
        )}
        <div className={styles.listaCopias}>
          {loading ? (
            <p>Carregando cópias...</p>
          ) : (
            <TabelaCopias copias={copiasFiltradas} atualizarLista={carregarCopias}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalGerenciarCopias;
