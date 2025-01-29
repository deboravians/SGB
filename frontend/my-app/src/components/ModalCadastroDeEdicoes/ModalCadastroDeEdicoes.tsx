import React, { useState } from "react";
import styles from "./ModalCadastroDeEdicoes.module.css";

const DropdownClassificacao = () => {
  const classificacoes = [
    "076-345 Ficção Científica",
    "076-345 Romance",
    "076-345 Fantasia",
    "076-345 Biografia",
    "076-345 Autoajuda",
    "076-345 Autoajuda",
    "076-345 Autoajuda",
    "076-345 Autoajuda",
    "076-345 Autoajuda",
    "076-345 Autoajuda",
    "076-345 Autoajuda",
    "076-345 Autoajuda",
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    
    <nav className={styles.dropdownContainer}>
      <div id="titu" className={styles.titu}> Classificação</div>
      <ul>
        <li className={styles.dropdown}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }}
          >
        Selecionar Classificação 
        <img src="/public/assets/iconSeta.svg" alt="" />
          </a>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <button id="button" className={styles.buttonCadastrar}>
                <img src="/public/assets/iconCadastrar.svg" alt="" />Cadastrar classificação
              </button>
              {classificacoes.map((item, index) => (
                <div key={index} className={styles.classificationItem}>
                  <span>{item}</span>
                  <div className={styles.iconGroup}>
                    <img
                      src="/public/assets/iconLapis.svg"
                      alt="Editar"
                      title="Editar"
                      className={styles.icon}
                    />
                    <img
                      src="/public/assets/iconlixeira.svg"
                      alt="Excluir"
                      title="Excluir"
                      className={styles.icon}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

const ModalDeCadastrarEdicoes = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [nome, setNome] = useState("");
  const [isbn, setIsbn] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Cadastrar Edição</h3>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Nome</label>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Autor</label>
              <input
                type="text"
                placeholder="Autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputWrapper}>
              <label className={styles.titulo}>Ano de Publicação</label>
              <input
                type="number"
                placeholder="Ano de Publicação"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          
          <DropdownClassificacao />
        </div>
  
        {/* Botões de Ação no canto inferior direito */}
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoCadastrar}>Cadastrar</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalDeCadastrarEdicoes;
