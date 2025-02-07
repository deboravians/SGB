package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CopiaRepository extends JpaRepository<Copia, Integer> {
    List<Copia> findAllByedicao(Edicao edicao);
}
