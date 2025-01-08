package com.biblioteca.SGB.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Livros")
public class Livro {

    @Id
    @Column(unique = true, nullable = false)
    private String ISBN;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    @Column(nullable = false)
    private String AnoPublicacao;

    @Column(nullable = false, name = "quantidade_em_estoque")
    private int qtdEstoque;

    @ManyToOne
    @JoinColumn(name = "classificacao_codigo", nullable = false) // Altere para o nome esperado
    private Classificacao classificacao;

    public void setClassificacao(Classificacao classificacao) {
        this.classificacao = classificacao;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setAnoPublicacao(String anoPublicacao) {
        AnoPublicacao = anoPublicacao;
    }

    public void setQtdEstoque(int qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
    }

    public Classificacao getClassificacao() {
        return classificacao;
    }

    public String getISBN() {
        return ISBN;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public String getAnoPublicacao() {
        return AnoPublicacao;
    }

    public int getQtdEstoque() {
        return qtdEstoque;
    }
}
