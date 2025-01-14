package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.services.ClassificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/classificacoes")
public class ClassificacaoController {

    @Autowired
    private ClassificacaoService classificacaoService;

    @PostMapping
    public Classificacao cadastrarClassificacao(@RequestBody Classificacao classificacao ){

        return classificacaoService.cadastrarClassificacao(classificacao);

    }

    @GetMapping
    public List<Classificacao> listarClassificacoes(){

        return classificacaoService.listarClassificacoes();

    }

}
