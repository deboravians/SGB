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
@Table(name = "Classificacoes")
public class Classificacao{

    @Id
    @Column(nullable = false, unique = true, length = 50)
    private String codigo;

    @Column(nullable = false, unique = true)
    private String titulo;

    public Classificacao() {
    }

    public Classificacao(String codigo, String titulo) {
        this.codigo = codigo;
        this.titulo = titulo;
    }
}