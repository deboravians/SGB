package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoAlunoService;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emprestimos/alunos")
public class EmprestimoAlunoController {

    @Autowired
    private EmprestimoAlunoService emprestimoAlunoService;

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping
    public EmprestimoDTO cadastrarEmprestimo(@RequestBody EmprestimoDTO emprestimoDTO,
                                             @RequestParam Integer idCopia,
                                             @RequestParam String matriculaAluno) {

        Emprestimo emprestimo = new Emprestimo(
                emprestimoDTO.getDataEmprestimo(),
                "Pendente"
        );

        Emprestimo novoEmprestimo = emprestimoAlunoService.cadastrarEmprestimo(emprestimo, idCopia, matriculaAluno);

        return EmprestimoDTO.fromEmprestimo(novoEmprestimo, emprestimoService);
    }
}

