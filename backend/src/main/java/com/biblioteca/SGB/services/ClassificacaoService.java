package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.repository.interfaces.ClassificacaoRepository;
import com.biblioteca.SGB.repository.interfaces.EdicaoRepository;
import com.biblioteca.SGB.services.interfaces.IClassificacaoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassificacaoService implements IClassificacaoService {

    private final ClassificacaoRepository classificacaoRepository;

    @Autowired
    private EdicaoRepository edicaoRepository;

    @Autowired
    public ClassificacaoService(ClassificacaoRepository classificacaoRepository) {
        this.classificacaoRepository = classificacaoRepository;
    }

    public Classificacao cadastrarClassificacao(Classificacao classificacao) {

        if (classificacaoRepository.findById(classificacao.getCodigo()).isPresent()) {
            throw new IllegalArgumentException("Já existe uma classificaço cadastrada com esse codigo.");
        }
        return classificacaoRepository.save(classificacao);
    }

    public List<Classificacao> listarClassificacoes(){ return classificacaoRepository.findAll(); }

    public void excluirClassificacao(String codigo){

        if(edicaoRepository.existsByClassificacaoCodigo(codigo)){
            throw new IllegalArgumentException("A classificação possui livros associados e não pode ser excluída.");

        }

        if (!classificacaoRepository.findById(codigo).isPresent()) {
            throw new IllegalArgumentException("Não existe uma classificação com esse codigo.");
        }
        classificacaoRepository.deleteById(codigo);
    }

    public Classificacao atualizarClassificacao(String codigo, Classificacao classificacaoAtualizada) {

        Classificacao classificacao = classificacaoRepository.findById(codigo)
                .orElseThrow(() -> new EntityNotFoundException("Não existe uma classificação com esse codigo."));

        if(!classificacao.getCodigo().equals(classificacaoAtualizada.getCodigo())) {
            throw new IllegalArgumentException("O codigo da classificação não pode ser alterado");
        }

        return classificacaoRepository.save(classificacaoAtualizada);
    }
}
