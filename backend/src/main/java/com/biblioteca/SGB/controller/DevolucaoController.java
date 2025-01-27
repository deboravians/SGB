package com.biblioteca.SGB.controller;


import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.DevolucaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/devolucoes")
public class DevolucaoController {

    @Autowired
    private DevolucaoService devolucaoService;

    public Emprestimo registrarDevolucao(@RequestParam int id, @RequestParam String dataDevolucao, @RequestParam(required = false) Boolean livroExtraviado){
        LocalDate data = LocalDate.parse(dataDevolucao);
        return devolucaoService.registrarDevolucao(id, data, livroExtraviado);
    }
}
