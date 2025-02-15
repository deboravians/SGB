package com.biblioteca.SGB.repository.impl;

import com.biblioteca.SGB.models.Usuario;
import com.biblioteca.SGB.repository.IUsuarioRepository;
import com.biblioteca.SGB.repository.interfaces.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepositoryJpa implements UsuarioRepository {

    @Autowired
    private IUsuarioRepository usuarioRepositoryJpa;

    @Override
    public Usuario findByLogin(String login) {
        return usuarioRepositoryJpa.findByLogin(login);
    }

    @Override
    public Usuario save(Usuario usuario) {
        return usuarioRepositoryJpa.save(usuario);
    }
}
