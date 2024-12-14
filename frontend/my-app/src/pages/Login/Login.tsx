import React, { useState } from "react";
import styles from "./login.module.css";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.conteudo}>
          <img
            src="src/assets/logoMinhaBiblioteca.svg"
            alt="Logo Minha Biblioteca"
            className={styles.logo}
          />
          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                id="usuario"
                placeholder="Digite o usuário..."
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
        </div>
      </div>
    </div>
  );
};

export default Login;
