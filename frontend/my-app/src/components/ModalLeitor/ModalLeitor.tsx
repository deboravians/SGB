import { useState } from "react";
import styles from "./ModalLeitor.module.css";

type TipoLeitor = "aluno" | "professor";

const DropdownLeitor = ({ onSelect }: { onSelect: (tipo: TipoLeitor) => void }) => {
  const leitores = ["Aluno", "Professor"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selecionado, setSelecionado] = useState<string | null>(null);

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
            {selecionado || "Selecionar o tipo de leitor"}
            <img src="/public/assets/iconSeta.svg" alt="" />
          </a>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              {leitores.map((item, index) => (
                <div
                  key={index}
                  className={styles.leitorItem}
                  onClick={() => {
                    setSelecionado(item);
                    onSelect(item.toLowerCase() as TipoLeitor);
                    setTimeout(() => setDropdownOpen(false), 50);
                  }}
                >
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

const ModalLeitor = ({
  isOpen,
  onClose,
  onConfirm,
  setTipoLeitor,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tipo: TipoLeitor) => void; // Agora recebe o tipo selecionado
  setTipoLeitor: (tipo: TipoLeitor) => void;
}) => {
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoLeitor | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Deseja realizar empréstimo para:</h3>
        <div className={styles.form}>
          <DropdownLeitor onSelect={setTipoSelecionado} />
          {erro && <p className={styles.erro}>{erro}</p>}
        </div>

        <div className={styles.actions}>
          <button className={styles.botaoCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.buttonCadastrar}
            onClick={() => {
              if (tipoSelecionado) {
                setTipoLeitor(tipoSelecionado);
                onConfirm(tipoSelecionado);
              } else {
                setErro("Selecione um tipo de leitor!");
              }
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalLeitor;