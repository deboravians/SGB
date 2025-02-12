package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoAlunoService;
import com.biblioteca.SGB.services.EmprestimoService;
import com.biblioteca.SGB.services.interfaces.IEmprestimoAlunoService;
import com.biblioteca.SGB.services.interfaces.IEmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/emprestimos/alunos")
public class EmprestimoAlunoController {

    @Autowired
    private IEmprestimoAlunoService emprestimoAlunoService;

    @Autowired
    private IEmprestimoService emprestimoService;

    @PostMapping
    public EmprestimoDTO cadastrarEmprestimo(@RequestBody EmprestimoDTO emprestimoDTO,
                                             @RequestParam Integer idCopia,
                                             @RequestParam String matriculaAluno) {

        emprestimoDTO.setStatus("Em Andamento");
        Emprestimo emprestimo = EmprestimoMapper.toModel(emprestimoDTO, 7);

        Emprestimo novoEmprestimo = emprestimoAlunoService.cadastrarEmprestimo(emprestimo, idCopia, matriculaAluno);

        return EmprestimoMapper.toDTO(novoEmprestimo, novoEmprestimo.getStatus());
    }

    @GetMapping("/{matricula}")
    public List<EmprestimoDTO> listarEmprestimosAlunos(@PathVariable String matricula) {

        List<Emprestimo> emprestimosAlunos = emprestimoAlunoService.listarEmprestimosAlunos(matricula);
        return emprestimosAlunos.stream()
                .map(emprestimo -> EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo)))
                .collect(Collectors.toList());
    }
}