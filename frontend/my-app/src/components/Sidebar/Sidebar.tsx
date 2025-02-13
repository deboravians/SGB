import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./sidebar.module.css";

function SideBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelection = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className={style.sidebar}>
      <nav>
        <ul className={style.navList}>
          <li
            className={`${style.navItem} ${selectedItem === "livros" ? style.selected : ""
              }`}
            onClick={() => handleSelection("livros")}
          >
            <img
              src="/assets/iconLivros.svg"
              alt="Ícone de Livros"
            />
            <Link to="/livros">Livros</Link>
          </li>
          <li
            className={`${style.navItem} ${selectedItem === "emprestimos" ? style.selected : ""
              }`}
            onClick={() => handleSelection("emprestimos")}
          >
            <img
              src="/assets/iconEmprestimos.svg"
              alt="Ícone de Empréstimos"
            />
            <Link to="/emprestimos">Empréstimos</Link>
          </li>
          <li
            className={`${style.navItem} ${selectedItem?.includes("leitores") ? style.selected : ""
              }`}
            onClick={toggleDropdown}
          >
            <div className={style.dropdownToggle}>
              <div>
                <img
                  src="/assets/iconUsuarios.svg"
                  alt="Ícone de Usuários"
                />
                <span>Leitores</span>
              </div>
              <img
                src="/assets/iconSeta.svg"
                alt="Seta para baixo"
                className={dropdownOpen ? style.rotated : ""}
              />
            </div>
          </li>
          {dropdownOpen && (
            <ul className={style.dropdownMenu}>
              <li
                className={`${style.navItem} ${selectedItem === "leitores-alunos" ? style.selected : ""
                  }`}
              >
                <Link to="/leitores/alunos" onClick={() => handleSelection("leitores-alunos")}>Alunos</Link>
              </li>
              <li
                className={`${style.navItem} ${selectedItem === "leitores-professores" ? style.selected : ""
                  }`}
              >
                <Link to="/leitores/professores" onClick={() => handleSelection("leitores-professores")}>Professores</Link>
              </li>
            </ul>
          )}
          <li
            className={`${style.navItem} ${selectedItem === "relatorios" ? style.selected : ""
              }`}
            onClick={() => handleSelection("relatorios")}
          >
            <img
              src="/assets/iconRelatorios.svg"
              alt="Ícone de Relatórios"
            />
            <Link to="/relatorios">Relatórios e Estatísticas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
