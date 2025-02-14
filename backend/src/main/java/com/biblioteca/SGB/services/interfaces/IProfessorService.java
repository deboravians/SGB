package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Professor;

import java.util.List;

public interface IProfessorService {

    Professor cadastrarProfessor(Professor professor);

    List<Professor> listarProfessores();

    void excluirProfessor(String cpf);

    Professor atualizarProfessor(String cpf, Professor professorAtualizado);

    Professor getProfessor(String cpf);
}