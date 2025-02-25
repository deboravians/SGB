import { useState, useEffect } from "react";
import styles from "./DropdownEdicoes.module.css";
import { listarEdicoes } from "../../api/edicoes";
import { Edicao } from "../../types/edicoes";

const DropdownEdicoes = ({
  onSelectEdicao,
}: {
  onSelectEdicao: (edicao: Edicao) => void;
}) => {
  const [edicoes, setEdicoes] = useState<Edicao[]>([]);
  const [edicoesFiltradas, setEdicoesFiltradas] = useState<Edicao[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [edicaoSelecionada, setEdicaoSelecionada] = useState<Edicao | null>(
    null
  );
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const carregarEdicoes = async () => {
      try {
        const dados = await listarEdicoes();
        setEdicoes(dados);
        setEdicoesFiltradas(dados);
      } catch (error) {
        alert("Erro ao carregar as edições.");
      } finally {
        setLoading(false);
      }
    };

    carregarEdicoes();
  }, []);

  useEffect(() => {
    if (!pesquisa.trim()) {
      setEdicoesFiltradas(edicoes);
    } else {
      const filtradas = edicoes.filter((edicao) =>
        edicao.titulo.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setEdicoesFiltradas(filtradas);
    }
  }, [pesquisa, edicoes]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectEdicao = (edicao: Edicao) => {
    setEdicaoSelecionada(edicao);
    onSelectEdicao(edicao);
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
            {edicaoSelecionada
              ? `${edicaoSelecionada.titulo} - ${edicaoSelecionada.autor}`
              : "Selecionar Edição"}
            <img src="assets/iconSeta.svg" alt="" />
          </a>

          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <div className={styles.edicaoItemP}>
                <input
                  type="text"
                  placeholder="Pesquisar Edições..."
                  className={styles.campoPesquisa}
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>

              {loading ? (
                <p>Carregando...</p>
              ) : (
                edicoesFiltradas.map((edicao) => (
                  <div
                    key={edicao.isbn}
                    className={styles.edicaoItem}
                    onClick={() => handleSelectEdicao(edicao)}
                  >
                    <span>{edicao.titulo}</span>
                    <span>{edicao.autor}</span>
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

export default DropdownEdicoes;
