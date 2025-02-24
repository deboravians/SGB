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
  const [modalAberto, setModalAberto] = useState<
    "excluir" | "gerenciar" | "editar" | null
  >(null);

  const abrirModal = (
    tipo: "excluir" | "gerenciar" | "editar",
    edicao: Edicao
  ) => {
    setSelectedEdicao(edicao);
    setModalAberto(tipo);
  };

  const fecharModal = () => {
    setSelectedEdicao(null);
    setModalAberto(null);
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
                <Link to={`/edicoes/${edicao.isbn}`} title="Visualizar">
                  <img
                    src="assets/iconOlho.svg"
                    alt="Visualizar"
                    className={styles.icone}
                  />
                </Link>
                <button
                  className={styles.icone}
                  title="Editar"
                  onClick={() => abrirModal("editar", edicao)}
                >
                  <img src="assets/iconLapis.svg" alt="Editar" />
                </button>
                <button
                  className={styles.icone}
                  title="Apagar"
                  onClick={() => abrirModal("excluir", edicao)}
                >
                  <img src="assets/iconlixeira.svg" alt="Apagar" />
                </button>
              </td>
              <td className={styles.gerenciarCopias}>
                <button
                  className={styles.gerenciarCopiass}
                  onClick={() => abrirModal("gerenciar", edicao)}
                >
                  <img
                    src="assets/iconGerenciarCópias.svg"
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

      {/* Modais */}
      {selectedEdicao && modalAberto === "excluir" && (
        <ModalExcluirEdicao
          isOpen={true}
          onClose={fecharModal}
          edicao={selectedEdicao}
          onSuccess={atualizarLista}
        />
      )}

      {selectedEdicao && modalAberto === "gerenciar" && (
        <ModalGerenciarCopias
          isOpen={true}
          onClose={fecharModal}
          edicao={selectedEdicao}
        />
      )}

      {selectedEdicao && modalAberto === "editar" && (
        <ModalEditarEdicoes
          isOpen={true}
          onClose={fecharModal}
          edicao={selectedEdicao}
          onSuccess={atualizarLista}
        />
      )}
    </div>
  );
};

export default TabelaEdicoes;
