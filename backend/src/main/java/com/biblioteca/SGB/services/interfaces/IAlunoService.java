package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Aluno;

import java.util.List;

public interface IAlunoService {

    Aluno cadastrarAluno(Aluno aluno);

    List<Aluno> listarAlunos();

    void excluirAluno(String matricula);

    Aluno atualizarAluno(String matricula, Aluno alunoAtualizado);

    Aluno getAluno(String matricula);

}
