package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Aluno;
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
    private String serie;
    private String turma;
    private String anoLetivo;

    public AlunoDTO() {
    }

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
}