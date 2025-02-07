package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emprestimos/professores")
public class EmprestimoProfessorController {

    @Autowired
    private EmprestimoProfessorService emprestimoProfessorService;

    @PostMapping
    public EmprestimoDTO cadastrarEmprestimo(@RequestBody EmprestimoDTO emprestimoDTO,
                                             @RequestParam Integer idCopia,
                                             @RequestParam String cpfProfessor) {

        emprestimoDTO.setStatus("Pendente");
        Emprestimo emprestimo = EmprestimoMapper.toModel(emprestimoDTO, 30);

        Emprestimo novoEmprestimo = emprestimoProfessorService.cadastrarEmprestimo(emprestimo, idCopia, cpfProfessor);

        return EmprestimoMapper.toDTO(novoEmprestimo, novoEmprestimo.getStatus());
    }
}
