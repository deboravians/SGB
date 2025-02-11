package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.dto.ProfessorDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.mapper.ProfessorMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.services.EmprestimoService;
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

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping()
    public ProfessorDTO cadastrarProfessor(@RequestBody ProfessorDTO professorDTO) {

        Professor professor = ProfessorMapper.toModel(professorDTO);

        Professor professorCadastrado = professorService.cadastrarProfessor(professor);
        return ProfessorMapper.toDTO(professorCadastrado);
    }

    @GetMapping
    public List<ProfessorDTO> listarProfessores() {
        List<Professor> professores = professorService.listarProfessores();

        return professores.stream()
                .map(ProfessorMapper::toDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{cpf}")
    public void excluirProfessor(@PathVariable String cpf) {
        professorService.excluirProfessor(cpf);
    }

    @PutMapping("/{cpf}")
    public ProfessorDTO atualizarProfessor(@PathVariable String cpf, @RequestBody ProfessorDTO professorDTO) {

        Professor professor = ProfessorMapper.toModel(professorDTO);

        Professor professorAtualizado = professorService.atualizarProfessor(cpf, professor);
        return ProfessorMapper.toDTO(professorAtualizado);
    }

    @GetMapping("/{cpf}")
    public ProfessorDTO getProfessor(@PathVariable String cpf) {
        Professor perfilProfessor = professorService.getProfessor(cpf);

        return ProfessorMapper.toDTO(perfilProfessor);
    }
}