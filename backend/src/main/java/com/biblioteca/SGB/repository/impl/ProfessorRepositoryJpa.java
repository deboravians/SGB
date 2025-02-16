package com.biblioteca.SGB.repository.impl;

import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.repository.IProfessorRepository;
import com.biblioteca.SGB.repository.interfaces.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProfessorRepositoryJpa implements ProfessorRepository {

    @Autowired
    private IProfessorRepository professorRepositoryJpa;

    @Override
    public Professor save(Professor professor) {
        return professorRepositoryJpa.save(professor);
    }

    @Override
    public Optional<Professor> findById(String cpf) {
        return professorRepositoryJpa.findById(cpf);
    }

    @Override
    public List<Professor> findAll() {
        return professorRepositoryJpa.findAll();
    }

    @Override
    public void deleteById(String cpf) {
        professorRepositoryJpa.deleteById(cpf);
    }

    @Override
    public boolean existsById(String cpf) {
        return professorRepositoryJpa.existsById(cpf);
    }

    @Override
    public int countProfessores() {
        return professorRepositoryJpa.countProfessores();
    }
}
