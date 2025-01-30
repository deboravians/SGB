package com.biblioteca.SGB.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

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

    public Aluno(){
        super();
    }

    public Aluno(String nome, String telefone, String rua, String bairro,
                 String matricula, String serie, String turma, String anoLetivo) {
        super(nome, telefone, rua, bairro);
        this.matricula = matricula;
        this.serie = serie;
        this.turma = turma;
        this.anoLetivo = anoLetivo;
    }

}