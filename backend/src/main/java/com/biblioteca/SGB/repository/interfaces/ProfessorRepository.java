package com.biblioteca.SGB.repository.interfaces;

import com.biblioteca.SGB.models.Professor;

import java.util.List;
import java.util.Optional;

public interface ProfessorRepository {
    Professor save(Professor professor);
    Optional<Professor> findById(String cpf);
    List<Professor> findAll();
    void deleteById(String cpf);
    boolean existsById(String cpf);
    int countProfessores();
}
