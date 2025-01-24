package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.repository.CopiaRepository;
import com.biblioteca.SGB.repository.EdicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CopiaService {

    @Autowired
    private CopiaRepository copiaRepository;

    @Autowired
    private EdicaoRepository edicaoRepository;

    public Copia cadastarCopia(Copia copia, String tituloEdicao) {

        Edicao edicao = edicaoRepository.findByTitulo(tituloEdicao)
                .orElseThrow(() -> new RuntimeException("livro não encontrado"));

        copia.setEdicao(edicao);

        return copiaRepository.save(copia);
    }
}
