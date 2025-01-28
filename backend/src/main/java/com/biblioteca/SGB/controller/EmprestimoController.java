package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EdicaoDTO;
import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController { // Usar essa classe pra fazer o requisito de deletar e o de listar

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping
    public List<EmprestimoDTO> listarEmprestimos() {
        List<Emprestimo> emprestimos = emprestimoService.listarEmprestimos();
        return emprestimos.stream()
                .map(emprestimo -> EmprestimoDTO.fromEmprestimo(emprestimo, emprestimoService))
                .collect(Collectors.toList());
    }

}
