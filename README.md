# 📚 Sistema de Gerenciamento de Biblioteca

Bem-vindo ao **Sistema de Gerenciamento de Biblioteca**

## 🛠️ Tecnologias Utilizadas

- **Front-end**: Electron.js com React e TypeScript
- **Back-end**: Spring Boot
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker e Docker Compose

---

## 🚀 Funcionalidades Principais

- Gerenciamento de leitores.
- Cadastro e edição de livros.
- Registro e controle de empréstimos e devoluções.
- Visualização de histórico de transações.

---

## 🧰 Configuração do Projeto

### Pré-requisitos

Certifique-se de que as ferramentas abaixo estão instaladas no seu ambiente:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [JDK 23](https://jdk.java.net/)

---

## 📦 Como Executar o Back-end com Docker Compose

Com o repositório já clonado, deve-se entrar na pasta do backend, usando o comando:

    - "cd backend"

Dê build no backend do projeto, usando o comando:

    - "./mvnw clean package"

Volte para a pasta root, usando o comando:

    - "cd .."

Construa a imagem, usando o comando:

    - "docker-compose build"

Depois, suba o container, usando o comando:

    - "docker-compose up"

- Acesse o Back-end: O servidor estará disponível em http://localhost:8080.

---

## 🖥️ Como Executar o Front-end

Entre na pasta do front-end, usando o comando:

    - "cd frontend/my-app"

Instale as dependências do Front-end, usando o comando:

    - "npm i"

Por fim, execute, usando o comando:

    - "npm run dev"

---

## 📃 Como Acessar a Documentação da API no Swagger

No terminal da IDE, entre na pasta backend, usando o comando:

    - "cd backend"

Depois, rode o spring diretamente dessa pasta, usando o comando:

    - "./mvnw spring-boot:run"

- Acesse o Swagger: A documentação estará disponível em http://localhost:8080/swagger-ui/index.html.

Se não funcionar, tente re-sincronizar as dependencias do maven, usando o comando:
 
        - "./mvnw clean install -U"

Depois, rode o spring novamente