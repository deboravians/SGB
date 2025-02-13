import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result === 1) {
          navigate("/home");
        } else if (result === 0) {
          setErrorMessage("Usuário ou senha incorretos.");
        } else {
          setErrorMessage("Erro inesperado. Tente novamente.");
        }
      } else {
        setErrorMessage("Erro ao tentar realizar o login. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMessage("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.conteudo}>
          <img
            src="/assets/logoMinhaBiblioteca.svg"
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
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
