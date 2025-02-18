package com.biblioteca.SGB.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AlunoRankingDTO {
    private String matricula;
    private String nome;
    private String turma;
    private int totalEmprestimos;
    private int colocacao;

    public AlunoRankingDTO() {
    }

    public AlunoRankingDTO(String matricula, String nome, String turma, int totalEmprestimos, int colocacao) {
        this.matricula = matricula;
        this.nome = nome;
        this.turma = turma;
        this.totalEmprestimos = totalEmprestimos;
        this.colocacao = colocacao;
    }
}