package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoAlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emprestimos/alunos")
public class EmprestimoAlunoController{

    @Autowired
    private EmprestimoAlunoService emprestimoAlunoService;

    @PostMapping
    public Emprestimo cadastrarEmprestimo(@RequestBody Emprestimo emprestimo,
                                          @RequestParam String isbnCopia,
                                          @RequestParam String matriculaAluno) {

        emprestimo.setStatus("Pendente");
        emprestimo.setDataPrevistaDevolucao(emprestimo.getDataEmprestimo().plusDays(7));

        return emprestimoAlunoService.cadastrarEmprestimo(emprestimo, isbnCopia, matriculaAluno);
    }

}

