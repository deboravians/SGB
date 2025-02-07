package com.biblioteca.SGB.mapper;

import com.biblioteca.SGB.dto.EdicaoDTO;
import com.biblioteca.SGB.models.Edicao;

public class EdicaoMapper {

    public static EdicaoDTO toDTO(Edicao edicao, String status, int qtdCopias) {
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

    public static Edicao toModel(EdicaoDTO edicaoDTO) {
        return new Edicao(
                edicaoDTO.getIsbn(),
                edicaoDTO.getTitulo(),
                edicaoDTO.getAutor(),
                edicaoDTO.getAnoPublicacao()
        );
    }
}