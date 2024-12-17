package com.biblioteca.SGB.models;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario{

    private String login;
    private String senha;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Usuario() {

    }

    Usuario(String login, String senha){

        this.login = login;
        this.senha = senha;

    }

    public String getLogin() {
        return login;
    }

    public Long getId() {
        return id;
    }

    public String getSenha() {
        return senha;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setId(Long id) {
        this.id = id;
    }
}


