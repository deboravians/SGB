package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EdicaoDTO;
import com.biblioteca.SGB.mapper.EdicaoMapper;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.services.interfaces.IEdicaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/edicoes")
public class EdicaoController {

    @Autowired
    private IEdicaoService edicaoService;

    @PostMapping
    public EdicaoDTO cadastraEdicao(@RequestBody EdicaoDTO edicaoDTO, @RequestParam String classificacao_codigo) {

        Edicao edicao = EdicaoMapper.toModel(edicaoDTO);

        Edicao edicaoCadastrada = edicaoService.cadastrarEdicao(edicao, classificacao_codigo);

        return EdicaoMapper.toDTO(
                edicaoCadastrada,
                edicaoService.calcularStatus(edicaoCadastrada.getIsbn()),
                edicaoService.calcularQtdCopias(edicaoCadastrada.getIsbn()));
    }

    @GetMapping
    public List<EdicaoDTO> listarEdicoes() {

        List<Edicao> edicoes = edicaoService.listarEdicoes();

        return edicoes.stream()
                .map(edicao -> EdicaoMapper.toDTO(
                        edicao,
                        edicaoService.calcularStatus(edicao.getIsbn()),
                        edicaoService.calcularQtdCopias(edicao.getIsbn())))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{isbn}")
    public void excluirEdicao(@PathVariable String isbn) { edicaoService.excluirEdicao(isbn); }

    @PutMapping("/{isbn}")
    public EdicaoDTO atualizarEdicao(@PathVariable String isbn, @RequestBody EdicaoDTO edicaoDTO, @RequestParam String classificacao_codigo){

        Edicao edicao = EdicaoMapper.toModel(edicaoDTO);

        Edicao edicaoAtualizada = edicaoService.atualizarEdicao(isbn, edicao, classificacao_codigo);

        return EdicaoMapper.toDTO(
                edicaoAtualizada,
                edicaoService.calcularStatus(edicaoAtualizada.getIsbn()),
                edicaoService.calcularQtdCopias(edicaoAtualizada.getIsbn()));
    }

    @GetMapping("/{isbn}")
    public EdicaoDTO getEdicao(@PathVariable String isbn){

        Edicao edicao = edicaoService.getEdicao(isbn);

        return EdicaoMapper.toDTO(edicao,
                edicaoService.calcularStatus(edicao.getIsbn()),
                edicaoService.calcularQtdCopias(edicao.getIsbn()));
    }
}