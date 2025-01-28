package com.biblioteca.SGB.models;

import jakarta.persistence.*;

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

    public String getNome() {
        return nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getRua() {
        return rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

}
