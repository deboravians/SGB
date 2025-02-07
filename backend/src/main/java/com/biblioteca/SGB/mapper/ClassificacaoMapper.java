package com.biblioteca.SGB.mapper;

import com.biblioteca.SGB.dto.ClassificacaoDTO;
import com.biblioteca.SGB.models.Classificacao;

public class ClassificacaoMapper {

    public static ClassificacaoDTO toDTO(Classificacao classificacao) {
        return new ClassificacaoDTO(
                classificacao.getCodigo(),
                classificacao.getTitulo()
        );
    }

    public static Classificacao toModel(ClassificacaoDTO classificacaoDTO) {
        return new Classificacao(
                classificacaoDTO.getCodigo(),
                classificacaoDTO.getTitulo()
        );
    }
}
