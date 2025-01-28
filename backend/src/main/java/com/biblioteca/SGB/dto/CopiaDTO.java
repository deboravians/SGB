package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;

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

    // Método para mapear um objeto Copia para um DTO
    public static CopiaDTO fromCopia(Copia copia) {
        return new CopiaDTO(
                copia.getId(),
                copia.getStatus(),
                copia.getEdicao()
        );
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Edicao getEdicao() {
        return edicao;
    }

    public void setEdicao(Edicao edicao) {
        this.edicao = edicao;
    }
}