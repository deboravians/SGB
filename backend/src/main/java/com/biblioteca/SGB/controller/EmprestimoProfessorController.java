package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoProfessorService;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static com.biblioteca.SGB.utils.DateUtils.formatarData;

@RestController
@RequestMapping("/emprestimos/professores")
public class EmprestimoProfessorController {

    @Autowired
    private EmprestimoProfessorService emprestimoProfessorService;

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping
    public EmprestimoDTO cadastrarEmprestimo(@RequestBody EmprestimoDTO emprestimoDTO,
                                             @RequestParam Integer idCopia,
                                             @RequestParam String cpfProfessor) {

        Emprestimo emprestimo = new Emprestimo(
                formatarData(emprestimoDTO.getDataEmprestimo()),
                "Pendente",
                formatarData(emprestimoDTO.getDataEmprestimo()).plusDays(30)
        );

        Emprestimo novoEmprestimo = emprestimoProfessorService.cadastrarEmprestimo(emprestimo, idCopia, cpfProfessor);

        return EmprestimoDTO.fromEmprestimo(novoEmprestimo, novoEmprestimo.getStatus());
    }
}
