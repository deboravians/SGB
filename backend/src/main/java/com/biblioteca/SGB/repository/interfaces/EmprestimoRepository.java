package com.biblioteca.SGB.repository.interfaces;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmprestimoRepository {
    Emprestimo save(Emprestimo emprestimo);
    List<Emprestimo> getEmprestimosByAluno(Aluno aluno);
    List<Emprestimo> getEmprestimosByProfessor(Professor professor);
    boolean existsByAlunoMatricula(String matricula);
    boolean existsByProfessorCpf(String cpf);
    boolean existsByCopiaId(int id);
    List<Emprestimo> findByAlunoMatriculaIsNotNullAndDataDevolucaoIsNotNull();
    List<Emprestimo> findByProfessorCpfIsNotNullAndDataDevolucaoIsNotNull();
    List<Object[]> findTopAlunosByPeriod(LocalDate dataInicio, LocalDate dataFim);
    List<Emprestimo> findByCopiaEdicaoIsbn(String isbn);
    int countEmprestimosAtivos();
    int countEmprestimosAtrasados();
    Optional<Emprestimo> findById(Integer id);
    List<Emprestimo> findAll();
    boolean existsById(Integer id);
    void deleteById(Integer id);
    void delete(Emprestimo emprestimo);
}