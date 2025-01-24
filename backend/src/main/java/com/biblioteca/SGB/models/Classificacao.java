package com.biblioteca.SGB.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Classificações")
public class Classificacao {

    @Id
    @Column(nullable = false, unique = true)
    private String codigo;

    @Column(nullable = false, unique = true)
    private String titulo;

    @OneToMany(mappedBy = "classificacao")
    private List<Edicao> edicoes;

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
