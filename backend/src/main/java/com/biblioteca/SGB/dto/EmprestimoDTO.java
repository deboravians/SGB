package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Professor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class EmprestimoDTO {

    private Integer id;
    private String dataEmprestimo;
    private String dataPrevistaDevolucao;
    private String dataDevolucao;
    private String status;
    private Aluno aluno;
    private Professor professor;
    private Copia copia;

    public EmprestimoDTO() {
    }

    public EmprestimoDTO(Aluno aluno, Integer id, String dataEmprestimo, String dataPrevistaDevolucao, String dataDevolucao, String status, Copia copia) {
        this.id = id;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
        this.aluno = aluno;
        this.copia = copia;
    }

    public EmprestimoDTO(Professor professor, Integer id, String dataEmprestimo, String dataPrevistaDevolucao, String dataDevolucao, String status, Copia copia) {
        this.id = id;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
        this.professor = professor;
        this.copia = copia;
    }
}