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
@Table(name = "Professores")
public class Professor extends Leitores{

    @Id
    @Column(unique = true, nullable = false, length = 14)
    private String cpf;

    @Column(nullable = false)
    private String disciplina;

    public Professor(){
    }

    public Professor(String nome, String telefone, String rua, String bairro, String cpf, String disciplina) {
        super(nome, telefone, rua, bairro);
        this.cpf = cpf;
        this.disciplina = disciplina;
    }
}