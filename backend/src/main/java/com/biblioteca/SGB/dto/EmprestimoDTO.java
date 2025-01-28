package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.models.Copia;

import java.time.LocalDate;

public class EmprestimoDTO {

    private Integer id;
    private LocalDate dataEmprestimo;
    private LocalDate dataPrevistaDevolucao;
    private LocalDate dataDevolucao;
    private String status;
    private Aluno aluno;
    private Professor professor;
    private Copia copia;

    public EmprestimoDTO() {
    }

    // Construtor para empréstimos feitos por um Aluno
    public EmprestimoDTO(Integer id, LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao, LocalDate dataDevolucao, String status, Aluno aluno, Copia copia) {
        this.id = id;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
        this.aluno = aluno;
        this.copia = copia;
    }

    // Construtor para empréstimos feitos por um Professor
    public EmprestimoDTO(Integer id, LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao, LocalDate dataDevolucao, String status, Professor professor, Copia copia) {
        this.id = id;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
        this.professor = professor;
        this.copia = copia;
    }

    // Método para mapear um objeto Emprestimo para um DTO
    public static EmprestimoDTO fromEmprestimo(Emprestimo emprestimo) {
        if (emprestimo.getAluno() != null) {
            return new EmprestimoDTO(
                    emprestimo.getId(),
                    emprestimo.getDataEmprestimo(),
                    emprestimo.getDataPrevistaDevolucao(),
                    emprestimo.getDataDevolucao(),
                    emprestimo.getStatus(),
                    emprestimo.getAluno(),
                    emprestimo.getCopia()
            );
        } else if (emprestimo.getProfessor() != null) {
            return new EmprestimoDTO(
                    emprestimo.getId(),
                    emprestimo.getDataEmprestimo(),
                    emprestimo.getDataPrevistaDevolucao(),
                    emprestimo.getDataDevolucao(),
                    emprestimo.getStatus(),
                    emprestimo.getProfessor(),
                    emprestimo.getCopia()
            );
        }
        return null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public LocalDate getDataPrevistaDevolucao() {
        return dataPrevistaDevolucao;
    }

    public void setDataPrevistaDevolucao(LocalDate dataPrevistaDevolucao) {
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public Copia getCopia() {
        return copia;
    }

    public void setCopia(Copia copia) {
        this.copia = copia;
    }
}
