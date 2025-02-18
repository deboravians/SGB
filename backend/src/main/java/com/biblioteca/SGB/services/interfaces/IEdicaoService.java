package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Edicao;

import java.util.List;

public interface IEdicaoService {

    Edicao cadastrarEdicao(Edicao edicao, String classificacao_codigo);

    List<Edicao> listarEdicoes();

    void excluirEdicao(String isbn);

    Edicao atualizarEdicao(String isbn, Edicao edicaoAtualizada, String classificacao_codigo);

    int calcularQtdCopias(String edicaoIsbn);

    String calcularStatus(String edicaoIsbn);

    Edicao getEdicao(String isbn);
}