package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.models.Livro;
import com.biblioteca.SGB.services.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @PostMapping
    public Livro cadastraLivro(@RequestBody Livro livro) {
        return livroService.cadastrarLivro(livro);
    }
}
