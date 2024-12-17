package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Professor cadastrarProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

}
