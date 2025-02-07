package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.DevolucaoService;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/devolucoes")
public class DevolucaoController {

    @Autowired
    private DevolucaoService devolucaoService;

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping
    public EmprestimoDTO registrarDevolucao(@RequestBody EmprestimoDTO emprestimoDTO, @RequestParam Integer id){

        Emprestimo devolucao = emprestimoService.getEmprestimoById(id);
        devolucao.setDataDevolucao(LocalDate.parse(emprestimoDTO.getDataDevolucao(), DateTimeFormatter.ofPattern("dd/MM/yyyy")));

        Emprestimo novaDevolucao = devolucaoService.registrarDevolucao(devolucao);

        return EmprestimoDTO.fromEmprestimo(novaDevolucao, emprestimoService.calcularStatus(novaDevolucao));
    }
}
