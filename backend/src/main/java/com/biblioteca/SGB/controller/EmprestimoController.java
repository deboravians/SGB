package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController { // Usar essa classe pra fazer o requisito de deletar e o de listar

    @Autowired
    private EmprestimoService emprestimoService;

}
