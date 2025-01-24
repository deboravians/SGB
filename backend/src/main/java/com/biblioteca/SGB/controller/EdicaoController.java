package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.services.EdicaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/edicoes")
public class EdicaoController {

    @Autowired
    private EdicaoService edicaoService;

    @PostMapping
    public Edicao cadastraEdicao(@RequestBody Edicao edicao) {

        //Settar quantidade como zero
        edicao.setQtdEstoque(0);

        //Settar status como indisponivel
        edicao.setStatus("Indisponível");

        return edicaoService.cadastrarEdicao(edicao);

    }

    @GetMapping
    public List<Edicao> listarEdicao(){

        return edicaoService.listarEdicoes();

    }
}


