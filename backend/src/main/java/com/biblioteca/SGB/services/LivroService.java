package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Livro;
import com.biblioteca.SGB.repository.ClassificacaoRepository;
import com.biblioteca.SGB.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private ClassificacaoRepository classificacaoRepository;

    public Livro cadastrarLivro(Livro livro) {

        Classificacao classificacao = classificacaoRepository.findById(livro.getClassificacaoCodigo())
                .orElseThrow(() -> new RuntimeException("Classificação não encontrada"));

        livro.setClassificacao(classificacao);

        return livroRepository.save(livro);
    }
}
