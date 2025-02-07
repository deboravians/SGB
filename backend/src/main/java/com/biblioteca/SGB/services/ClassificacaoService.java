package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.repository.ClassificacaoRepository;
import jakarta.persistence.EntityNotFoundException;
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

    public void excluirClassificacao(String codigo){
        if (!classificacaoRepository.findById(codigo).isPresent()) {
            throw new IllegalArgumentException("Não existe uma classificação com esse codigo.");
        }
        classificacaoRepository.deleteById(codigo);
    }

    public Classificacao atualizarClassificacao(String codigo, Classificacao classificacaoAtualizada) {

        Classificacao classificacao = classificacaoRepository.findById(codigo)
                .orElseThrow(() -> new EntityNotFoundException("Não existe uma classificação com esse codigo."));

        if(!classificacao.getCodigo().equals(classificacaoAtualizada.getCodigo())) {
            throw new IllegalArgumentException("o codigo não pode ser alterado");
        }

        return classificacaoRepository.save(classificacaoAtualizada);
    }

}
