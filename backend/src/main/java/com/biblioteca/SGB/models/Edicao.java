package com.biblioteca.SGB.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter

@Entity
@Table(name = "Edicoes")
public class Edicao{

    @Id
    @Column(nullable = false, unique = true, length = 20)
    private String isbn;

    @Column(nullable = false, unique = true)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    @Column(nullable = false, length = 4)
    private String anoPublicacao;

    @Transient
    private String status;

    @Transient
    private int qtdCopias;

    @ManyToOne
    @JoinColumn(name = "classificacao_codigo")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Classificacao classificacao;

    public Edicao(){
    }

    public Edicao(String isbn, String titulo, String autor, String anoPublicacao) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
    }

}