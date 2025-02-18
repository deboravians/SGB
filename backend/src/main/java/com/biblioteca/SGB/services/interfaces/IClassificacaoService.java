package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Classificacao;

import java.util.List;

public interface IClassificacaoService {

    Classificacao cadastrarClassificacao(Classificacao classificacao);

    List<Classificacao> listarClassificacoes();

    void excluirClassificacao(String codigo);

    Classificacao atualizarClassificacao(String codigo, Classificacao classificacaoAtualizada);
}