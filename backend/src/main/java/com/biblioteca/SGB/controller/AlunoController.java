package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;


    @PostMapping()
    public Aluno cadastrarAluno(@RequestBody Aluno aluno){

        return alunoService.cadastrarAluno(aluno);

    }

    @GetMapping
    public List<Aluno> listarAlunos(){

        return alunoService.listarAlunos();

    }

}
