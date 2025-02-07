package com.biblioteca.SGB.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ClassificacaoDTO {

    private String codigo;
    private String titulo;

    public ClassificacaoDTO() {
    }

    public ClassificacaoDTO(String codigo, String titulo) {
        this.codigo = codigo;
        this.titulo = titulo;
    }
}