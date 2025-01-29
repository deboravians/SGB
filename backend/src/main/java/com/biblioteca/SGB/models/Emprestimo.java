package com.biblioteca.SGB.models;

import com.biblioteca.SGB.services.EmprestimoService;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

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

    @OneToOne
    @JoinColumn(name = "copia_id", nullable = false)
    private Copia copia;

    public Emprestimo() {
    }

    public Emprestimo(LocalDate dataEmprestimo, String status) {
        this.dataEmprestimo = dataEmprestimo;
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
        return getProfessor() == null ? getDataEmprestimo().plusDays(7) : getDataEmprestimo().plusDays(30);
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

    public String getStatus(){
        return status;
    }

    public String getStatus(EmprestimoService emprestimoService) {

        if(emprestimoService.getEmprestimoById(getId()).getStatus().equals("Extraviado")){ return "Extraviado";}

        if(getDataPrevistaDevolucao().isBefore(LocalDate.now()) && getDataDevolucao() == null){ return "Atrasado"; }

        return "Pendente";
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
