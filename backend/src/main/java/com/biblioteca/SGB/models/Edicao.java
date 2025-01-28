package com.biblioteca.SGB.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Edicoes")
public class Edicao{

    @Id
    @Column(nullable = false, unique = true, length = 20)
    private String isbn;

    @Column(nullable = false, unique = true)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    @Column(nullable = false, length = 4)
    private String anoPublicacao;

    @Transient
    private String status;

    @Transient
    private int qtdCopias;

    @ManyToOne
    @JoinColumn(name = "classificacao_codigo")
    private Classificacao classificacao;

    // Métodos Sets

    public void setClassificacao(Classificacao classificacao) {
        this.classificacao = classificacao;
    }

    public void setisbn(String isbn) { this.isbn = isbn; }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setAnoPublicacao(String anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public void setQtdCopias(int qtdCopias) {
        this.qtdCopias = qtdCopias;
    }

    public void setStatus(String status) { this.status = status; }

    // Métodos Gets

    public Classificacao getClassificacao() {
        return classificacao;
    }

    public String getIsbn(){ return isbn; }

    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public String getAnoPublicacao() {
        return anoPublicacao;
    }

    public int getQtdCopias() {
        return qtdCopias;
    }

    public String getStatus() { return status; }

}

