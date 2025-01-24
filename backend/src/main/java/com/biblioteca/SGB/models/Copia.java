package com.biblioteca.SGB.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Copias")
public class Copia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String isbn;

    private String status;

    @ManyToOne
    @JoinColumn(name = "edicao_id")
    private Edicao edicao;

    public int getId() {
        return id;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getStatus() {
        return status;
    }

    public Edicao getEdicao() {
        return edicao;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setEdicao(Edicao edicao) {
        this.edicao = edicao;
    }
}