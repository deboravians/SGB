package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.repository.ClassificacaoRepository;
import com.biblioteca.SGB.repository.EdicaoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EdicaoService {

    @Autowired
    private EdicaoRepository edicaoRepository;

    @Autowired
    private ClassificacaoRepository classificacaoRepository;

    @Autowired
    private CopiaService copiaService;

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

    public Edicao atualizarEdicao(String isbn, Edicao edicaoAtualizada, String classificacao_codigo) {

        Edicao edicao = edicaoRepository.findById(isbn)
                .orElseThrow(() -> new EntityNotFoundException("Não existe uma edição com este ISBN."));

        if(!edicao.getIsbn().equals(edicaoAtualizada.getIsbn())) {
            throw new IllegalArgumentException("o ISBN não pode ser alterado");
        }

        Classificacao classificacao = classificacaoRepository.findById(classificacao_codigo)
                .orElseThrow(() -> new RuntimeException("Classificação não encontrada"));

        edicaoAtualizada.setClassificacao(classificacao);

        return edicaoRepository.save(edicaoAtualizada);
    }

    public int calcularQtdCopias(Edicao edicao) {
        return copiaService.listarCopias(edicao).size();
    }

    public String calcularStatus(Edicao edicao) {
        List<Copia> copias = copiaService.listarCopias(edicao);

        int cont = 0;
        for(Copia copia : copias){ if(copia.getStatus().equals("Emprestada")){ cont++; } }

        return cont < calcularQtdCopias(edicao) ? "Disponível" : "Indisponível";
    }
}