import { useState, useEffect } from "react";
import styles from "./DropdownCopias.module.css";
import { listarCopias } from "../../api/copias";
import { Copia } from "../../types/copias";

const DropdownCopias = ({
  isbn,
  onSelect,
}: {
  isbn: string | null;
  onSelect: (copia: Copia) => void;
}) => {
  const [copias, setCopias] = useState<Copia[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copiaSelecionada, setCopiaSelecionada] = useState<Copia | null>(null);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    if (isbn) {
      listarCopias(isbn)
        .then(setCopias)
        .catch(() => setCopias([]));
    }
  }, [isbn]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectCopia = (copia: Copia) => {
    setCopiaSelecionada(copia);
    onSelect(copia);
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
            {copiaSelecionada
              ? `Cópia: ${copiaSelecionada.id}`
              : "Selecionar Cópia"}
            <img src="assets/iconSeta.svg" alt="" />
          </a>

          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <div className={styles.copiaItemP}>
                <input
                  type="text"
                  placeholder="Pesquisar Cópias..."
                  className={styles.campoPesquisa}
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>

              {copias.length > 0 ? (
                copias
                  .filter((copia) =>
                    copia.id.toString().includes(pesquisa.toLowerCase())
                  )
                  .map((copia) => (
                    <div
                      key={copia.id}
                      className={styles.copiaItem}
                      onClick={() => handleSelectCopia(copia)}
                    >
                      <span>{copia.id}</span>
                    </div>
                  ))
              ) : (
                <div className={styles.copiaItem}>Nenhuma cópia disponível!</div>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default DropdownCopias;
