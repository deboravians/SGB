package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.services.EstatisticasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/estatisticas")
public class EstatisticasController{

    @Autowired
    EstatisticasService estatisticasService;



}
