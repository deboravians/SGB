package com.biblioteca.SGB.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Professores")
public class Professor extends Leitores{

    @Id
    private String cpf;

    @Column(nullable = false)
    private String disciplina;

    public String getDisciplina() {
        return disciplina;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setDisciplina(String disciplina) {
        this.disciplina = disciplina;
    }

}
