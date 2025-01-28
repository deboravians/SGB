package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Professor;

public class ProfessorDTO {

    private String nome;
    private String telefone;
    private String rua;
    private String bairro;
    private String cpf;
    private String disciplina;

    // Construtor padrão
    public ProfessorDTO() {
    }

    // Construtor com todos os atributos
    public ProfessorDTO(String nome, String telefone, String rua, String bairro, String cpf, String disciplina) {
        this.nome = nome;
        this.telefone = telefone;
        this.rua = rua;
        this.bairro = bairro;
        this.cpf = cpf;
        this.disciplina = disciplina;
    }

    // Método para mapear um objeto Professor para um DTO
    public static ProfessorDTO fromProfessor(Professor professor) {
        return new ProfessorDTO(
                professor.getNome(),
                professor.getTelefone(),
                professor.getRua(),
                professor.getBairro(),
                professor.getCpf(),
                professor.getDisciplina()
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(String disciplina) {
        this.disciplina = disciplina;
    }
}