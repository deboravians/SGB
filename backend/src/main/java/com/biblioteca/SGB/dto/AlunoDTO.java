package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Aluno;

public class AlunoDTO {

    private String nome;
    private String telefone;
    private String rua;
    private String bairro;
    private String matricula;
    private String serie;
    private String turma;
    private String anoLetivo;

    // Construtor padrão
    public AlunoDTO() {
    }

    // Construtor com todos os atributos
    public AlunoDTO(String nome, String telefone, String rua, String bairro, String matricula, String serie, String turma, String anoLetivo) {
        this.nome = nome;
        this.telefone = telefone;
        this.rua = rua;
        this.bairro = bairro;
        this.matricula = matricula;
        this.serie = serie;
        this.turma = turma;
        this.anoLetivo = anoLetivo;
    }

    // Método para mapear um objeto Aluno para um DTO
    public static AlunoDTO fromAluno(Aluno aluno) {
        return new AlunoDTO(
                aluno.getNome(),
                aluno.getTelefone(),
                aluno.getRua(),
                aluno.getBairro(),
                aluno.getMatricula(),
                aluno.getSerie(),
                aluno.getTurma(),
                aluno.getAnoLetivo()
        );
    }

    // Métodos getters e setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getSerie() {
        return serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public String getTurma() {
        return turma;
    }

    public void setTurma(String turma) {
        this.turma = turma;
    }

    public String getAnoLetivo() {
        return anoLetivo;
    }

    public void setAnoLetivo(String anoLetivo) {
        this.anoLetivo = anoLetivo;
    }
}