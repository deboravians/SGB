package com.biblioteca.SGB.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Edicoes")
public class Edicao{

    @Id
    private String isbn;

    @Column(unique = true, nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    @Column(nullable = false)
    private String anoPublicacao;

    @Column
    private String status;

    @Column(name = "quantidade_em_estoque")
    private int qtdEstoque;

    @ManyToOne
    @JoinColumn()
    private Classificacao classificacao;

    @OneToMany(mappedBy = "edicao")
    private List<Copia> copias;

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

    public void setQtdEstoque(int qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
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

    public int getQtdEstoque() {
        return qtdEstoque;
    }

    public String getStatus() { return status; }

}

