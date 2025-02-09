package com.biblioteca.SGB.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter

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

    public Copia(){
    }

    public Copia(Integer id, String status) {
        this.id = id;
        this.status = status;
    }
}