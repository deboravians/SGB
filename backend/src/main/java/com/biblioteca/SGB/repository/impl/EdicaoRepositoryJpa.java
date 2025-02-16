package com.biblioteca.SGB.repository.impl;

import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.repository.IEdicaoRepository;
import com.biblioteca.SGB.repository.interfaces.EdicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EdicaoRepositoryJpa implements EdicaoRepository {

    @Autowired
    private IEdicaoRepository edicaoRepositoryJpa;

    @Override
    public Edicao save(Edicao edicao) {
        return edicaoRepositoryJpa.save(edicao);
    }

    @Override
    public Optional<Edicao> findById(String isbn) {
        return edicaoRepositoryJpa.findById(isbn);
    }

    @Override
    public List<Edicao> findAll() {
        return edicaoRepositoryJpa.findAll();
    }

    @Override
    public void deleteById(String isbn) {
        edicaoRepositoryJpa.deleteById(isbn);
    }

    @Override
    public boolean existsById(String isbn) {
        return edicaoRepositoryJpa.existsById(isbn);
    }

    @Override
    public boolean existsByClassificacaoCodigo(String codigo) {
        return edicaoRepositoryJpa.existsByClassificacaoCodigo(codigo);
    }
}
