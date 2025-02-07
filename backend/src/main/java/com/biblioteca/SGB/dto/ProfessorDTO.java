package com.biblioteca.SGB.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ProfessorDTO {

    private String nome;
    private String telefone;
    private String rua;
    private String bairro;
    private String cpf;
    private String disciplina;

    public ProfessorDTO() {
    }

    public ProfessorDTO(String nome, String telefone, String rua, String bairro, String cpf, String disciplina) {
        this.nome = nome;
        this.telefone = telefone;
        this.rua = rua;
        this.bairro = bairro;
        this.cpf = cpf;
        this.disciplina = disciplina;
    }
}