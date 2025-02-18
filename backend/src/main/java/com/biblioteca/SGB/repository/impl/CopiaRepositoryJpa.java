package com.biblioteca.SGB.repository.impl;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.repository.ICopiaRepository;
import com.biblioteca.SGB.repository.interfaces.CopiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CopiaRepositoryJpa implements CopiaRepository{

    @Autowired
    private ICopiaRepository copiaRepositoryJpa;

    @Override
    public Copia save(Copia copia) {
        return copiaRepositoryJpa.save(copia);
    }

    @Override
    public Optional<Copia> findById(Integer id) {
        return copiaRepositoryJpa.findById(id);
    }

    @Override
    public List<Copia> findAllByEdicao(Edicao edicao) {
        return copiaRepositoryJpa.findAllByEdicao(edicao);
    }

    @Override
    public boolean existsByEdicaoIsbn(String isbn) {
        return copiaRepositoryJpa.existsByEdicaoIsbn(isbn);
    }

    @Override
    public boolean existsById(Integer id) {
        return copiaRepositoryJpa.existsById(id);
    }

    @Override
    public void deleteById(Integer id) {
        copiaRepositoryJpa.deleteById(id);
    }

    @Override
    public int countTotalCopias() {
        return copiaRepositoryJpa.countTotalCopias();
    }

    @Override
    public int countCopiasDisponiveis() {
        return copiaRepositoryJpa.countCopiasDisponiveis();
    }

    @Override
    public int countCopiasEmprestadas() {
        return copiaRepositoryJpa.countCopiasEmprestadas();
    }
}