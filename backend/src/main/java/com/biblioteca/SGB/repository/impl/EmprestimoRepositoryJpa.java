package com.biblioteca.SGB.repository.impl;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.repository.IEmprestimoRepository;
import com.biblioteca.SGB.repository.interfaces.EmprestimoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public class EmprestimoRepositoryJpa implements EmprestimoRepository {

    @Autowired
    private IEmprestimoRepository emprestimoRepository;

    @Override
    public Emprestimo save(Emprestimo emprestimo) {
        return emprestimoRepository.save(emprestimo);
    }

    @Override
    public List<Emprestimo> getEmprestimosByAluno(Aluno aluno) {
        return emprestimoRepository.getEmprestimosByAluno(aluno);
    }

    @Override
    public List<Emprestimo> getEmprestimosByProfessor(Professor professor) {
        return emprestimoRepository.getEmprestimosByProfessor(professor);
    }

    @Override
    public boolean existsByAlunoMatricula(String matricula) {
        return emprestimoRepository.existsByAlunoMatricula(matricula);
    }

    @Override
    public boolean existsByProfessorCpf(String cpf) {
        return emprestimoRepository.existsByProfessorCpf(cpf);
    }

    @Override
    public boolean existsByCopiaId(int id) {
        return emprestimoRepository.existsByCopiaId(id);
    }

    @Override
    public List<Emprestimo> findByAlunoMatriculaIsNotNullAndDataDevolucaoIsNotNull() {
        return emprestimoRepository.findByAlunoMatriculaIsNotNullAndDataDevolucaoIsNotNull();
    }

    @Override
    public List<Emprestimo> findByProfessorCpfIsNotNullAndDataDevolucaoIsNotNull() {
        return emprestimoRepository.findByProfessorCpfIsNotNullAndDataDevolucaoIsNotNull();
    }

    @Override
    public List<Object[]> findTopAlunosByPeriod(LocalDate dataInicio, LocalDate dataFim) {
        return emprestimoRepository.findTopAlunosByPeriod(dataInicio, dataFim);
    }

    @Override
    public List<Emprestimo> findByCopiaEdicaoIsbn(String isbn) {
        return emprestimoRepository.findByCopiaEdicaoIsbn(isbn);
    }

    @Override
    public int countEmprestimosAtivos() {
        return emprestimoRepository.countEmprestimosAtivos();
    }

    @Override
    public int countEmprestimosAtrasados() {
        return emprestimoRepository.countEmprestimosAtrasados();
    }

    @Override
    public Optional<Emprestimo> findById(Integer id) {
        return emprestimoRepository.findById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return emprestimoRepository.existsById(id);
    }

    @Override
    public void deleteById(Integer id) {
        emprestimoRepository.deleteById(id);
    }

    @Override
    public List<Emprestimo> findAll() {
        return emprestimoRepository.findAll();
    }

    @Override
    public void delete(Emprestimo emprestimo) {
        emprestimoRepository.delete(emprestimo);
    }
}
