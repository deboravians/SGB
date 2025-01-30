package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoProfessorService;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emprestimos/professores")
public class EmprestimoProfessorController {

    @Autowired
    private EmprestimoProfessorService emprestimoProfessorService;

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping
    public EmprestimoDTO cadastrarEmprestimo(@RequestBody Emprestimo emprestimoDTO,
                                          @RequestParam Integer idCopia,
                                          @RequestParam String cpfProfessor) {

        Emprestimo emprestimo = new Emprestimo(
                emprestimoDTO.getDataEmprestimo(),
                "Pendente",
                emprestimoDTO.getDataEmprestimo().plusDays(30)
        );

        Emprestimo novoEmprestimo = emprestimoProfessorService.cadastrarEmprestimo(emprestimo, idCopia, cpfProfessor);

        return EmprestimoDTO.fromEmprestimo(novoEmprestimo, emprestimoService);
    }
}
