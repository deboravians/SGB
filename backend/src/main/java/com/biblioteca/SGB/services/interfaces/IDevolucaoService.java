package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Emprestimo;

import java.util.List;

public interface IDevolucaoService {

    Emprestimo registrarDevolucao(Emprestimo devolucao);

    List<Emprestimo> listarDevolucoesAlunos();

    List<Emprestimo> listarDevolucoesProfessores();
}
