package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoAlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emprestimos/alunos")
public class EmprestimoAlunoController {

    @Autowired
    private EmprestimoAlunoService emprestimoAlunoService;

    @PostMapping
    public EmprestimoDTO cadastrarEmprestimo(@RequestBody EmprestimoDTO emprestimoDTO,
                                             @RequestParam Integer idCopia,
                                             @RequestParam String matriculaAluno) {

        emprestimoDTO.setStatus("Pendente");
        Emprestimo emprestimo = EmprestimoMapper.toModel(emprestimoDTO, 7);

        Emprestimo novoEmprestimo = emprestimoAlunoService.cadastrarEmprestimo(emprestimo, idCopia, matriculaAluno);

        return EmprestimoMapper.toDTO(novoEmprestimo, novoEmprestimo.getStatus());
    }
}