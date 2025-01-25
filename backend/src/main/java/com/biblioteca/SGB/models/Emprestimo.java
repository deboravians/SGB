package com.biblioteca.SGB.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Emprestimos")
public class Emprestimo{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dataEmprestimo;

    @Column()
    private LocalDate dataPrevistaDevolucao;

    @Column()
    private LocalDate dataDevolucao;

    @Column()
    private String status;

    @ManyToOne
    @JoinColumn
    private Aluno aluno;

    @ManyToOne
    @JoinColumn
    private Professor professor;

    @OneToOne
    @JoinColumn
    private Copia copia;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Copia getCopia() {
        return copia;
    }

    public void setCopia(Copia copia) {
        this.copia = copia;
    }
}
