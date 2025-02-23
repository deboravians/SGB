package com.biblioteca.SGB.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AlunoDTO {

    private String nome;
    private String telefone;
    private String rua;
    private String bairro;
    private String matricula;

    public AlunoDTO() {
    }

    public AlunoDTO(String nome, String telefone, String rua, String bairro, String matricula) {
        this.nome = nome;
        this.telefone = telefone;
        this.rua = rua;
        this.bairro = bairro;
        this.matricula = matricula;
    }
}