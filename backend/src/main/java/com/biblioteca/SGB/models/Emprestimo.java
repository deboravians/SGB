package com.biblioteca.SGB.models;

import com.biblioteca.SGB.services.EmprestimoService;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @Transient
    private LocalDate dataPrevistaDevolucao;

    @Column()
    private LocalDate dataDevolucao;

    @Column(nullable = false, length = 20)
    private String status;

    @ManyToOne
    @JoinColumn(name = "aluno_matricula")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "professor_cpf")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Professor professor;

    @ManyToOne
    @JoinColumn(name = "copia_id", nullable = false)
    private Copia copia;

    public Emprestimo() {
    }

    public Emprestimo(LocalDate dataEmprestimo, String status) {
        this.dataEmprestimo = dataEmprestimo;
        this.status = status;
    }

    public LocalDate getDataPrevistaDevolucao() {
        return getProfessor() == null ? getDataEmprestimo().plusDays(7) : getDataEmprestimo().plusDays(30);
    }

    public String getStatus(EmprestimoService emprestimoService) {

        if(emprestimoService.getEmprestimoById(getId()).getStatus().equals("Extraviado")){ return "Extraviado";}

        if(emprestimoService.getEmprestimoById(getId()).getStatus().equals("Devolvido")){ return "Devolvido";}

        if(getDataPrevistaDevolucao().isBefore(LocalDate.now()) && getDataDevolucao() == null){ return "Atrasado"; }

        return "Pendente";
    }
}