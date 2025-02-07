package com.biblioteca.SGB.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UsuarioDTO {

    private String login;
    private String senha;

    public UsuarioDTO() {
    }

    public UsuarioDTO(String login, String senha) {
        this.login = login;
        this.senha = senha;
    }
}