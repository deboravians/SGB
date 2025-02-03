package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.ClassificacaoDTO;
import com.biblioteca.SGB.dto.EdicaoDTO;
import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.services.ClassificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/classificacoes")
public class ClassificacaoController {

    @Autowired
    private ClassificacaoService classificacaoService;

    @PostMapping
    public ClassificacaoDTO cadastrarClassificacao(@RequestBody ClassificacaoDTO classificacaoDTO) {

        Classificacao classificacao = new Classificacao(
                classificacaoDTO.getCodigo(),
                classificacaoDTO.getTitulo()
        );

        Classificacao classificacaoCadastrada = classificacaoService.cadastrarClassificacao(classificacao);
        return ClassificacaoDTO.fromClassificacao(classificacaoCadastrada);
    }

    @GetMapping
    public List<ClassificacaoDTO> listarClassificacoes() {

        List<Classificacao> classificacoes = classificacaoService.listarClassificacoes();

        return classificacoes.stream()
                .map(ClassificacaoDTO::fromClassificacao)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{codigo}")
    public void excluirClassificacao(@PathVariable String codigo) {
        classificacaoService.excluirClassificacao(codigo);
    }

    @PutMapping("/{codigo}")
    public ClassificacaoDTO atualizarClassificacao(@PathVariable String codigo, @RequestBody ClassificacaoDTO classificacaoDTO){

        Classificacao classificacao = new Classificacao(
                classificacaoDTO.getCodigo(),
                classificacaoDTO.getTitulo()
        );

        Classificacao classificacaoAtualizada = classificacaoService.atualizarClassificacao(codigo, classificacao);

        return ClassificacaoDTO.fromClassificacao(classificacaoAtualizada);

    }

}
