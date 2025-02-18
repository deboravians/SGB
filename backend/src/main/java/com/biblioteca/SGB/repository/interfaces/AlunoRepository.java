package com.biblioteca.SGB.repository.interfaces;

import com.biblioteca.SGB.models.Aluno;

import java.util.List;
import java.util.Optional;

public interface AlunoRepository {
    Aluno save(Aluno aluno);
    Optional<Aluno> findById(String matricula);
    List<Aluno> findAll();
    void deleteById(String matricula);
    boolean existsById(String matricula);
    int countAlunos();
}