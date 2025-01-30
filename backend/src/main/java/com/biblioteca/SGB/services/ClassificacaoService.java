package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.repository.ClassificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassificacaoService {

    @Autowired
    private ClassificacaoRepository classificacaoRepository;

    public Classificacao cadastrarClassificacao(Classificacao classificacao) {
        if (classificacaoRepository.findById(classificacao.getCodigo()).isPresent()) {
            throw new IllegalArgumentException("Já existe uma classificaço cadastrada com esse codigo.");
        }
        return classificacaoRepository.save(classificacao);
    }

    public List<Classificacao> listarClassificacoes(){

        return classificacaoRepository.findAll();

    }

}
