package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Integer> {

    List<Emprestimo> getEmprestimosByAluno(Aluno aluno);

    List<Emprestimo> getEmprestimosByProfessor(Professor professor);

    boolean existsByAlunoMatricula(String matricula);

    boolean existsByProfessorCpf(String cpf);

    boolean existsByCopiaId(int id);

    List<Emprestimo> findByAlunoMatriculaIsNotNullAndDataDevolucaoIsNotNull();

    List<Emprestimo> findByProfessorCpfIsNotNullAndDataDevolucaoIsNotNull();

    @Query(value = """
    SELECT 
        a.matricula AS matricula, 
        a.nome AS nome, 
        a.turma AS turma,
        COUNT(e.id) AS totalEmprestimos,
        RANK() OVER (ORDER BY COUNT(e.id) DESC) AS colocacao
    FROM Emprestimos e
    JOIN Alunos a ON e.aluno_matricula = a.matricula
    WHERE e.data_emprestimo BETWEEN :dataInicio AND :dataFim
    GROUP BY a.matricula, a.nome, a.turma
    ORDER BY totalEmprestimos DESC
    LIMIT 10 """, nativeQuery = true)
    List<Object[]> findTopAlunosByPeriod(
            @Param("dataInicio") LocalDate dataInicio,
            @Param("dataFim") LocalDate dataFim
    );

}