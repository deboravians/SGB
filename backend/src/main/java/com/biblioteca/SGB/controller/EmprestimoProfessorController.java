package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emprestimos/professores")
public class EmprestimoProfessorController{

    @Autowired
    private EmprestimoProfessorService emprestimoProfessorService;

    @PostMapping
    public Emprestimo cadastrarEmprestimo(@RequestBody Emprestimo emprestimo,
                                          @RequestParam String isbnCopia,
                                          @RequestParam String cpfProfessor) {

        emprestimo.setStatus("Pendente");
        emprestimo.setDataPrevistaDevolucao(emprestimo.getDataEmprestimo().plusDays(7));

        return emprestimoProfessorService.cadastrarEmprestimo(emprestimo, isbnCopia, cpfProfessor);
    }

}
