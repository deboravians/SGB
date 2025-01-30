package com.biblioteca.SGB.dto;

import com.biblioteca.SGB.models.Usuario;
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

    public static UsuarioDTO fromUsuario(Usuario usuario) {
        return new UsuarioDTO(usuario.getLogin(), usuario.getSenha());
    }
}