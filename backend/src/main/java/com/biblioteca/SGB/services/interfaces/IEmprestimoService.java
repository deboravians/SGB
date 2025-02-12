package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Emprestimo;

import java.util.List;

public interface IEmprestimoService {

    Emprestimo aumentarPrazo(Integer idEmprestimo);

    Emprestimo registrarExtravio(Integer idEmprestimo);

    List<Emprestimo> listarEmprestimos();

    Emprestimo getEmprestimo(int id);

    String calcularStatus(Emprestimo emprestimo);

    void excluirEmprestimo(Integer idEmprestimo);

    List<Emprestimo> listarEmprestimosEdicao(String isbn);
}
