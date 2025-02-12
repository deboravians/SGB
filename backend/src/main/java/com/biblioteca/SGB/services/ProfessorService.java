package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.repository.ProfessorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Professor cadastrarProfessor(Professor professor) {

        if (professorRepository.findById(professor.getCpf()).isPresent()) {
            throw new IllegalArgumentException("Já existe um professor cadastrado com esse CPF");
        }

        return professorRepository.save(professor);
    }

    public List<Professor> listarProfessores(){ return professorRepository.findAll(); }

    public void excluirProfessor(String cpf) {

        if(!professorRepository.existsById(cpf)){
            throw new IllegalStateException("Professor com CPF " + cpf + " não encontrado.");
        }
        professorRepository.deleteById(cpf);
    }

    public Professor atualizarProfessor(String cpf, Professor professorAtualizado) {

        Professor professor = professorRepository.findById(cpf)
                .orElseThrow(() -> new EntityNotFoundException("Não existe um professor com esse cpf."));

        if(!professor.getCpf().equals(professorAtualizado.getCpf())) {
            throw new IllegalArgumentException("o cpf não pode ser atualizado");
        }

        return professorRepository.save(professorAtualizado);
    }
}