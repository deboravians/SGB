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

    public Aluno(){
        super();
    }

    public Aluno(String nome, String telefone, String rua, String bairro,
                 String matricula) {
        super(nome, telefone, rua, bairro);
        this.matricula = matricula;
    }
}