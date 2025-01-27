package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.repository.CopiaRepository;
import com.biblioteca.SGB.repository.EdicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CopiaService {

    @Autowired
    private CopiaRepository copiaRepository;

    @Autowired
    private EdicaoRepository edicaoRepository;

    public Copia cadastarCopia(Copia copia, String isbnEdicao) {

        Edicao edicao = edicaoRepository.findById(isbnEdicao)
                .orElseThrow(() -> new RuntimeException("livro não encontrado"));

        copia.setEdicao(edicao);

        return copiaRepository.save(copia);
    }

    public List<Copia> listarCopias(Edicao edicao) {

        return copiaRepository.findAllByedicao(edicao);
    }

}
