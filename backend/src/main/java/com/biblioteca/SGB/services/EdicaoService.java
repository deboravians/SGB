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

    public Edicao cadastrarEdicao(Edicao edicao, String classificacao_codigo) {

        if (edicaoRepository.findById(edicao.getIsbn()).isPresent()) {
            throw new IllegalArgumentException("Já existe uma edicao com este ISBN.");
        }

        Classificacao classificacao = classificacaoRepository.findById(classificacao_codigo)
                .orElseThrow(() -> new RuntimeException("Classificação não encontrada"));

        edicao.setClassificacao(classificacao);

        return edicaoRepository.save(edicao);
    }

    public List<Edicao> listarEdicoes(){
        return edicaoRepository.findAll();
    }

    public void excluirEdicao(String isbn) {
        if(!edicaoRepository.existsById(isbn)) {
            throw new IllegalStateException("Edição com ISBN " + isbn + " não encontrada.");
        }
        edicaoRepository.deleteById(isbn);
    }
}

