package com.biblioteca.SGB.repository.interfaces;

import com.biblioteca.SGB.models.Classificacao;

import java.util.List;
import java.util.Optional;

public interface ClassificacaoRepository {
    Classificacao save(Classificacao classificacao);
    Optional<Classificacao> findById(String codigo);
    List<Classificacao> findAll();
    void deleteById(String codigo);
}