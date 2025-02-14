import { useState } from "react";
import styles from "./ModalRealizarEmprestimo.module.css";
import DropdownEdicoes from "../DropdownEdicoes/DropdownEdicoes";
import DropdownLeitores from "../DropdownLeitores/DropdownLeitores";
import DropdownCopias from "../DropdownCopias/DropdownCopias";
import { cadastrarEmprestimo } from "../../api/emprestimos";
import { Edicao } from "../../types/edicoes";
import { Copia } from "../../types/copias";
import { Aluno } from "../../types/alunos";
import { Professor } from "../../types/professores";
import { toast } from "react-toastify";

const ModalRealizarEmprestimo = ({
  isOpen,
  onClose,
  onConfirm,
  tipoLeitor,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tipoLeitor: "aluno" | "professor" | null;
}) => {
  const [edicaoSelecionada, setEdicaoSelecionada] = useState<Edicao | null>(
    null
  );
  const [copiaSelecionada, setCopiaSelecionada] = useState<Copia | null>(null);
  const [leitorSelecionado, setLeitorSelecionado] = useState<
    Aluno | Professor | null
  >(null);
  const [dataEmprestimo, setDataEmprestimo] = useState("");

  const handleCadastrarEmprestimo = async () => {
    if (
      !tipoLeitor ||
      !copiaSelecionada ||
      !leitorSelecionado ||
      !dataEmprestimo
    ) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    const [ano, mes, dia] = dataEmprestimo.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const identificador =
      tipoLeitor === "aluno"
        ? (leitorSelecionado as Aluno).matricula
        : (leitorSelecionado as Professor).cpf;

    try {
      await cadastrarEmprestimo(
        tipoLeitor,
        copiaSelecionada.id,
        identificador,
        dataFormatada
      );
      toast.success(`Empréstimo realizado com sucesso!`);
      onConfirm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    }
  };

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Realizar Empréstimo</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Edição</label>
              <DropdownEdicoes onSelectEdicao={setEdicaoSelecionada} />
            </div>

            {edicaoSelecionada && (
              <div className={styles.inputWrapper}>
                <label className={styles.titulo}>Cópia</label>
                <DropdownCopias
                  isbn={edicaoSelecionada.isbn}
                  onSelect={setCopiaSelecionada}
                />
              </div>
            )}

            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Leitor</label>
              {tipoLeitor && (
                <DropdownLeitores
                  tipoLeitor={tipoLeitor}
                  onSelectLeitor={setLeitorSelecionado}
                />
              )}
            </div>

            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Data de Empréstimo</label>
              <input
                type="date"
                value={dataEmprestimo}
                onChange={(e) => setDataEmprestimo(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.botaoCadastrar}
            onClick={handleCadastrarEmprestimo}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalRealizarEmprestimo;
