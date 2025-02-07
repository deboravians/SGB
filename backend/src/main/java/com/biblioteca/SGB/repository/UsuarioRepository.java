package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Usuario findByLogin(String login);
}
