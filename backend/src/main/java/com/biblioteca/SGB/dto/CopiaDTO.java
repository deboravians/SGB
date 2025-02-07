package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Edicao;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CopiaDTO {

    private Integer id;
    private String status;
    private Edicao edicao;

    public CopiaDTO() {
    }

    public CopiaDTO(Integer id, String status, Edicao edicao) {
        this.id = id;
        this.status = status;
        this.edicao = edicao;
    }
}