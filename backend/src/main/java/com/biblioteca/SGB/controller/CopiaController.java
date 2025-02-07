package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.CopiaDTO;
import com.biblioteca.SGB.dto.EdicaoDTO;
import com.biblioteca.SGB.mapper.CopiaMapper;
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

        copiaDTO.setStatus("Disponível");
        Copia copia = CopiaMapper.toModel(copiaDTO);

        Copia novaCopia = copiaService.cadastrarCopia(copia, isbnEdicao);

        return CopiaMapper.toDTO(novaCopia);
    }

    @GetMapping("/{isbnEdicao}")
    public List<CopiaDTO> listarCopias(@PathVariable String isbnEdicao) {

        List<Copia> copias = copiaService.listarCopias(isbnEdicao);

        return copias.stream()
                .map(CopiaMapper::toDTO)
                .collect(Collectors.toList());
    }
}