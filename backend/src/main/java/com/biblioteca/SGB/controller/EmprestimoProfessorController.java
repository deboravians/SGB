package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoProfessorService;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

        emprestimoDTO.setStatus("Em Andamento");
        Emprestimo emprestimo = EmprestimoMapper.toModel(emprestimoDTO, 30);

        Emprestimo novoEmprestimo = emprestimoProfessorService.cadastrarEmprestimo(emprestimo, idCopia, cpfProfessor);

        return EmprestimoMapper.toDTO(novoEmprestimo, novoEmprestimo.getStatus());
    }

    @GetMapping("/{cpf}")
    public List<EmprestimoDTO> listarEmprestimosProfessores(@PathVariable String cpf) {

        List<Emprestimo> emprestimosProfessores = emprestimoProfessorService.listarEmprestimosProfessores(cpf);
        return emprestimosProfessores.stream()
                .map(emprestimo -> EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo)))
                .collect(Collectors.toList());
    }
}