package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.services.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professores")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @PostMapping()
    public Professor cadastrarProfessor(@RequestBody Professor professor) {

        return professorService.cadastrarProfessor(professor);

    }

    @GetMapping
    public List<Professor> listarProfessores(){

        return professorService.listarProfessores();

    }

}


