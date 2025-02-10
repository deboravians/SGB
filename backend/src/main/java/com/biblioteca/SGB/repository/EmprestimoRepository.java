package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Integer> {
    boolean existsByAlunoMatricula(String matricula);

    boolean existsByProfessorCpf(String cpf);

    boolean existsByCopiaId(int id);

    List<Emprestimo> findByAlunoMatriculaIsNotNullAndDataDevolucaoIsNotNull();

    List<Emprestimo> findByProfessorCpfIsNotNullAndDataDevolucaoIsNotNull();
}
