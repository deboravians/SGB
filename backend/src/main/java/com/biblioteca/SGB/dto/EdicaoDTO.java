package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.services.CopiaService;
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

    public static EdicaoDTO fromEdicao(Edicao edicao, String status, int qtdCopias) {
        return new EdicaoDTO(
                edicao.getIsbn(),
                edicao.getTitulo(),
                edicao.getAutor(),
                edicao.getAnoPublicacao(),
                status,
                qtdCopias,
                edicao.getClassificacao()

        );
    }
}