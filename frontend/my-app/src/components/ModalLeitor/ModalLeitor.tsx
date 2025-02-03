import React, { useState } from "react";
import styles from "./ModalLeitor.module.css";

const DropdownLeitor = () => {
  
  const leitores = [
    "Aluno",
    "Professor",
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    
    <nav className={styles.dropdownContainer}>
      <ul>
        <li className={styles.dropdown}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }}
          >
        Selecionar o tipo de leitor 
        <img src="/public/assets/iconSeta.svg" alt="" />
          </a>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              {leitores.map((item, index) => (
                <div key={index} className={styles.leitorItem}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

const ModalLeitor = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Deseja realizar empréstimo para:</h3>
        <div className={styles.form}>

          <DropdownLeitor />
        </div>
  
        {/* Botões de Ação no canto inferior direito */}
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button id="button" className={styles.buttonCadastrar}
           onClick={toggleModal} >
      Cadastrar
  </button>

        </div>
      </div>
    </div>
  ) : null;
};

export default ModalLeitor;
