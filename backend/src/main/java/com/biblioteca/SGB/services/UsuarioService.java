package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Usuario;
import com.biblioteca.SGB.repository.UsuarioRepository;
import com.biblioteca.SGB.services.interfaces.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository UsuarioRepository;

    public String logar(Usuario usuario){

        Usuario usuarioLogado = UsuarioRepository.findByLogin(usuario.getLogin());

        if(usuarioLogado == null){ return "0"; }

        if((usuarioLogado.getLogin().equals(usuario.getLogin())) &&
           (usuarioLogado.getSenha().equals(usuario.getSenha()))){
            return "1";
        }else{
            return "0";
        }
    }
}