package com.biblioteca.SGB.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@MappedSuperclass
public abstract class Leitores {

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, length = 15)
    private String telefone;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private String bairro;

    public Leitores() {
    }

    public Leitores(String nome, String telefone, String rua, String bairro) {
        this.nome = nome;
        this.telefone = telefone;
        this.rua = rua;
        this.bairro = bairro;
    }
}