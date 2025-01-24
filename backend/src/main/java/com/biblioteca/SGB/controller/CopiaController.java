package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.services.CopiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/copias")
public class CopiaController {

    @Autowired
    private CopiaService copiaService;

    @PostMapping
    public Copia cadastrarCopia(@RequestBody Copia copia, @RequestParam String titulo_edicao) {
        copia.setStatus("Disponivel");

        return copiaService.cadastarCopia(copia, titulo_edicao);
    }

}
