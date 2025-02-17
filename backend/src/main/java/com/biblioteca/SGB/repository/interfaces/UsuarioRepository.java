package com.biblioteca.SGB.repository.interfaces;

import com.biblioteca.SGB.models.Usuario;

public interface UsuarioRepository {
    Usuario findByLogin(String login);
    Usuario save(Usuario usuario);
}