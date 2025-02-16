package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.repository.interfaces.CopiaRepository;
import com.biblioteca.SGB.repository.interfaces.EdicaoRepository;
import com.biblioteca.SGB.repository.interfaces.EmprestimoRepository;
import com.biblioteca.SGB.services.interfaces.ICopiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CopiaService implements ICopiaService {

    private final CopiaRepository copiaRepository;
    private final EdicaoRepository edicaoRepository;
    private final EmprestimoRepository emprestimoRepository;

    @Autowired
    public CopiaService(CopiaRepository copiaRepository,
                        EdicaoRepository edicaoRepository,
                        EmprestimoRepository emprestimoRepository) {
        this.copiaRepository = copiaRepository;
        this.edicaoRepository = edicaoRepository;
        this.emprestimoRepository = emprestimoRepository;
    }

    public Copia cadastrarCopia(Copia copia, String isbnEdicao) {

        if (copiaRepository.findById(copia.getId()).isPresent()) {
            throw new IllegalArgumentException("Já existe uma copia com esse ID");
        }

        Edicao edicao = edicaoRepository.findById(isbnEdicao)
                .orElseThrow(() -> new RuntimeException("Edição não encontrada"));

        copia.setEdicao(edicao);

        return copiaRepository.save(copia);
    }

    public List<Copia> listarCopias(String isbnEdicao) {

        Edicao edicao = edicaoRepository.findById(isbnEdicao)
                .orElseThrow(() -> new RuntimeException("Edição não encontrada"));

        return copiaRepository.findAllByEdicao(edicao);
    }

    public void excluirCopia(int id) {
        if (emprestimoRepository.existsByCopiaId(id)){
            throw new IllegalArgumentException("Existem empréstimos relacionados a essa cópia e ela não pode ser excluída.");
        }
        if(!copiaRepository.existsById(id)){
            throw new IllegalStateException("Cópia com id " + id + " não encontrado.");
        }
        copiaRepository.deleteById(id);
    }
}