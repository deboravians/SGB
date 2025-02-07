package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.ClassificacaoDTO;
import com.biblioteca.SGB.mapper.ClassificacaoMapper;
import com.biblioteca.SGB.models.Classificacao;
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

        Classificacao classificacao = ClassificacaoMapper.toModel(classificacaoDTO);

        Classificacao classificacaoCadastrada = classificacaoService.cadastrarClassificacao(classificacao);
        return ClassificacaoMapper.toDTO(classificacaoCadastrada);
    }

    @GetMapping
    public List<ClassificacaoDTO> listarClassificacoes() {

        List<Classificacao> classificacoes = classificacaoService.listarClassificacoes();

        return classificacoes.stream()
                .map(ClassificacaoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{codigo}")
    public void excluirClassificacao(@PathVariable String codigo) {
        classificacaoService.excluirClassificacao(codigo);
    }

    @PutMapping("/{codigo}")
    public ClassificacaoDTO atualizarClassificacao(@PathVariable String codigo, @RequestBody ClassificacaoDTO classificacaoDTO){

        Classificacao classificacao = ClassificacaoMapper.toModel(classificacaoDTO);

        Classificacao classificacaoAtualizada = classificacaoService.atualizarClassificacao(codigo, classificacao);

        return ClassificacaoMapper.toDTO(classificacaoAtualizada);

    }
}