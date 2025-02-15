import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TabelaEdicoes.module.css";
import { Edicao } from "../../types/edicoes";
import StatusTag from "../StatusTag/StatusTag";
import ModalExcluirEdicao from "../ModalExcluirEdicao/ModalExcluirEdicao";
import ModalGerenciarCopias from "../ModalGerenciarCopias/ModalGerenciarCopias";
import ModalEditarEdicoes from "../ModalEditarEdicoes/ModalEditarEdicoes";

interface TabelaEdicoesProps {
  edicoes: Edicao[];
  atualizarLista: () => void;
}

const TabelaEdicoes: React.FC<TabelaEdicoesProps> = ({
  edicoes,
  atualizarLista,
}) => {
  const [selectedEdicao, setSelectedEdicao] = useState<Edicao | null>(null);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);

  const [isGerenciarModalOpen, setIsGerenciarModalOpen] = useState(false);
  const [gerenciarEdicao, setGerenciarEdicao] = useState<Edicao | null>(null);

  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);

  const handleOpenExcluirModal = (edicao: Edicao) => {
    setSelectedEdicao(edicao);
    setIsExcluirModalOpen(true);
  };

  const handleCloseExcluirModal = () => {
    setIsExcluirModalOpen(false);
    setSelectedEdicao(null);
  };

  const handleOpenGerenciarModal = (edicao: Edicao) => {
    setGerenciarEdicao(edicao);
    setIsGerenciarModalOpen(true);
  };

  const handleCloseGerenciarModal = () => {
    setIsGerenciarModalOpen(false);
    setGerenciarEdicao(null);
  };

  const handleOpenEditarModal = (edicao: Edicao) => {
    setSelectedEdicao(edicao);
    setIsEditarModalOpen(true);
  };

  const handleCloseEditarModal = () => {
    setIsEditarModalOpen(false);
    setSelectedEdicao(null);
  };

  return (
    <div>
      <table className={styles.tabelaEdicoes}>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Livro</th>
            <th>Status</th>
            <th>Ações</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {edicoes.map((edicao) => (
            <tr key={edicao.isbn}>
              <td>{edicao.isbn}</td>
              <td>{edicao.titulo}</td>
              <td>
                <StatusTag
                  status={edicao.status as "Disponível" | "Indisponível"}
                  tipo="edicao"
                />
              </td>
              <td className={styles.acoes}>
                <Link to={`/visualizar/${edicao.isbn}`} title="Visualizar">
                  <img
                    src="/assets/iconOlho.svg"
                    alt="Visualizar"
                    className={styles.icone}
                  />
                </Link>
                <button
                  className={styles.icone}
                  title="Editar"
                  onClick={() => handleOpenEditarModal(edicao)}
                >
                  <img src="/assets/iconLapis.svg" alt="Editar" />
                </button>
                <button
                  className={styles.icone}
                  title="Apagar"
                  onClick={() => handleOpenExcluirModal(edicao)}
                >
                  <img src="/assets/iconlixeira.svg" alt="Apagar" />
                </button>
              </td>
              <td className={styles.gerenciarCopias}>
                <button
                  className={styles.gerenciarCopiass}
                  onClick={() => handleOpenGerenciarModal(edicao)}
                >
                  <img
                    src="/assets/iconGerenciarCópias.svg"
                    alt="Gerenciar Cópias"
                    className={styles.icone}
                  />
                  Gerenciar cópias
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmação de exclusão */}
      {selectedEdicao && (
        <ModalExcluirEdicao
          isOpen={isExcluirModalOpen}
          onClose={handleCloseExcluirModal}
          edicao={selectedEdicao}
          onSuccess={atualizarLista}
        />
      )}

      {/* Modal de Gerenciar Cópias */}
      {gerenciarEdicao && (
        <ModalGerenciarCopias
          isOpen={isGerenciarModalOpen}
          onClose={handleCloseGerenciarModal}
          edicao={gerenciarEdicao}
        />
      )}

      {/* Modal de Editar Edição */}
      {selectedEdicao && (
  <ModalEditarEdicoes
    isOpen={isEditarModalOpen}
    onClose={handleCloseEditarModal}
    edicao={selectedEdicao} // Verifique se `selectedEdicao` está preenchido

  />
)}

    </div>
  );
};

export default TabelaEdicoes;
