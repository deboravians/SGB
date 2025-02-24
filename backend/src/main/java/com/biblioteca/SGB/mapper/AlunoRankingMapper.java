package com.biblioteca.SGB.mapper;

import com.biblioteca.SGB.dto.AlunoRankingDTO;

public class AlunoRankingMapper {

    private AlunoRankingMapper() {
    }

    public static AlunoRankingDTO toDTO(Object[] obj) {
        return new AlunoRankingDTO(
                (String) obj[0],
                (String) obj[1],
                ((Number) obj[2]).intValue(),
                ((Number) obj[3]).intValue()
        );
    }
}