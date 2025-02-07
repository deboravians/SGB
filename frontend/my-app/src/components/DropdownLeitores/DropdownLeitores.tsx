import { useState } from "react";
import styles from "./DropdownLeitores.module.css";

const DropdownLeitores = ({
  onSelectLeitor,
}: {
  onSelectLeitor: (leitor: { matricula: number; nome: string}) => void;
}) => {
 
  const leitoresFicticios = [
    { matricula: 1234567, nome: "Anaildo Silva"},
    { matricula: 1234567, nome: "Anaildo Silva"},
    { matricula: 1234567, nome: "Anaildo Silva"},
    { matricula: 1234567, nome: "Anaildo Silva"},
    { matricula: 1234567, nome: "Anaildo Silva"},
    { matricula: 1234567, nome: "Anaildo Silva"},
   
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [leitorSelecionado, setLeitorSelecionado] = useState<{
    matricula: number;
    nome: string;
  } | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectLeitor = (leitor: { matricula: number; nome: string}) => {
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
              ? `${leitorSelecionado.matricula} - ${leitorSelecionado.nome}`
              : "Selecionar Leitor"}
            <img src="/public/assets/iconSeta.svg" alt="" />
          </a>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <div className={styles.leitorItemP}><input
                type="text"
                placeholder="Pesquisar aluno..."
                className={styles.campoPesquisa}
              /></div>
              {leitoresFicticios.map((leitor) => (
                <div
                  key={leitor.matricula}
                  className={styles.leitorItem}
                  onClick={() => handleSelectLeitor(leitor)} 
                >
                  <span>{leitor.matricula}</span>
                  <span>{leitor.nome}</span>
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default DropdownLeitores;
