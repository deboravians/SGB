package com.biblioteca.SGB.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

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

    public Usuario(String login, String senha){
        this.login = login;
        this.senha = senha;
    }
}