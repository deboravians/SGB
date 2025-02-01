package com.biblioteca.SGB.services;

import com.biblioteca.SGB.dto.ProfessorDTO;
import com.biblioteca.SGB.models.Aluno;
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

    public Professor atualizarProfessor(String cpf, ProfessorDTO professorDTO) {
        Professor professor = professorRepository.findById(cpf)
                .orElseThrow(() -> new EntityNotFoundException("Professor com CPF " + cpf + " não encontrado"));

        if(professorDTO.getNome() != null){
            professor.setNome(professorDTO.getNome());
        }
        if(professorDTO.getCpf() != null){
            professor.setCpf(professorDTO.getCpf());
        }
        if(professorDTO.getTelefone() != null){
            professor.setTelefone(professorDTO.getTelefone());
        }
        if(professorDTO.getRua() != null){
            professor.setRua(professorDTO.getRua());
        }
        if(professorDTO.getBairro() != null){
            professor.setBairro(professorDTO.getBairro());
        }
        if(professorDTO.getDisciplina() != null){
            professor.setDisciplina(professorDTO.getDisciplina());
        }

        return professorRepository.save(professor);
    }

}

