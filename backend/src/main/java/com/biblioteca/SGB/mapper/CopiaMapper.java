package com.biblioteca.SGB.mapper;

import com.biblioteca.SGB.dto.CopiaDTO;
import com.biblioteca.SGB.models.Copia;

public class CopiaMapper {

    public static CopiaDTO toDTO(Copia copia) {
        return new CopiaDTO(
                copia.getId(),
                copia.getStatus(),
                copia.getEdicao()
        );
    }

    public static Copia toModel(CopiaDTO copiaDTO) {
        return new Copia(
                copiaDTO.getId(),
                copiaDTO.getStatus()
        );
    }
}
