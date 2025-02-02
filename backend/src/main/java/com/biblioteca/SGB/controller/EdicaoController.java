package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EdicaoDTO;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.services.CopiaService;
import com.biblioteca.SGB.services.EdicaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/edicoes")
public class EdicaoController {

    @Autowired
    private EdicaoService edicaoService;

    @Autowired
    private CopiaService copiaService;

    @PostMapping
    public EdicaoDTO cadastraEdicao(@RequestBody EdicaoDTO edicaoDTO, @RequestParam String classificacao_codigo) {

        Edicao edicao = new Edicao(
                edicaoDTO.getIsbn(),
                edicaoDTO.getTitulo(),
                edicaoDTO.getAutor(),
                edicaoDTO.getAnoPublicacao()
        );

        Edicao edicaoCadastrada = edicaoService.cadastrarEdicao(edicao, classificacao_codigo);

        return EdicaoDTO.fromEdicao(
                edicaoCadastrada,
                edicaoService.calcularStatus(edicaoCadastrada),
                edicaoService.calcularQtdCopias(edicaoCadastrada));
    }

    @GetMapping
    public List<EdicaoDTO> listarEdicoes() {

        List<Edicao> edicoes = edicaoService.listarEdicoes();

        return edicoes.stream()
                .map(edicao -> EdicaoDTO.fromEdicao(
                        edicao,
                        edicaoService.calcularStatus(edicao),
                        edicaoService.calcularQtdCopias(edicao)))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{isbn}")
    public void excluirEdicao(@PathVariable String isbn) {
        edicaoService.excluirEdicao(isbn);
    }
}


