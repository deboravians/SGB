package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.interfaces.IEmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    private final IEmprestimoService emprestimoService;

    @Autowired
    public EmprestimoController(IEmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @PutMapping("/aumentarPrazo/{idEmprestimo}")
    public EmprestimoDTO aumentarPrazo(@PathVariable Integer idEmprestimo) {

        Emprestimo emprestimo = emprestimoService.aumentarPrazo(idEmprestimo);

        return EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo));
    }

    @PutMapping("/registrarExtravio/{idEmprestimo}")
    public EmprestimoDTO registrarExtravio(@PathVariable Integer idEmprestimo) {

        Emprestimo emprestimoExtraviado = emprestimoService.registrarExtravio(idEmprestimo);
        return EmprestimoMapper.toDTO(emprestimoExtraviado, emprestimoService.calcularStatus(emprestimoExtraviado));
    }

    @GetMapping
    public List<EmprestimoDTO> listarEmprestimos() {
        List<Emprestimo> emprestimos = emprestimoService.listarEmprestimos();
        return emprestimos.stream()
                .map(emprestimo -> EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo)))
                .collect(Collectors.toList());
    }

    @GetMapping("/{idEmprestimo}")
    public EmprestimoDTO getEmprestimo(@PathVariable Integer idEmprestimo) {

        Emprestimo emprestimo = emprestimoService.getEmprestimo(idEmprestimo);

        return EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo));
    }

    @DeleteMapping("/{id}")
    public void excluirEmprestimo(@PathVariable Integer id) {
        emprestimoService.excluirEmprestimo(id);
    }

    @GetMapping("/edicoes/{isbn}")
    public List<EmprestimoDTO> listarEmprestimosEdicao(@PathVariable String isbn) {
        List<Emprestimo> emprestimosEdicao = emprestimoService.listarEmprestimosEdicao(isbn);

        return emprestimosEdicao.stream()
                .map(emprestimo -> EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo)))
                .collect(Collectors.toList());
    }
}