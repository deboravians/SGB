package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.CopiaDTO;
import com.biblioteca.SGB.dto.EdicaoDTO;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.services.CopiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/copias")
public class CopiaController {

    @Autowired
    private CopiaService copiaService;

    @PostMapping
    public CopiaDTO cadastrarCopia(@RequestBody CopiaDTO copiaDTO, @RequestParam String isbnEdicao) {

        Copia copia = new Copia();
        copia.setId(copiaDTO.getId());
        copia.setStatus("Disponível");

        Copia novaCopia = copiaService.cadastarCopia(copia, isbnEdicao);

        return CopiaDTO.fromCopia(novaCopia);
    }

    @GetMapping
    public List<CopiaDTO> listarCopias(@RequestBody EdicaoDTO edicaoDTO) {

        Edicao edicao = new Edicao();
        edicao.setIsbn(edicaoDTO.getIsbn());
        edicao.setTitulo(edicaoDTO.getTitulo());
        edicao.setAnoPublicacao(edicaoDTO.getAnoPublicacao());
        edicao.setQtdCopias(edicaoDTO.getQtdCopias());
        edicao.setStatus(edicaoDTO.getStatus());

        List<Copia> copias = copiaService.listarCopias(edicao);

        return copias.stream()
                .map(CopiaDTO::fromCopia)
                .collect(Collectors.toList());
    }
}