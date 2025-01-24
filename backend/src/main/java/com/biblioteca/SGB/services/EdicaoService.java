package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.repository.ClassificacaoRepository;
import com.biblioteca.SGB.repository.EdicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EdicaoService {

    @Autowired
    private EdicaoRepository edicaoRepository;

    @Autowired
    private ClassificacaoRepository classificacaoRepository;

    public Edicao cadastrarLivro(Edicao edicao) {

        Classificacao classificacao = classificacaoRepository.findById(livro.getClassificacaoCodigo())
                .orElseThrow(() -> new RuntimeException("Classificação não encontrada"));

        edicao.setClassificacao(classificacao);

        return edicaoRepository.save(edicao);
    }

    public List<Edicao> listarEdicoes(){
        return edicaoRepository.findAll();
    }
}

