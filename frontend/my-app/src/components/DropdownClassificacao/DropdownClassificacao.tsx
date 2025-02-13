import { useEffect, useState } from "react";
import styles from "./DropdownClassificacao.module.css";
import ModalCadastroDeClassificacao from "../ModalCadastroDeClassificacao/ModalCadastroDeClassificacao";
import ModalExcluirClassificacao from "../ModalExcluirClassificacao/ModalExcluirClassificacao";
import ModalEditarClassificacao from "../ModalEditarClassificacao/ModalEditarClassificacao";
import { listarClassificacoes } from "../../api/classificacoes";
import { Classificacao } from "../../types/classificacoes";

const DropdownClassificacao = ({ onSelectClassificacao }: { onSelectClassificacao: (classificacao: Classificacao) => void }) => {
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);
  const [classificacaoSelecionada, setClassificacaoSelecionada] = useState<Classificacao | null>(null);
  const [modalEditar, setModalEditar] = useState<Classificacao | null>(null);
  const [modalExcluir, setModalExcluir] = useState<Classificacao | null>(null);

  useEffect(() => {
    atualizarClassificacoes();
  }, []);

  const atualizarClassificacoes = async () => {
    try {
      setClassificacoes(await listarClassificacoes());
    } catch (error) {
      console.error("Erro ao atualizar classificações:", error);
    }
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleModalCadastro = () => setIsModalCadastroOpen((prev) => !prev);
  const abrirModalExcluir = (classificacao: Classificacao) => setModalExcluir(classificacao);
  const fecharModalExcluir = () => setModalExcluir(null);
  const abrirModalEditar = (classificacao: Classificacao) => setModalEditar(classificacao);
  const fecharModalEditar = () => setModalEditar(null);

  const handleSelectClassificacao = (classificacao: Classificacao) => {
    setClassificacaoSelecionada(classificacao);
    onSelectClassificacao(classificacao);
    setDropdownOpen(false);
  };

  return (
    <nav className={styles.dropdownContainer}>
      <div className={styles.titu}>Classificação</div>
      <ul>
        <li className={styles.dropdown}>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(); }}>
            {classificacaoSelecionada ? `${classificacaoSelecionada.codigo} - ${classificacaoSelecionada.titulo}` : "Selecionar Classificação"}
            <img src="/assets/iconSeta.svg" alt="" />
          </a>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <button className={styles.buttonCadastrar} onClick={toggleModalCadastro}>
                <img src="/assets/iconCadastrar.svg" alt="" />
                Cadastrar classificação
              </button>
              {classificacoes.map((item) => (
                <div key={item.codigo} className={styles.classificationItem} onClick={() => handleSelectClassificacao(item)}>
                  <span>{item.codigo}</span>
                  <span>{item.titulo}</span>
                  <div className={styles.iconGroup}>
                    <img
                      src="/assets/iconLapis.svg"
                      alt="Editar"
                      title="Editar"
                      className={styles.icon}
                      onClick={() => abrirModalEditar(item)}
                    />
                    <img
                      src="/assets/iconlixeira.svg"
                      alt="Excluir"
                      title="Excluir"
                      className={styles.icon}
                      onClick={() => abrirModalExcluir(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>

      {isModalCadastroOpen && (
        <ModalCadastroDeClassificacao
          isOpen={isModalCadastroOpen}
          onClose={toggleModalCadastro}
          onClassificacaoCadastrada={() => {
            atualizarClassificacoes();
            toggleModalCadastro(); // Fecha a modal após o cadastro
          }}
        />
      )}


      {modalExcluir && (
        <ModalExcluirClassificacao
          isOpen={!!modalExcluir}
          onClose={fecharModalExcluir}
          classificacao={modalExcluir}
          onSuccess={atualizarClassificacoes}
        />
      )}

      {modalEditar && (
        <ModalEditarClassificacao
          isOpen={!!modalEditar}
          onClose={fecharModalEditar}
          classificacao={modalEditar}
          onSuccess={() => {
            atualizarClassificacoes();
            fecharModalEditar();
          }}
        />
      )}
    </nav>
  );
};

export default DropdownClassificacao;
