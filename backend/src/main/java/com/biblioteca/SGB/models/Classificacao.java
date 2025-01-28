package com.biblioteca.SGB.models;

import jakarta.persistence.*;

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

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getCodigo() {
        return codigo;
    }
}
