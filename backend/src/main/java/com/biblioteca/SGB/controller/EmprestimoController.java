package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @PutMapping("/aumentarPrazo")
    public EmprestimoDTO aumentarPrazo(@RequestParam Integer idEmprestimo) {

        Emprestimo emprestimo = emprestimoService.aumentarPrazo(idEmprestimo);

        return EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo));
    }

    @GetMapping
    public List<EmprestimoDTO> listarEmprestimos() {
        List<Emprestimo> emprestimos = emprestimoService.listarEmprestimos();
        return emprestimos.stream()
                .map(emprestimo -> EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo)))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public void excluirEmprestimo(@PathVariable Integer id) {
        emprestimoService.excluirEmprestimo(id);
    }
}
