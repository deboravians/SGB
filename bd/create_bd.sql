CREATE TABLE Classificacoes(

    codigo VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Edicoes(

    isbn VARCHAR(20) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL UNIQUE,
    autor VARCHAR(255) NOT NULL,
    ano_publicacao VARCHAR(4) NOT NULL,

    classificacao_codigo VARCHAR(50) NOT NULL,

    FOREIGN KEY (classificacao_codigo) REFERENCES Classificacoes(codigo)
);

CREATE TABLE Copias(

    id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL,

    edicao_isbn VARCHAR(20) NOT NULL,

    FOREIGN KEY (edicao_isbn) REFERENCES Edicoes(isbn)
);

CREATE TABLE Usuarios (

    id SERIAL PRIMARY KEY,
    login VARCHAR(5) NOT NULL UNIQUE,
    senha VARCHAR(5) NOT NULL UNIQUE
);

CREATE TABLE Alunos(

    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    bairro VARCHAR(255) NOT NULL,

    matricula VARCHAR(50) PRIMARY KEY,
    ano_letivo VARCHAR(50) NOT NULL
);

CREATE TABLE Professores(

    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    bairro VARCHAR(255) NOT NULL,

    cpf VARCHAR(14) PRIMARY KEY,
    disciplina VARCHAR(255) NOT NULL
);

CREATE TABLE Emprestimos (

    id SERIAL PRIMARY KEY,
    data_emprestimo DATE NOT NULL,
    data_prevista_devolucao DATE,
    data_devolucao DATE,
    status VARCHAR(20) NOT NULL,

    aluno_matricula VARCHAR(50),
    professor_cpf VARCHAR(14),
    copia_id INT NOT NULL,

    FOREIGN KEY (aluno_matricula) REFERENCES Alunos(matricula),
    FOREIGN KEY (professor_cpf) REFERENCES Professores(cpf),
    FOREIGN KEY (copia_id) REFERENCES Copias(id),
);