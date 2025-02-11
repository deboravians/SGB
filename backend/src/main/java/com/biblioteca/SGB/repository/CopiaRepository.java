package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CopiaRepository extends JpaRepository<Copia, Integer> {

    List<Copia> findAllByedicao(Edicao edicao);

    boolean existsByEdicaoIsbn(String isbn);

    @Query("SELECT COUNT(c) FROM Copia c")
    int countTotalCopias();

    @Query("SELECT COUNT(c) FROM Copia c WHERE c.status ='Disponivel'")
    int countCopiasDisponiveis();

}
