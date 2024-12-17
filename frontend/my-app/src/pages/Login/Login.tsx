import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  
  const [login, setLogin] = useState(""); // Estado para o campo "Usuário"
  const [senha, setSenha] = useState(""); // Estado para o campo "Senha"
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const navigate = useNavigate(); // Para redirecionar após login bem-sucedido

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault(); // Previne o comportamento padrão do formulário
    setErrorMessage(""); // Limpa mensagens de erro anteriores

    try{

      const response = await fetch("http://localhost:8080/usuarios",{

        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ login, senha }), // Envia os dados no corpo da requisição

      });

      if(response.ok){

        const result = await response.json(); // Lê o corpo da resposta (JSON)

        // Verifica se o login foi bem-sucedido (retorno 1 ou 0)
        if(result === 1){

          console.log("Login bem-sucedido!");
          navigate("/home"); // Redireciona para a página "Home"

        }else if(result === 0){

          setErrorMessage("Usuário ou senha incorretos."); // Exibe mensagem de erro

        }else{

          setErrorMessage("Erro inesperado. Tente novamente.");

        }
      }else{

        setErrorMessage("Erro ao tentar realizar o login. Tente novamente.");

      }
    }catch (error){

      console.error("Erro ao fazer login:", error);
      setErrorMessage("Erro de conexão. Tente novamente.");

    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <div className={styles.conteudo}>
            <img
                src="./public/assets/logoMinhaBiblioteca.svg"
                alt="Logo Minha Biblioteca"
                className={styles.logo}
            />
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label htmlFor="usuario">Usuário</label>
                <input
                    type="text"
                    id="usuario"
                    placeholder="Digite o usuário..."
                    value={login} // Campo controlado pelo estado
                    onChange={(e) => setLogin(e.target.value)} // Atualiza o estado "usuario"
                    className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="senha">Senha</label>
                <div className={styles.passwordWrapper}>
                  <input
                      type={showPassword ? "text" : "password"}
                      id="senha"
                      placeholder="Digite sua senha..."
                      value={senha} // Campo controlado pelo estado
                      onChange={(e) => setSenha(e.target.value)} // Atualiza o estado "senha"
                      className={styles.input}
                  />
                  <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={togglePasswordVisibility}
                  >
                    &#128065;
                  </button>
                </div>
              </div>
              <button type="submit" className={styles.btn}>
                Entrar
              </button>
            </form>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Exibe erros */}
          </div>
        </div>
      </div>
  );
};

export default Login;