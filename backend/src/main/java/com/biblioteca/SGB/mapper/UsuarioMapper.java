package com.biblioteca.SGB.mapper;

import com.biblioteca.SGB.dto.UsuarioDTO;
import com.biblioteca.SGB.models.Usuario;

public class UsuarioMapper {

    public static Usuario toModel(UsuarioDTO usuarioDTO) {
        return new Usuario(
                usuarioDTO.getLogin(),
                usuarioDTO.getSenha()
        );
    }
}
