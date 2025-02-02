package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.services.EmprestimoService;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter

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
    public EmprestimoDTO(Aluno aluno, Integer id, LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao, LocalDate dataDevolucao, String status, Copia copia) {
        this.id = id;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
        this.aluno = aluno;
        this.copia = copia;
    }

    // Construtor para empréstimos feitos por um Professor
    public EmprestimoDTO( Professor professor, Integer id, LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao, LocalDate dataDevolucao, String status, Copia copia) {
        this.id = id;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
        this.professor = professor;
        this.copia = copia;
    }

    public static EmprestimoDTO fromEmprestimo(Emprestimo emprestimo, String status) {
        if (emprestimo.getAluno() != null) {
            return new EmprestimoDTO(
                    emprestimo.getAluno(),
                    emprestimo.getId(),
                    emprestimo.getDataEmprestimo(),
                    emprestimo.getDataPrevistaDevolucao(),
                    emprestimo.getDataDevolucao(),
                    status,
                    emprestimo.getCopia()
            );
        } else if (emprestimo.getProfessor() != null) {
            return new EmprestimoDTO(
                    emprestimo.getProfessor(),
                    emprestimo.getId(),
                    emprestimo.getDataEmprestimo(),
                    emprestimo.getDataPrevistaDevolucao(),
                    emprestimo.getDataDevolucao(),
                    status,
                    emprestimo.getCopia()
            );
        }
        return null;
    }
}