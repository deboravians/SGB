import { useState, useEffect } from "react";
import styles from "./DropdownLeitores.module.css";
import { listarAlunos } from "../../api/alunos";
import { listarProfessores } from "../../api/professores";
import { Aluno } from "../../types/alunos";
import { Professor } from "../../types/professores";

type TipoLeitor = "aluno" | "professor";

const DropdownLeitores = ({
  tipoLeitor,
  onSelectLeitor,
}: {
  tipoLeitor: TipoLeitor;
  onSelectLeitor: (leitor: Aluno | Professor) => void;
}) => {
  const [leitores, setLeitores] = useState<(Aluno | Professor)[]>([]);
  const [leitoresFiltrados, setLeitoresFiltrados] = useState<(Aluno | Professor)[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [leitorSelecionado, setLeitorSelecionado] = useState<Aluno | Professor | null>(null);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const carregarLeitores = async () => {
      setLoading(true);
      try {
        if (tipoLeitor === "aluno") {
          const alunos = await listarAlunos();
          setLeitores(alunos);
          setLeitoresFiltrados(alunos);
        } else {
          const professores = await listarProfessores();
          setLeitores(professores);
          setLeitoresFiltrados(professores);
        }
      } catch (error) {
        alert("Erro ao carregar leitores.");
      } finally {
        setLoading(false);
      }
    };

    carregarLeitores();
  }, [tipoLeitor]);

  useEffect(() => {
    if (!pesquisa.trim()) {
      setLeitoresFiltrados(leitores);
    } else {
      const filtrados = leitores.filter((leitor) =>
        leitor.nome.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setLeitoresFiltrados(filtrados);
    }
  }, [pesquisa, leitores]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectLeitor = (leitor: Aluno | Professor) => {
    setLeitorSelecionado(leitor);
    onSelectLeitor(leitor);
    setDropdownOpen(false);
  };

  return (
    <nav className={styles.dropdownContainer}>
      <ul>
        <li className={styles.dropdown}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown();
            }}
          >
            {leitorSelecionado
              ? `${"matricula" in leitorSelecionado ? leitorSelecionado.matricula : leitorSelecionado.cpf} - ${leitorSelecionado.nome}`
              : "Selecionar Leitor"}
            <img src="/assets/iconSeta.svg" alt="" />
          </a>

          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <div className={styles.leitorItemP}>
                <input
                  type="text"
                  placeholder={`Pesquisar ${tipoLeitor === "aluno" ? "Aluno" : "Professor"}...`}
                  className={styles.campoPesquisa}
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>

              {loading ? (
                <p>Carregando...</p>
              ) : leitoresFiltrados.length === 0 ? (
                <p>Nenhum leitor encontrado.</p>
              ) : (
                leitoresFiltrados.map((leitor) => (
                  <div
                    key={"matricula" in leitor ? leitor.matricula : leitor.cpf}
                    className={styles.leitorItem}
                    onClick={() => handleSelectLeitor(leitor)}
                  >
                    <span>{"matricula" in leitor ? leitor.matricula : leitor.cpf}</span>
                    <span>{leitor.nome}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default DropdownLeitores;