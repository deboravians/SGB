package com.biblioteca.SGB.repository.impl;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.repository.IAlunoRepository;
import com.biblioteca.SGB.repository.interfaces.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AlunoRepositoryJpa implements AlunoRepository {

    @Autowired
    private IAlunoRepository alunoRepositoryJpa;

    @Override
    public Aluno save(Aluno aluno) {
        return alunoRepositoryJpa.save(aluno);
    }

    @Override
    public Optional<Aluno> findById(String matricula) {
        return alunoRepositoryJpa.findById(matricula);
    }

    @Override
    public List<Aluno> findAll() {
        return alunoRepositoryJpa.findAll();
    }

    @Override
    public void deleteById(String matricula) {
        alunoRepositoryJpa.deleteById(matricula);
    }

    @Override
    public boolean existsById(String matricula) {
        return alunoRepositoryJpa.existsById(matricula);
    }

    @Override
    public int countAlunos(){
        return alunoRepositoryJpa.countAlunos();
    }
}