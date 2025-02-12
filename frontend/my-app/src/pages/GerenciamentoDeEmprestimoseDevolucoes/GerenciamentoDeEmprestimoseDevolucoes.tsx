import { useState, useEffect } from "react";
import TabelaEmprestimos from "../../components/TabelaEmprestimos/TabelaEmprestimos";
import styles from "./GerenciamentoDeEmprestimoseDevolucoes.module.css";
import CardInfors from "../../components/CardInfors/CardInfors";
import ModalLeitor from "../../components/ModalLeitor/ModalLeitor";
import ModalRealizarEmprestimo from "../../components/ModalRealizarEmprestimo/ModalRealizarEmprestimo";
import { listarEmprestimos } from "../../api/emprestimos";
import { Emprestimo } from "../../types/emprestimos";
type TipoLeitor = "aluno" | "professor";

function GerenciamentoDeEmprestimoseDevolucoes() {
  const [isModalLeitorOpen, setIsModalLeitorOpen] = useState(false);
  const [isModalEmprestimoOpen, setIsModalEmprestimoOpen] = useState(false);
  const [tipoLeitor, setTipoLeitor] = useState<TipoLeitor | null>(null);
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const toggleModalLeitor = () => {
    setTipoLeitor(null);
    setIsModalLeitorOpen(!isModalLeitorOpen);
  };

  const handleConfirmLeitor = (tipo: string) => {
    if (tipo === "aluno" || tipo === "professor") {
      setTipoLeitor(tipo);
      setIsModalLeitorOpen(false);
      setTimeout(() => setIsModalEmprestimoOpen(true), 100);
    } else {
      alert("Tipo de leitor inválido.");
    }
  };

  const emprestimosFiltrados = emprestimos.filter(
    (emprestimo) =>
      emprestimo.aluno?.nome
        .toLowerCase()
        .includes(termoPesquisa.toLowerCase()) ||
      emprestimo.professor?.nome
        .toLowerCase()
        .includes(termoPesquisa.toLowerCase()) ||
      emprestimo.copia.edicao.titulo
        .toLowerCase()
        .includes(termoPesquisa.toLowerCase()) ||
      emprestimo.dataEmprestimo.includes(termoPesquisa)
  );

  const carregarEmprestimos = async () => {
    try {
      setLoading(true);
      const dados = await listarEmprestimos();
      setEmprestimos(dados);
    } catch (error) {
      alert("Erro ao carregar os empréstimos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEmprestimos();
  }, []);

  return (
    <div className={styles.mainContent}>
      <div className={styles.cadastroLivros}>
        <h1 className={styles.titulo}>
          Gerenciamento de empréstimos e devoluções
        </h1>
        <div className={styles.divisao}></div>
        <p className={styles.descricao}>Visão geral de empréstimos</p>

        <div className={styles.resumo}>
          <CardInfors quantidade={35} descricao="Livros Emprestados" />
          <CardInfors quantidade={15} descricao="Empréstimos em atraso" />
        </div>

        <div className={styles.acoesContainer}>
          <input
            type="text"
            placeholder="Pesquisar Empréstimos..."
            className={styles.campoPesquisa}
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
          <button className={styles.botaoCadastrar} onClick={toggleModalLeitor}>
            <img
              src="/public/assets/iconCadastrar.svg"
              alt="Cadastrar"
              className={styles.icone}
            />
            Realizar empréstimo
          </button>
        </div>

        {/* Tabela */}
        {loading ? (
          <p>Carregando empréstimos...</p>
        ) : (
          <TabelaEmprestimos emprestimos={emprestimosFiltrados} atualizarLista={carregarEmprestimos}/>
        )}

        {isModalLeitorOpen && (
          <ModalLeitor
            isOpen={isModalLeitorOpen}
            onClose={() => setIsModalLeitorOpen(false)}
            onConfirm={handleConfirmLeitor}
            setTipoLeitor={setTipoLeitor}
          />
        )}

        {isModalEmprestimoOpen && tipoLeitor && (
          <ModalRealizarEmprestimo
            isOpen={isModalEmprestimoOpen}
            onClose={() => setIsModalEmprestimoOpen(false)}
            onConfirm={() => {
              setIsModalEmprestimoOpen(false);
              carregarEmprestimos();
            }}
            tipoLeitor={tipoLeitor}
          />
        )}
      </div>
    </div>
  );
}

export default GerenciamentoDeEmprestimoseDevolucoes;