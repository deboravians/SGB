package com.biblioteca.SGB.repository.impl;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.repository.IClassificacaoRepository;
import com.biblioteca.SGB.repository.interfaces.ClassificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClassificacaoRepositoryJpa implements ClassificacaoRepository {

    @Autowired
    private IClassificacaoRepository classificacaoRepositoryJpa;

    @Override
    public Classificacao save(Classificacao classificacao) {
        return classificacaoRepositoryJpa.save(classificacao);
    }

    @Override
    public Optional<Classificacao> findById(String codigo) {
        return classificacaoRepositoryJpa.findById(codigo);
    }

    @Override
    public List<Classificacao> findAll() {
        return classificacaoRepositoryJpa.findAll();
    }

    @Override
    public void deleteById(String codigo) {
        classificacaoRepositoryJpa.deleteById(codigo);
    }
}
