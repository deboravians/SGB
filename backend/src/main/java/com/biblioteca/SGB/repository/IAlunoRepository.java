package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IAlunoRepository extends JpaRepository<Aluno, String> {

    @Query("SELECT COUNT(a) FROM Aluno a")
    int countAlunos();
}