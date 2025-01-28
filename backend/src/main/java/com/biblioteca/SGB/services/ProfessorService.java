package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Professor cadastrarProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    public List<Professor> listarProfessores(){ return professorRepository.findAll(); }

    public void excluirProfessor(String cpf) {
        if(!professorRepository.existsById(cpf)){
            throw new IllegalStateException("Professor com CPF " + cpf + " não encontrado.");
        }
        professorRepository.deleteById(cpf);
    }
}
