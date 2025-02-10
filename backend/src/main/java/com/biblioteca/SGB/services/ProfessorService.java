package com.biblioteca.SGB.services;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.repository.EmprestimoRepository;
import com.biblioteca.SGB.repository.ProfessorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    public Professor cadastrarProfessor(Professor professor) {

        if (professorRepository.findById(professor.getCpf()).isPresent()) {
            throw new IllegalArgumentException("Já existe um professor cadastrado com esse CPF");
        }

        return professorRepository.save(professor);
    }

    public List<Professor> listarProfessores(){ return professorRepository.findAll(); }

    public void excluirProfessor(String cpf) {

        if(emprestimoRepository.existsByProfessorCpf(cpf)){
            throw new IllegalArgumentException("O professor possui empréstimos e não pode ser excluído.");
        }

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

    public Professor perfilProfessor(String cpf) {
        return professorRepository.findById(cpf)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));
    }
}