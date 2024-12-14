package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Usuario;
import com.biblioteca.SGB.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService{

    @Autowired
    private UsuarioRepository UsuarioRepository;

    public String logar(Usuario usuario){

        Usuario usuarioLogado = UsuarioRepository.findByLogin(usuario.getLogin());

        if(usuarioLogado == null){

            return "0";

        }

        if((usuarioLogado.getLogin().equals("admin")) && (usuarioLogado.getSenha().equals("admin"))){

            return "1";

        }else{

            return "0";

        }

    }

}
