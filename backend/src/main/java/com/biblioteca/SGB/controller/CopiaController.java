package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.services.CopiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/copias")
public class CopiaController {

    @Autowired
    private CopiaService copiaService;

    @PostMapping
    public Copia cadastrarCopia(@RequestBody Copia copia, @RequestParam String isbnEdicao) {
        copia.setStatus("Disponivel");

        return copiaService.cadastarCopia(copia, isbnEdicao);
    }

    @GetMapping
    public List<Copia> listarCopias(@RequestBody Edicao edicao){

        return copiaService.listarCopias(edicao);

    }

}
