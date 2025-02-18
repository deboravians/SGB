package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Emprestimo;

import java.util.List;

public interface IEmprestimoAlunoService {

    Emprestimo cadastrarEmprestimo(Emprestimo emprestimo, Integer idCopia, String matriculaAluno);

    List<Emprestimo> listarEmprestimosAlunos(String matricula);
}