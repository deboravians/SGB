package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Classificacao;

public class ClassificacaoDTO {

    private String codigo;
    private String titulo;

    public ClassificacaoDTO() {
    }

    public ClassificacaoDTO(String codigo, String titulo) {
        this.codigo = codigo;
        this.titulo = titulo;
    }

    // Método para mapear um objeto Classificacao para um DTO
    public static ClassificacaoDTO fromClassificacao(Classificacao classificacao) {
        return new ClassificacaoDTO(
                classificacao.getCodigo(),
                classificacao.getTitulo()
        );
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
}
