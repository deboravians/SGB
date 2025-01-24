package com.biblioteca.SGB.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Edicoes")
public class Edicao{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    @Column(nullable = false)
    private String anoPublicacao;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false, name = "quantidade_em_estoque")
    private int qtdEstoque;

    @ManyToOne
    @JoinColumn(name = "classificacao_codigo", nullable = false) // Altere para o nome esperado
    private Classificacao classificacao;

    //variavel usada  apenas para receber o codigo, não vai para o bd e depois é "descartada"
    @Transient
    private String classificacaoCodigo;

    // Métodos Sets

    public void setClassificacaoCodigo(String classificacaoCodigo) {
        this.classificacaoCodigo = classificacaoCodigo;
    }

    public void setClassificacao(Classificacao classificacao) {
        this.classificacao = classificacao;
    }

    public void setId(int id) { this.id = id; }

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

    public int getId(){ return id; }

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

    public String getClassificacaoCodigo() {
        return classificacaoCodigo;
    }

    public String getStatus() { return status; }

}

