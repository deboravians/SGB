package com.biblioteca.SGB.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Alunos")
public class Aluno extends Leitores {

    @Id
    @Column(unique = true, nullable = false, length = 50)
    private String matricula;

    @Column(nullable = false, length = 50)
    private String serie;

    @Column(nullable = false, length = 50)
    private String turma;

    @Column(nullable = false, length = 50)
    private String anoLetivo;

    public String getMatricula() {
        return matricula;
    }

    public String getSerie() {
        return serie;
    }

    public String getTurma() {
        return turma;
    }

    public String getAnoLetivo() {
        return anoLetivo;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public void setTurma(String turma) {
        this.turma = turma;
    }

    public void setAnoLetivo(String anoLetivo) {
        this.anoLetivo = anoLetivo;
    }
}
