package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Emprestimo;
import java.util.List;

public interface IEmprestimoProfessorService {

    Emprestimo cadastrarEmprestimo(Emprestimo emprestimo, Integer idCopia, String cpfProfessor);

    List<Emprestimo> listarEmprestimosProfessores(String cpf);
}
