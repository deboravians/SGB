package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Edicao;

public class EdicaoDTO {

    private String isbn;
    private String titulo;
    private String autor;
    private String anoPublicacao;
    private String status;
    private int qtdCopias;
    private Classificacao classificacao;

    public EdicaoDTO() {
    }

    public EdicaoDTO(String isbn, String titulo, String autor, String anoPublicacao, String status, int qtdCopias, Classificacao classificacao) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.status = status;
        this.qtdCopias = qtdCopias;
        this.classificacao = classificacao;
    }

    // Método para mapear um objeto Edicao para um DTO
    public static EdicaoDTO fromEdicao(Edicao edicao) {
        return new EdicaoDTO(
                edicao.getIsbn(),
                edicao.getTitulo(),
                edicao.getAutor(),
                edicao.getAnoPublicacao(),
                edicao.getStatus(),
                edicao.getQtdCopias(),
                edicao.getClassificacao()
        );
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getAnoPublicacao() {
        return anoPublicacao;
    }

    public void setAnoPublicacao(String anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getQtdCopias() {
        return qtdCopias;
    }

    public void setQtdCopias(int qtdCopias) {
        this.qtdCopias = qtdCopias;
    }

    public Classificacao getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(Classificacao classificacao) {
        this.classificacao = classificacao;
    }
}
