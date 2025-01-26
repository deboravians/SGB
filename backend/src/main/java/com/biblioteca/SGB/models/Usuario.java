package com.biblioteca.SGB.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Usuarios")
public class Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 5)
    private String login;

    @Column(nullable = false,unique = true, length = 5)
    private String senha;

    public Usuario() {

    }

    Usuario(String login, String senha){

        this.login = login;
        this.senha = senha;

    }

    public String getLogin() {
        return login;
    }

    public Integer getId() {
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

    public void setId(Integer id) {
        this.id = id;
    }
}


