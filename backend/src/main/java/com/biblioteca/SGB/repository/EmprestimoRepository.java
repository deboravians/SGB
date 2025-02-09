package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Integer> {
    boolean existsByAlunoMatricula(String matricula);

    boolean existsByProfessorCpf(String cpf);

    boolean existsByCopiaId(int id);
}
