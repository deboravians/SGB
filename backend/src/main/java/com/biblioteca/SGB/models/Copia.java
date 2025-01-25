package com.biblioteca.SGB.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Copias")
public class Copia {

    @Id
    @Column(unique = true, nullable = false)
    private String isbn;

    private String status;

    @ManyToOne
    @JoinColumn(name = "edicao_id")
    private Edicao edicao;

    public String getIsbn() {
        return isbn;
    }

    public String getStatus() {
        return status;
    }

    public Edicao getEdicao() {
        return edicao;
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