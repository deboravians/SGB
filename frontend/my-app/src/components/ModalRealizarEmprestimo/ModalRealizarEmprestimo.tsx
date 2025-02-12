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
  const [erro, setErro] = useState<string | null>(null);

  const handleCadastrarEmprestimo = async () => {
    if (
      !tipoLeitor ||
      !copiaSelecionada ||
      !leitorSelecionado ||
      !dataEmprestimo
    ) {
      setErro("Preencha todos os campos!");
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

      onConfirm();
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao cadastrar empréstimo."
      );
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

        {erro && <p className={styles.erro}>{erro}</p>}

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