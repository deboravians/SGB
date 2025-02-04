import { useState } from "react";
import styles from "./DropdownLivros.module.css";

const DropdownLivros = ({
  onSelectLivro,
}: {
  onSelectLivro: (livro: { id: number; titulo: string; autor: string }) => void;
}) => {

  const livrosFicticios = [
    { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien" },
    { id: 2, titulo: "1984", autor: "George Orwell" },
    { id: 3, titulo: "Dom Casmurro", autor: "Machado de Assis" },
    { id: 4, titulo: "A Revolução dos Bichos", autor: "George Orwell" },
    { id: 5, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState<{
    id: number;
    titulo: string;
    autor: string;
  } | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectLivro = (livro: { id: number; titulo: string; autor: string }) => {
    setLivroSelecionado(livro);
    onSelectLivro(livro);
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

            {livroSelecionado
              ? `${livroSelecionado.titulo} - ${livroSelecionado.autor}`
              : "Selecionar Livro"}
            <img src="/public/assets/iconSeta.svg" alt="" />
          </a>

          {dropdownOpen && (

            <div className={styles.dropdownContent}>
             <div className={styles.livroItemP}><input
                type="text"
                placeholder="Pesquisar Livros..."
                className={styles.campoPesquisa}
              /></div>
              {livrosFicticios.map((livro) => (
                <div
                  key={livro.id}
                  className={styles.livroItem}
                  onClick={() => handleSelectLivro(livro)}
                >

                  <span>{livro.titulo}</span>
                  <span>{livro.autor}</span>
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default DropdownLivros;
