package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.UsuarioDTO;
import com.biblioteca.SGB.models.Usuario;
import com.biblioteca.SGB.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public String logar(@RequestBody UsuarioDTO usuarioDTO) {

        Usuario usuario = new Usuario(
                usuarioDTO.getLogin(),
                usuarioDTO.getSenha()
        );

        return usuarioService.logar(usuario);
    }
}
