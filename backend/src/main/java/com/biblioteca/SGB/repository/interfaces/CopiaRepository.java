package com.biblioteca.SGB.repository.interfaces;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;

import java.util.List;
import java.util.Optional;

public interface CopiaRepository{
    Copia save(Copia copia);
    Optional<Copia> findById(Integer id);
    List<Copia> findAllByEdicao(Edicao edicao);
    boolean existsByEdicaoIsbn(String isbn);
    boolean existsById(Integer id);
    void deleteById(Integer id);
    int countTotalCopias();
    int countCopiasDisponiveis();
    int countCopiasEmprestadas();
}