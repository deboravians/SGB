import { useState } from "react";
import styles from "./ModalCadastroDeEdicoes.module.css";
import DropdownClassificacao from "../DropdownClassificacao/DropdownClassificacao";
import { Edicao } from "../../types/edicoes";
import { cadastrarEdicao } from "../../api/edicoes";
import { Classificacao } from "../../types/classificacoes";
import { toast } from "react-toastify";

interface ModalDeCadastrarEdicoesProps {
  isOpen: boolean;
  onClose: () => void;
  carregarEdicoes: () => void;
}

const ModalDeCadastrarEdicoes: React.FC<ModalDeCadastrarEdicoesProps> = ({ isOpen, onClose, carregarEdicoes }) => {
  const [nome, setNome] = useState("");
  const [isbn, setIsbn] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [classificacaoSelecionada, setClassificacaoSelecionada] = useState<Classificacao | null>(null);

  const handleClassificacaoSelecionada = (classificacao: Classificacao) => {
    setClassificacaoSelecionada(classificacao); 
  };

  const handleCadastrar = async () => {
    if(!isbn){
      toast.warn("O ISBN é obrigatório.");
      return;
    }

    if (!classificacaoSelecionada) {
      toast.warn("Classificação não selecionada.");
      return;
    }
  
    const novaEdicao: Edicao = {
      isbn,
      titulo: nome,
      autor,
      anoPublicacao: ano, 
      status: "",
      qtdCopias: 0, 
    };
  
    try {

      await cadastrarEdicao(novaEdicao, classificacaoSelecionada.codigo);

      carregarEdicoes();
  
      setNome("");
      setIsbn("");
      setAutor("");
      setAno("");
      setClassificacaoSelecionada(null);
      onClose();
  
      toast.success(`Edição ${novaEdicao.titulo} cadastrada com sucesso!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    }
  };
  

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
                required
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
                required
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
          
          <DropdownClassificacao onSelectClassificacao={handleClassificacaoSelecionada} />
        </div>
  
        {/* Botões de Ação no canto inferior direito */}
        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.botaoCadastrar} onClick={handleCadastrar}>Cadastrar</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalDeCadastrarEdicoes;
