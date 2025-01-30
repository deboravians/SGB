package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Classificacao;
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

    public static ClassificacaoDTO fromClassificacao(Classificacao classificacao) {
        return new ClassificacaoDTO(
                classificacao.getCodigo(),
                classificacao.getTitulo()
        );
    }
}
