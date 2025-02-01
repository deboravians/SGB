import { useEffect, useState } from "react";
import styles from "./DropdownClassificacao.module.css";
import ModalCadastroDeClassificacao from "../ModalCadastroDeClassificacao/ModalCadastroDeClassificacao";
import { listarClassificacoes } from "../../api/classificacoes";
import { Classificacao } from "../../types/classificacoes";

const DropdownClassificacao = ({ onSelectClassificacao }: { onSelectClassificacao: (classificacao: Classificacao) => void }) => {
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classificacaoSelecionada, setClassificacaoSelecionada] = useState<Classificacao | null>(null); // Novo estado

  useEffect(() => {
    const fetchClassificacoes = async () => {
      try {
        const data = await listarClassificacoes();
        setClassificacoes(data);
      } catch (error) {
        console.error("Erro ao buscar classificações:", error);
      }
    };
    fetchClassificacoes();
  }, []); 

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCadastro = async () => {
    try {
      // Atualiza a lista de classificações após cadastrar uma nova
      const updatedClassificacoes = await listarClassificacoes();
      setClassificacoes(updatedClassificacoes);

      toggleModal();
    } catch (error) {
      console.error("Erro ao cadastrar classificação:", error);
    }
  };

  const handleSelectClassificacao = (classificacao: Classificacao) => {
    setClassificacaoSelecionada(classificacao); // Atualiza o estado da classificação selecionada
    onSelectClassificacao(classificacao); // Passa a classificação selecionada para o componente pai
    setDropdownOpen(false); // Fecha o dropdown após a seleção
  };

  return (
    <nav className={styles.dropdownContainer}>
      <div className={styles.titu}>Classificação</div>
      <ul>
        <li className={styles.dropdown}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown(); 
            }}
          >
            {classificacaoSelecionada ? `${classificacaoSelecionada.codigo} - ${classificacaoSelecionada.titulo}` : "Selecionar Classificação"} {/* Exibe o nome da classificação selecionada */}
            <img src="/public/assets/iconSeta.svg" alt="" />
          </a>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <button className={styles.buttonCadastrar} onClick={toggleModal}>
                <img src="/public/assets/iconCadastrar.svg" alt="" />
                Cadastrar classificação
              </button>

              {classificacoes.map((item) => (
                <div 
                  key={item.codigo} 
                  className={styles.classificationItem}
                  onClick={() => handleSelectClassificacao(item)} // Ao clicar, seleciona a classificação
                >
                  <span>{item.codigo}</span>
                  <span>{item.titulo}</span>
                  <div className={styles.iconGroup}>
                    <img src="/public/assets/iconLapis.svg" alt="Editar" title="Editar" className={styles.icon} />
                    <img src="/public/assets/iconlixeira.svg" alt="Excluir" title="Excluir" className={styles.icon} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
      {isModalOpen && (
        <ModalCadastroDeClassificacao
          isOpen={isModalOpen}
          onClose={toggleModal}
          onClassificacaoCadastrada={handleCadastro} // Atualiza a lista de classificações após o cadastro
        />
      )}
    </nav>
  );
};

export default DropdownClassificacao;
