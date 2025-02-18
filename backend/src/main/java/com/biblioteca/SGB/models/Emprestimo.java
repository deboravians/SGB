package com.biblioteca.SGB.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter

@Entity
@Table(name = "Emprestimos")
public class Emprestimo{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate dataEmprestimo;

    @Column()
    private LocalDate dataDevolucao;

    @Column()
    private LocalDate dataPrevistaDevolucao;

    @Column(nullable = false, length = 20)
    private String status;

    @ManyToOne
    @JoinColumn(name = "aluno_matricula")
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "professor_cpf")
    private Professor professor;

    @ManyToOne
    @JoinColumn(name = "copia_id", nullable = false)
    private Copia copia;

    public Emprestimo() {
    }

    public Emprestimo(LocalDate dataEmprestimo, String status, LocalDate dataPrevistaDevolucao) {
        this.dataEmprestimo = dataEmprestimo;
        this.status = status;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
    }
}