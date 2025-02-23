import styles from "./TabelaEmprestimos.module.css";
import StatusTag from "../StatusTag/StatusTag";
import { useState } from "react";
import ModalExcluirEmprestimo from '../ModalExcluirEmprestimo/ModalExcluirEmprestimo';
import ModalProrrogarPrazo from '../ModalProrrogarPrazo/ModalProrrogarPrazo';
import ModalEmprestimoExtraviado from "../ModalEmprestimoExtraviado/ModalEmprestimoExtraviado";
import ModalRegistrarDevolucao from "../ModalRegistrarDevolucao/ModalRegistrarDevolucao";
import { Emprestimo } from "../../types/emprestimos";

interface TabelaEmprestimosProps {
  emprestimos: Emprestimo[];
  atualizarLista: () => void;
}

type ModalType = "excluir" | "prorrogar" | "extraviado" | "devolvido" | null;

const TabelaEmprestimos: React.FC<TabelaEmprestimosProps> = ({ emprestimos, atualizarLista }) => {
  const [modalAberto, setModalAberto] = useState<ModalType>(null);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState<Emprestimo | null>(null);

  const abrirModal = (tipo: ModalType, emprestimo: Emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setModalAberto(tipo);
  };

  const fecharModal = () => {
    setModalAberto(null);
    setSelectedEmprestimo(null);
  };

  const handleConfirmarAcao = () => {
    if (selectedEmprestimo) {
      fecharModal();
    }
  };

  return (
    <>
      <table className={styles.tabelaEmprestimos}>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Leitor(a)</th>
            <th>Data prevista de devolução</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo) => (
            <tr key={emprestimo.id}>
              <td>{emprestimo.copia.edicao.titulo}</td>
              <td>{emprestimo.aluno?.nome ?? emprestimo.professor?.nome ?? "Não informado"}</td>
              <td>{emprestimo.dataPrevistaDevolucao}</td>
              <td>
                <StatusTag
                  status={emprestimo.status as "Atrasado" | "Em Andamento" | "Extraviado" | "Devolvido"}
                  tipo="emprestimo"
                />
              </td>
              <td className={styles.acoes}>
                <button
                  className={styles.icone0}
                  onClick={() => abrirModal("prorrogar", emprestimo)}
                  title="Prorrogar prazo"
                >
                  <img src="assets/iconProrrogar.svg" alt="Prorrogar prazo" />
                </button>
                <button
                  className={styles.icone1}
                  onClick={() => abrirModal("extraviado", emprestimo)}
                  title="Livro Extraviado"
                >
                  <img src="assets/iconExtraviado.svg" alt="Livro Extraviado" />
                </button>
                <button
                  className={styles.icone}
                  onClick={() => abrirModal("excluir", emprestimo)}
                  title="Excluir empréstimo"
                >
                  <img src="assets/iconlixeira.svg" alt="Excluir empréstimo" />
                </button>
                <button
                  className={styles.icone}
                  onClick={() => abrirModal("devolvido", emprestimo)}
                  title="Registrar Devolução"
                >
                  <img src="assets/iconOK.svg" alt="Registrar Devolução" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modais */}
      <ModalExcluirEmprestimo
        isOpen={modalAberto === "excluir"}
        onClose={fecharModal}
        onConfirm={handleConfirmarAcao}
        onSuccess={atualizarLista}
        emprestimo={selectedEmprestimo}
      />
      <ModalProrrogarPrazo
        isOpen={modalAberto === "prorrogar"}
        onClose={fecharModal}
        onConfirm={handleConfirmarAcao}
        onSuccess={atualizarLista}
        emprestimo={selectedEmprestimo}
      />
      <ModalEmprestimoExtraviado
        isOpen={modalAberto === "extraviado"}
        onClose={fecharModal}
        onConfirm={handleConfirmarAcao}
        onSuccess={atualizarLista}
        emprestimo={selectedEmprestimo}
      />
      <ModalRegistrarDevolucao
        isOpen={modalAberto === "devolvido"}
        onClose={fecharModal}
        onConfirm={handleConfirmarAcao}
        onSuccess={atualizarLista}
        emprestimo={selectedEmprestimo}
      />
    </>
  );
};

export default TabelaEmprestimos;