package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.AlunoDTO;
import com.biblioteca.SGB.dto.ProfessorDTO;
import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.services.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/professores")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @PostMapping()
    public ProfessorDTO cadastrarProfessor(@RequestBody ProfessorDTO professorDTO) {
        Professor professor = new Professor(
                professorDTO.getNome(),
                professorDTO.getTelefone(),
                professorDTO.getRua(),
                professorDTO.getBairro(),
                professorDTO.getCpf(),
                professorDTO.getDisciplina()
        );

        Professor professorCadastrado = professorService.cadastrarProfessor(professor);
        return ProfessorDTO.fromProfessor(professorCadastrado);
    }

    @GetMapping
    public List<ProfessorDTO> listarProfessores() {
        List<Professor> professores = professorService.listarProfessores();

        return professores.stream()
                .map(ProfessorDTO::fromProfessor)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{cpf}")
    public void excluirProfessor(@PathVariable String cpf) {
        professorService.excluirProfessor(cpf);
    }

    @PutMapping("/{cpf}")
    public ProfessorDTO atualizarProfessor(@PathVariable String cpf, @RequestBody ProfessorDTO professorDTO) {

        Professor professor = new Professor(
                professorDTO.getNome(),
                professorDTO.getTelefone(),
                professorDTO.getRua(),
                professorDTO.getBairro(),
                professorDTO.getCpf(),
                professorDTO.getDisciplina()
        );

        Professor professorAtualizado = professorService.atualizarProfessor(cpf, professor);
        return ProfessorDTO.fromProfessor(professorAtualizado);
    }
}


