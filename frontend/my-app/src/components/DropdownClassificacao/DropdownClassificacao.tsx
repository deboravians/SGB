import { useEffect, useState } from "react";
import styles from "./DropdownClassificacao.module.css";
import ModalCadastroDeClassificacao from "../ModalCadastroDeClassificacao/ModalCadastroDeClassificacao";
import { listarClassificacoes } from "../../api/classificacoes";
import { Classificacao } from "../../types/classificacoes";
import ModalEditarClassificacao from "../ModalEditarClassificacao/ModalEditarClassificacao";
import ModalExcluirClassificacao from "../ModalExcluirClassificacao/ModalExcluirClassificacao";
const DropdownClassificacao = ({ onSelectClassificacao }: { onSelectClassificacao: (classificacao: Classificacao) => void }) => {
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);

  const [classificacaoSelecionada, setClassificacaoSelecionada] = useState<Classificacao | null>(null);
  const [classificacaoEditar, setClassificacaoEditar] = useState<Classificacao | null>(null);
  const [classificacaoExcluir, setClassificacaoExcluir] = useState<Classificacao | null>(null);

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

  const toggleModalCadastro = () => setIsModalCadastroOpen(!isModalCadastroOpen);
  const toggleModalEditar = () => setIsModalEditarOpen(!isModalEditarOpen);
  const toggleModalExcluir = () => setIsModalExcluirOpen(!isModalExcluirOpen);

  const handleSelectClassificacao = (classificacao: Classificacao) => {
    setClassificacaoSelecionada(classificacao);
    onSelectClassificacao(classificacao);
    setDropdownOpen(false);
  };

  const handleEditarClassificacao = (classificacao: Classificacao) => {
    setClassificacaoEditar(classificacao);
    toggleModalEditar();
  };

  const handleExcluirClassificacao = (classificacao: Classificacao) => {
    setClassificacaoExcluir(classificacao);
    toggleModalExcluir();
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
            {classificacaoSelecionada
              ? `${classificacaoSelecionada.codigo} - ${classificacaoSelecionada.titulo}`
              : "Selecionar Classificação"}
            <img src="/public/assets/iconSeta.svg" alt="" />
          </a>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <button className={styles.buttonCadastrar} onClick={toggleModalCadastro}>
                <img src="/public/assets/iconCadastrar.svg" alt="" />
                Cadastrar classificação
              </button>

              {classificacoes.map((item) => (
                <div
                  key={item.codigo}
                  className={styles.classificationItem}
                  onClick={() => handleSelectClassificacao(item)}
                >
                  <span>{item.codigo}</span>
                  <span>{item.titulo}</span>
                  <div className={styles.iconGroup}>
                    <img
                      src="/public/assets/iconLapis.svg"
                      alt="Editar"
                      title="Editar"
                      className={styles.icon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditarClassificacao(item);
                      }}
                    />
                       <img
                      src="/public/assets/iconlixeira.svg"
                      alt="Excluir"
                      title="Excluir"
                      className={styles.icon}
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleExcluirClassificacao(item);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
      {isModalCadastroOpen && (
        <ModalCadastroDeClassificacao isOpen={isModalCadastroOpen} onClose={toggleModalCadastro} />
      )}
      {isModalEditarOpen && classificacaoEditar && (
        <ModalEditarClassificacao isOpen={isModalEditarOpen} onClose={toggleModalEditar} />
      )}
        {isModalExcluirOpen && classificacaoExcluir && (
        <ModalExcluirClassificacao isOpen={isModalExcluirOpen} onClose={toggleModalExcluir} />
      )}
    </nav>
  );
};

export default DropdownClassificacao;
