package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.UsuarioDTO;
import com.biblioteca.SGB.mapper.UsuarioMapper;
import com.biblioteca.SGB.models.Usuario;
import com.biblioteca.SGB.services.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @PostMapping
    public String logar(@RequestBody UsuarioDTO usuarioDTO) {

        Usuario usuario = UsuarioMapper.toModel(usuarioDTO);

        return usuarioService.logar(usuario);
    }
}