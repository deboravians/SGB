package com.biblioteca.SGB.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Copias")
public class Copia {

    @Id
    @Column(unique = true, nullable = false)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String status;

    @ManyToOne
    @JoinColumn(name = "edicao_isbn")
    private Edicao edicao;

    public Integer getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public Edicao getEdicao() {
        return edicao;
    }

    public void setid(Integer id) {
        this.id = id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setEdicao(Edicao edicao) {
        this.edicao = edicao;
    }
}