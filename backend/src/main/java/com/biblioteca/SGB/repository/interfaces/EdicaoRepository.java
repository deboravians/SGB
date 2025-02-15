package com.biblioteca.SGB.repository.interfaces;

import com.biblioteca.SGB.models.Edicao;

import java.util.List;
import java.util.Optional;

public interface EdicaoRepository {
    Edicao save(Edicao edicao);
    Optional<Edicao> findById(String isbn);
    List<Edicao> findAll();
    void deleteById(String isbn);
    boolean existsById(String isbn);
    boolean existsByClassificacaoCodigo(String codigo);
}
