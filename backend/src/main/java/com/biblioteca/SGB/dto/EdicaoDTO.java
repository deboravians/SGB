package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Classificacao;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

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
}